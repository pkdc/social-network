package backend

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type AuthResponse struct {
	Success bool `json:"success"`
}

type loginPayload struct {
	Email string `json:"email"`
	Pw    string `json:"pw"`
}

type regPayload struct {
	Email  string `json:"email"`
	Pw     string `json:"pw"`
	Fname  string `json:"fname"`
	Lname  string `json:"lname"`
	Dob    string `json:"dob"`
	Avatar string `json:"avatar"`
	Nname  string `json:"nname"`
	About  string `json:"about"`
}

type postsResponse struct {
	AllPosts string `json:"posts"`
}

type postPayload struct {
	Content string `json:"content"`
	Privacy string `json:"privacy"`
}

func Homehandler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "Home")

	if r.Method == http.MethodPost {
		fmt.Printf("----home-POST---(create)--\n")
		var payload postPayload

		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(payload)

		content := payload.Content
		privacy := payload.Privacy

		fmt.Printf("content %s\n", content)
		fmt.Printf("post privacy %s\n", privacy)

		jsonResp, err := json.Marshal(Resp)

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}
func Loginhandler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "login")

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
		Resp.Success = true
		if email == "f" {
			Resp.Success = false
		}
		jsonResp, err := json.Marshal(Resp)
		fmt.Println(string(jsonResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}
func Reghandler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "reg")
	if r.Method == http.MethodPost {
		fmt.Printf("----reg-POST-----\n")
		var payload regPayload

		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(payload)

		email := payload.Email
		pw := payload.Pw
		fname := payload.Fname
		lname := payload.Lname
		dob := payload.Dob
		avatar := payload.Avatar
		nname := payload.Nname
		about := payload.About

		fmt.Printf("Email: %s\n", email)
		fmt.Printf("password: %s\n", pw)
		fmt.Printf("fname: %s\n", fname)
		fmt.Printf("lname: %s\n", lname)
		fmt.Printf("dob: %s\n", dob)
		fmt.Printf("avatar: %s\n", avatar)
		fmt.Printf("nname: %s\n", nname)
		fmt.Printf("about: %s\n", about)

		var Resp AuthResponse
		Resp.Success = true
		if email == "f" {
			Resp.Success = false
		}
		jsonResp, err := json.Marshal(Resp)
		fmt.Println(string(jsonResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}
func Logouthandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "logout")
}
