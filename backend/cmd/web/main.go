package main

import (
	"backend"
	crud "backend/pkg/db/crud"
	db "backend/pkg/db/sqlite"
	"context"
	"fmt"
	"net/http"
	"os/exec"
)

func main() {

	// db.RunMigration()
	db := db.DbConnect()
	// db.RemoveMigration(m)
	// db.InsertMockUserData()
	// db.InsertMockPostData()

	var user crud.User

	user, _ = crud.New(db).GetUser(context.Background(), 1)

	fmt.Println(user)

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
