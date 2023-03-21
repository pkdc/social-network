package main

import (
	"backend"
	db "backend/pkg/db/sqlite"
	"fmt"
	"net/http"
)

func main() {

	// db.RunMigration()
	db.DbConnect()
	// db.RemoveMigration(m)
	// db.InsertMockUserData()
	// db.InsertMockPostData()

	// exec.Command("xdg-open", "https://localhost:8080").Start()

	mux := http.NewServeMux()

	// temp
	http.HandleFunc("/login", backend.Loginhandler)
	http.HandleFunc("/reg", backend.Reghandler)
	http.HandleFunc("/post", backend.Posthandler)
	http.HandleFunc("/post-comment", backend.PostCommentHandler)
	http.HandleFunc("/logout", backend.Logouthandler)
	http.HandleFunc("/user", backend.Userhandler)

	mux.Handle("/", backend.Homehandler())
	// mux.Handle("/session", backend.SessionHandler())
	// mux.Handle("/login", backend.Loginhandler())
	// mux.Handle("/logout", backend.Logouthandler())
	// mux.Handle("/reg", backend.Reghandler())
	// mux.Handle("/user", backend.Userhandler())
	mux.Handle("/user-follower", backend.UserFollowerHandler())
	mux.Handle("/user-message", backend.UserMessageHandler())
	// mux.Handle("/post", backend.Posthandler())
	// mux.Handle("/post-comment", backend.PostCommentHandler())
	mux.Handle("/group", backend.Grouphandler())
	mux.Handle("/group-member", backend.GroupMemberHandler())
	mux.Handle("/group-request", backend.GroupRequestHandler())
	mux.Handle("/group-post", backend.GroupPostHandler())
	mux.Handle("/group-post-comment", backend.GroupPostCommentHandler())
	mux.Handle("/group-event", backend.GroupEventHandler())
	mux.Handle("/group-event-member", backend.GroupEventMemberHandler())
	mux.Handle("/group-message", backend.GroupMessageHandler())

	fmt.Println("Starting server at port 8080")

	err1 := http.ListenAndServe(":8080", mux)
	if err1 != nil {
		fmt.Println(err1)
	}
}
