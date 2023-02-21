package main

import (
	"backend"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	m, err := migrate.New(
		"file://../../pkg/db/migration/sqlite",
		"sqlite3://../../pkg/db/database.db")
	m.Up()

	if err != nil {
		fmt.Print(err.Error())
	}
	// connect to database

	var db *sql.DB

	db, _ = sql.Open("sqlite3", "../../pkg/db/database.db")

	// fetch api for mock data

	var res *http.Response

	res, _ = http.Get("https://63f35a0e864fb1d60014de90.mockapi.io/users")

	resData, _ := ioutil.ReadAll(res.Body)

	type User struct {
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		NickName  string `json:"nickName"`
		Email     string `json:"email"`
		Password  string `json:"password"`
		Dob       string `json:"dob"`
		Image     string `json:"image"`
		About     string `json:"about"`
		Public    bool   `json:"public"`
	}

	type Users struct {
		ID        string `json:"id"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		NickName  string `json:"nickName"`
		Email     string `json:"email"`
		Password  string `json:"password"`
		Dob       string `json:"dob"`
		Image     string `json:"image"`
		About     string `json:"about"`
		Public    bool   `json:"public"`
	}

	var curUser Users

	/// receiving information

	var responseObject []User

	json.Unmarshal(resData, &responseObject)

	for _, user := range responseObject {
		// insert user data

		stmt, err := db.Prepare("INSERT INTO user(firstName, lastName, nickName, email, password_, dob, image_, about, public) VALUES(?,?,?,?,?,?,?,?,?);")
		if err != nil {
			log.Fatal(err)
		}

		defer stmt.Close()

		stmt.Exec(user.FirstName, user.LastName, user.NickName, user.Email, user.Password, user.Dob, user.Image, user.About, 0)
	}

	rows, err := db.Query(`SELECT id, firstName, lastName, nickName, email, password_, dob, image_, about, public FROM user`)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		// rows3.Scan(&id, &curNickname, &curAge, &curGender, &curFirstName, &curLastName, &curEmail, &pw, &curLoggedIn)
		rows.Scan(&curUser.ID, &curUser.FirstName, &curUser.LastName, &curUser.NickName, &curUser.Email, &curUser.Password, &curUser.Dob, &curUser.Image, &curUser.About, &curUser.Public)
		fmt.Println(curUser)
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
