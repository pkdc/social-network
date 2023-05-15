package websocket

import (
	"backend"
	"backend/pkg/db/crud"
	db "backend/pkg/db/sqlite"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"
)

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[int]*Client
	// Inbound messages from the clients.
	broadcast chan backend.NotiMessageStruct
	// Register requests from the clients.
	register chan *Client
	// Unregister requests from clients.
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan backend.NotiMessageStruct),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[int]*Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			// Adds connected user to the client list
			h.clients[client.userID] = client
			fmt.Printf("client %v is connected \n", client)

		case client := <-h.unregister:
			// Removes client from client list when disconnected
			if _, ok := h.clients[client.userID]; ok {
				delete(h.clients, client.userID)
				fmt.Printf("client %v left \n", client)
				close(client.send)
			}
		case message := <-h.broadcast:
			// Sends message/notification to appropriate users
			h.Notif(message)
		}
	}
}

func (h *Hub) Notif(msgStruct backend.NotiMessageStruct) {
	// Initialises variables for the different messages going through websocket
	fmt.Printf("msg reached hub: %v\n", msgStruct)

	db := db.DbConnect()

	query := crud.New(db)
	var not backend.NotifStruct
	var userMsg backend.UserMessageStruct
	var groupMsg backend.GroupMessageStruct

	t := 0

	// Checks whether the message is a notification, user message or group message
	// if err := json.Unmarshal(messageStruct, &not); err == nil {
	// 	t = 1
	// } else if err := json.Unmarshal(messageStruct, &userMsg); err == nil {
	// 	t = 2
	// } else if err := json.Unmarshal(messageStruct, &groupMsg); err == nil {
	// 	t = 3
	// } else {
	// 	panic(err)
	// }
	fmt.Printf("msg Struct: %v\n", msgStruct)
	if msgStruct.Label == "noti" {
		t = 1
		not.Label = "noti"
		not.Id = msgStruct.Id
		not.Type = msgStruct.Type
		not.TargetId = msgStruct.TargetId
		not.SourceId = msgStruct.SourceId
		not.GroupId = msgStruct.GroupId
		not.Accepted = msgStruct.Accepted
		not.CreatedAt = msgStruct.CreatedAt
		// fmt.Printf("not Struct: %v\n", not)
	} else if msgStruct.Label == "private" {
		t = 2
		userMsg.Label = "p-chat"
		userMsg.Id = msgStruct.Id
		userMsg.TargetId = msgStruct.TargetId
		userMsg.SourceId = msgStruct.SourceId
		userMsg.Message = msgStruct.Message
		userMsg.CreatedAt = time.Now().String()
	} else if msgStruct.Label == "group" {
		t = 3
		userMsg.Label = "g-chat"
		userMsg.Id = msgStruct.Id
		groupMsg.Message = msgStruct.Message
		groupMsg.SourceId = msgStruct.SourceId
		groupMsg.GroupId = msgStruct.GroupId
		groupMsg.CreatedAt = time.Now().String()
	} else {
		// panic
	}

	switch t {
	case 1:
		// NOTIFICATION
		fmt.Println("noti")
		// Marshals the struct to a json object
		sendNoti, err := json.Marshal(not)
		if err != nil {
			panic(err)
		}
		fmt.Printf("sendNoti: %v\n", string(sendNoti))
		// Loops through the clients and sends to all users other than the sender
		if not.TargetId == 987 {
			var group crud.GetGroupMembersByGroupIdParams
			group.GroupID = int64(not.SourceId)
			group.Status = 1
			users, err := query.GetGroupMembersByGroupId(context.Background(), group)
			if err != nil {
				log.Fatal(err)
			}
			events, err := query.GetGroupEvents(context.Background(), int64(not.SourceId))
			var eventId int64
			for _, event := range events {
				eventId = event.ID
			}
			for _, p := range users {
				_, err := query.CreateGroupEventMember(context.Background(), crud.CreateGroupEventMemberParams{
					UserID:  p.ID,
					EventID: eventId + 1,
					Status:  0,
				})
				if err != nil {
					log.Fatal(err)
				}
			}
			for _, user := range users {
				for _, client := range h.clients {
					if int(user.ID) == client.userID {
						client.send <- sendNoti
					}
				}
			}

		} else {
			for _, c := range h.clients {
				if c.userID == not.TargetId {
					fmt.Printf("matched %d = %d\n", c.userID, not.TargetId)
					select {
					case c.send <- sendNoti:
					default:
						close(c.send)
						delete(h.clients, c.userID)
					}
				}
			}
		}
	case 2:
		// USER MESSAGE
		fmt.Println("private")
		// ### CONNECT TO DATABASE ###

		// ### ADD USER MESSAGE TO DATABASE ###

		// date, err := time.Parse("2006-01-02 15:04:05.999999999 -0700 MST", userMsg.CreatedAt)

		// if err != nil {
		// 	fmt.Println("Unable to convert to date")
		// }

		var message crud.CreateMessageParams
		message.CreatedAt = time.Now()
		message.Message = userMsg.Message
		message.SourceID = int64(userMsg.SourceId)
		message.TargetID = int64(userMsg.TargetId)
		fmt.Printf("message.SourceID %d\n", message.SourceID)
		fmt.Printf("message.TargetID %d\n", message.TargetID)

		_, err := query.CreateMessage(context.Background(), message)

		if err != nil {
			fmt.Println("Unable to store message to database")
		}

		// Marshals the struct to a json object
		fmt.Println("Marshals the struct to a json object")
		sendMsg, err := json.Marshal(userMsg)
		if err != nil {
			panic(err)
		}

		// Loops through the clients and sends to the target user
		for _, c := range h.clients {
			fmt.Printf("client %v\n", c)
			fmt.Printf("target client id %v\n", userMsg.TargetId)
			if c.userID == userMsg.TargetId {
				fmt.Printf("matched %d = %d\n", c.userID, userMsg.TargetId)
				select {
				case c.send <- sendMsg:
					fmt.Printf("sendMsg %v\n", sendMsg)
				default:
					close(c.send)
					delete(h.clients, c.userID)
				}
			}
		}
	case 3:
		// GROUP MESSAGE
		fmt.Println("group")
		// Marshals the struct to a json object
		sendMsg, err := json.Marshal(groupMsg)
		if err != nil {
			panic(err)
		}

		// Variable to store the group members
		// var members []backend.GroupMemberStruct

		// ### SEARCH FOR GROUP MEMBERS ###

		var group crud.GetGroupMembersByGroupIdParams

		group.GroupID = int64(groupMsg.GroupId)
		group.Status = 1

		users, err := query.GetGroupMembersByGroupId(context.Background(), group)

		if err != nil {
			fmt.Println("Could not get user list")
		}

		// Loops through the clients and sends to the other group members
		for _, c := range h.clients {
			if IsMember(users, c.userID) && c.userID != groupMsg.SourceId {
				select {
				case c.send <- sendMsg:
				default:
					close(c.send)
					delete(h.clients, c.userID)
				}
			}
		}
	default:
		return
	}
}

func IsMember(s []crud.User, e int) bool {
	for _, a := range s {
		if int(a.ID) == e {
			return true
		}
	}
	return false
}
