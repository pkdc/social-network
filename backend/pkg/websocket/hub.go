package websocket

import (
	"backend"
	"encoding/json"
)

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[int]*Client
	// Inbound messages from the clients.
	broadcast chan []byte
	// Register requests from the clients.
	register chan *Client
	// Unregister requests from clients.
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[int]*Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			// h.clients[client] = true
			h.clients[client.userID] = client

		case client := <-h.unregister:
			if _, ok := h.clients[client.userID]; ok {
				delete(h.clients, client.userID)
				close(client.send)
			}
		case message := <-h.broadcast:
			h.Notif(message)
		}
	}
}

func (h *Hub) Notif(message []byte) {
	var not backend.NotifStruct
	var msg backend.UserMessageStruct

	if err := json.Unmarshal(message, &not); err != nil {
		if err := json.Unmarshal(message, &msg); err != nil {
			panic(err)
		}
	}

	if not.Type != "" {
		sendNoti, err := json.Marshal(not)
		if err != nil {
			panic(err)
		}

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
	} else {
		sendMsg, err := json.Marshal(msg)
		if err != nil {
			panic(err)
		}

		for _, c := range h.clients {
			if c.userID == msg.TargetId {
				select {
				case c.send <- sendMsg:
				default:
					close(c.send)
					delete(h.clients, c.userID)
				}
			}
		}
	}
}