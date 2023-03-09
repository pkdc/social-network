package main

import (
	"backend"
	"fmt"
	"net/http"
	"os/exec"
)

func main() {
	exec.Command("xdg-open", "https://localhost/").Start()

	mux := http.NewServeMux()

	mux.Handle("/", backend.Homehandler())
	mux.Handle("/session", backend.SessionHandler())
	mux.Handle("/login", backend.Loginhandler())
	mux.Handle("/logout", backend.Logouthandler())
	mux.Handle("/reg", backend.Reghandler())
	mux.Handle("/user", backend.Userhandler())
	mux.Handle("/user-follower", backend.UserFollowerHandler())
	mux.Handle("/user-message", backend.UserMessageHandler())
	mux.Handle("/post", backend.Posthandler())
	mux.Handle("/post-comment", backend.PostCommentHandler())
	mux.Handle("/group", backend.Grouphandler())
	mux.Handle("/group-member", backend.GroupMemberHandler())
	mux.Handle("/group-request", backend.GroupRequestHandler())
	mux.Handle("/group-post", backend.GroupPostHandler())
	mux.Handle("/group-post-comment", backend.GroupPostCommentHandler())
	mux.Handle("/group-event", backend.GroupEventHandler())
	mux.Handle("/group-event-member", backend.GroupEventMemberHandler())
	mux.Handle("/group-message", backend.GroupMessageHandler())

	fmt.Println("Starting server at port 8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}
}
