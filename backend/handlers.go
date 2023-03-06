package backend

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type AuthResponse struct {
	UserId    int    `json:"user_id"`
	Firstname string `json:"fname"`
	Lastname  string `json:"lname"`
	Nname     string `json:"nname"`
	Avatar    string `json:"avatar"`
	Success   bool   `json:"success"`
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
	UserId  int    `json:"user_id"`
	Content string `json:"content"`
	Image   string `json:"image"`
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

		userid := payload.UserId
		content := payload.Content
		image := payload.Image
		privacy := payload.Privacy

		fmt.Printf("userid %d\n", userid)
		fmt.Printf("content %s\n", content)
		fmt.Printf("image %s\n", image)
		fmt.Printf("post privacy %s\n", privacy)

		// var Resp postsResponse
		// jsonResp, err := json.Marshal(Resp)

		// w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		// w.Header().Set("Content-Type", "application/json")
		// w.WriteHeader(http.StatusOK)
		// w.Write(jsonResp)
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

		// dummy resp
		var Resp AuthResponse
		Resp.UserId = 7
		Resp.Firstname = "James"
		Resp.Lastname = "Bond"
		Resp.Nname = "double-oh-seven"
		Resp.Avatar = "data:image/jpeg;base64,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"
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

		// dummy resp
		var Resp AuthResponse
		Resp.UserId = 7 // dummy
		Resp.Firstname = fname
		Resp.Lastname = lname
		Resp.Nname = nname
		Resp.Avatar = avatar
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
