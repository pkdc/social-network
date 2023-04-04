package websocket

import (
	"backend"
	"backend/pkg/db/crud"
	db "backend/pkg/db/sqlite"
	"context"
	"encoding/json"
	"fmt"
)

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[int]*Client
	// Inbound messages from the clients.
	broadcast chan backend.MessageStruct
	// Register requests from the clients.
	register chan *Client
	// Unregister requests from clients.
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan backend.MessageStruct),
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

func (h *Hub) Notif(msgStruct backend.MessageStruct) {
	// Initialises variables for the different messages going through websocket
	fmt.Printf("msg reached hub: %v\n", msgStruct)

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
	if msgStruct.Label == "private" {
		t = 1
	} else if msgStruct.Label == "group" {
		t = 2
	} else if msgStruct.Label == "noti" {
		t = 3
	} else {
		// panic
	}

	switch t {
	case 1:
		// NOTIFICATION
		fmt.Println("private")
		// Marshals the struct to a json object
		sendNoti, err := json.Marshal(not)
		if err != nil {
			panic(err)
		}

		// Loops through the clients and sends to all users other than the sender
		for _, c := range h.clients {
			if c.userID != not.UserId {
				select {
				case c.send <- sendNoti:
				default:
					close(c.send)
					delete(h.clients, c.userID)
				}
			}
		}
	case 2:
		// USER MESSAGE

		// Marshals the struct to a json object
		sendMsg, err := json.Marshal(userMsg)
		if err != nil {
			panic(err)
		}

		// Loops through the clients and sends to the target user
		for _, c := range h.clients {
			if c.userID == userMsg.TargetId {
				select {
				case c.send <- sendMsg:
				default:
					close(c.send)
					delete(h.clients, c.userID)
				}
			}
		}
	case 3:
		// GROUP MESSAGE

		// Marshals the struct to a json object
		sendMsg, err := json.Marshal(groupMsg)
		if err != nil {
			panic(err)
		}

		// Variable to store the group members
		// var members []backend.GroupMemberStruct

		// ### SEARCH FOR GROUP MEMBERS ###

		db := db.DbConnect()

		query := crud.New(db)

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
