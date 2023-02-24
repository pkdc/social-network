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
	mux.Handle("/login", backend.Loginhandler())
	mux.Handle("/logout", backend.Logouthandler())
	mux.Handle("/reg", backend.Reghandler())
	mux.Handle("/user", backend.Userhandler())
	mux.Handle("/post", backend.Posthandler())
	mux.Handle("/group", backend.Grouphandler())

	fmt.Println("Starting server at port 8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}
}
