package backend

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type AuthResponse struct {
	Pass bool `json:"pass"`
}

type loginPayload struct {
	Email string `json:"email"`
	Pw    string `json:"pw"`
}

type regPayload struct {
	Email string `json:"email"`
	Pw    string `json:"pw"`
}

func Homehandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home")
}
func Loginhandler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "login")
	// Post to store, and then return
	if r.Method == http.MethodPost {
		fmt.Printf("----login-POST-----\n")
		var payload loginPayload

		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(payload)

		email := payload.Email
		pw := payload.Pw

		fmt.Printf("Email: %s\n", email)
		fmt.Printf("password: %s\n", pw)

		var Resp AuthResponse
		Resp.Pass = true
		if email == "f" {
			Resp.Pass = false
		}
		jsResp, err := json.Marshal(Resp)
		fmt.Println(string(jsResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsResp)
	}
}
func Reghandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "reg")
}
func Logouthandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "logout")
}
