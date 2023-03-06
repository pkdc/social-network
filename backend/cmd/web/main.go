package main

import (
	"backend"
	"fmt"
	"net/http"
	"os/exec"
)

func main() {

	// db.RunMigration()
	// db.DbConnect()
	// db.RemoveMigration(m)
	// db.InsertMockUserData()
	// db.InsertMockPostData()

	exec.Command("xdg-open", "https://localhost/").Start()

	http.HandleFunc("/", backend.Homehandler)
	http.HandleFunc("/login/", backend.Loginhandler)
	http.HandleFunc("/reg/", backend.Reghandler)
	http.HandleFunc("/logout/", backend.Logouthandler)

	fmt.Println("Starting server at port 8080")

	err1 := http.ListenAndServe(":8080", nil)
	if err1 != nil {
		fmt.Println(err1)
	}
}
