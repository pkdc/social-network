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

	var user crud.UserFollower

	var fol crud.CreateFollowerParams

	fol.SourceID = 1
	fol.TargetID = 20
	fol.Status = 0

	user, _ = crud.New(db).CreateFollower(context.Background(), fol)

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
