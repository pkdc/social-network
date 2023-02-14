package main

import (
	"backend"
	"fmt"
	"net/http"
	"os/exec"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/sqlite3"
)

func main() {

	
	m, err := migrate.New(
        "file://../../pkg/db/migration/sqlite",
        "sqlite3://../../pkg/db/database.db")
    m.Up()

	if err != nil {
		fmt.Print(err.Error())
	}

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
