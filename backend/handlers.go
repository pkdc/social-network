package backend

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type AuthResponse struct {
	UserId  int    `json:"user_id"`
	Fname   string `json:"fname"`
	Lname   string `json:"lname"`
	Nname   string `json:"nname"`
	Avatar  string `json:"avatar"`
	Success bool   `json:"success"`
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

// type postsResponse struct {
// 	AllPosts string `json:"posts"`
// }

type postPayload struct {
	UserId  int    `json:"user_id"`
	Content string `json:"content"`
	Image   string `json:"image"`
	Privacy string `json:"privacy"`
}

type dummyPosts struct {
	PostId  int    `json:"post_id"`
	Fname   string `json:"fname"`
	Lname   string `json:"lname"`
	Avatar  string `json:"avatar"`
	Nname   string `json:"nname"`
	Content string `json:"content"`
	Date    string `json:"date"`
}

func Homehandler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "Home")

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
		Resp.Fname = "James"
		Resp.Lname = "Bond"
		Resp.Nname = "double-oh-seven"
		Resp.Avatar = ""
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
		Resp.Fname = fname
		Resp.Lname = lname
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

func Posthandler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "Post")

	if r.Method == http.MethodPost {
		fmt.Printf("----hopostme-POST---(create)--\n")
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

	if r.Method == http.MethodGet {
		fmt.Printf("----post-GET---(display)--\n")

		var data []dummyPosts

		var data1 dummyPosts
		data1.PostId = 1
		data1.Fname = "David"
		data1.Lname = "Copperfield"
		data1.Avatar = "data:image/jpeg;base64,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"
		data1.Nname = "Illusionist"
		data1.Content = "this is the post content"
		data1.Date = "date"
		// fmt.Printf("data1 %v\n", data1)
		data = append(data, data1)

		var data2 dummyPosts
		data2.PostId = 2
		data2.Fname = "Super"
		data2.Lname = "Mario"
		data2.Avatar = "data:image/jpeg;base64,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"
		data2.Nname = "M"
		data2.Content = "this is the post content2"
		data2.Date = "date2"
		// fmt.Printf("data2 %v\n", data2)
		data = append(data, data2)

		// fmt.Printf("data %v\n", data)
		jsonResp, _ := json.Marshal(data)
		// fmt.Printf("posts resp %s\n", string(jsonResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func Logouthandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "logout")
}
