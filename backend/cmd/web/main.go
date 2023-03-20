package main

import (
	"backend"
	db "backend/pkg/db/sqlite"
	"fmt"
	"net/http"
)

func main() {

	db.RunMigration()
	db.DbConnect()
	// db.RemoveMigration(m)
	// db.InsertMockUserData()
	// db.InsertMockPostData()

	// exec.Command("xdg-open", "https://localhost:8080").Start()

	http.Handle("/", backend.Homehandler())
	http.Handle("/session", backend.SessionHandler())
	http.Handle("/login", backend.Loginhandler())
	http.Handle("/logout", backend.Logouthandler())
	http.Handle("/reg", backend.Reghandler())
	http.Handle("/user", backend.Userhandler())
	http.Handle("/user-follower", backend.UserFollowerHandler())
	http.Handle("/user-message", backend.UserMessageHandler())
	http.Handle("/post", backend.Posthandler())
	http.Handle("/post-comment", backend.PostCommentHandler())
	http.Handle("/group", backend.Grouphandler())
	http.Handle("/group-member", backend.GroupMemberHandler())
	http.Handle("/group-request", backend.GroupRequestHandler())
	http.Handle("/group-post", backend.GroupPostHandler())
	http.Handle("/group-post-comment", backend.GroupPostCommentHandler())
	http.Handle("/group-event", backend.GroupEventHandler())
	http.Handle("/group-event-member", backend.GroupEventMemberHandler())
	http.Handle("/group-message", backend.GroupMessageHandler())

	fmt.Println("Starting server at port 8080")

	err1 := http.ListenAndServe(":8080", nil)
	if err1 != nil {
		fmt.Println(err1)
	}
}
