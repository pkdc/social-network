package backend

import (
	"backend/pkg/db/crud"
	db "backend/pkg/db/sqlite"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	// "strconv"
	"time"

	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
)

func UrlPathMatcher(w http.ResponseWriter, r *http.Request, p string) error {
	if r.URL.Path != p {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return errors.New("404")
	}

	return nil
}

func WriteHttpHeader(jsonResp []byte, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResp)
}

func EnableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}

func Homehandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
	}
}

func SessionHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/session"); err != nil {
			return
		}

	switch r.Method {
	case http.MethodGet:
		// Declares the payload struct
		var Resp SessionStruct

		// ### CONNECT TO DATABASE ###

		db := db.DbConnect()

		query := crud.New(db)

		// ### GET SESSION FOR USER ###

		session, err := r.Cookie("SessionToken")

		sessionTable, err := query.GetUserId(context.Background(), session.Value)

		if err != nil {
			http.Error(w, "500 internal server error", http.StatusInternalServerError)
			return
		}

		Resp.UserId = int(sessionTable.UserID)
		Resp.SessionToken = sessionTable.SessionToken

		// Marshals the response struct to a json object
		jsonResp, err := json.Marshal(Resp)
		if err != nil {
			http.Error(w, "500 internal server error", http.StatusInternalServerError)
			return
		}

		// Sets the http headers and writes the response to the browser
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	default:
		// Prevents all request types other than POST and GET
		http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
		return
	}

}

func Loginhandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/login"); err != nil {
			return
		}

	// Prevents all request types other than POST
	if r.Method != http.MethodPost {
		http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
		return
	}

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
		// ### CONNECT TO DATABASE ###

		db := db.DbConnect()

		var query *crud.Queries

		query = crud.New(db)

		// ### SEARCH DATABASE FROM USER ###

		curUser, err := query.GetUser(context.Background(), payload.Email)

		if err != nil {
			Resp.Success = false
			fmt.Println("Unable to find user")
		}

		if curUser.Count < 1 {
			Resp.Success = false
			fmt.Println("Unable to find user")
		}

		// ### COMPARE PASSWORD WITH THE HASH IN THE DATABASE (SKIP IF USER NOT FOUND) ###

		err = bcrypt.CompareHashAndPassword([]byte(curUser.Password), []byte(payload.Pw))

		if err != nil {
			Resp.Success = false
			fmt.Println("Passwords do not match!")
		}

		Resp.UserId = int(curUser.ID)
		Resp.Fname = curUser.FirstName
		Resp.Lname = curUser.LastName
		Resp.Nname = curUser.NickName
		Resp.Avatar = curUser.Image
		Resp.Email = curUser.Email
		Resp.About = curUser.About
		Resp.Dob = curUser.Dob.String()

		if email == "f" {
			Resp.Success = false
		}

		// ### UPDATE SESSION COOKIE IN DATABASE AND BROWSER (SKIP IF USER NOT FOUND OR IF PASSWORD DOES NOT MATCH) ###
		sessionExist, err := query.SessionExists(context.Background(), curUser.ID)

		if err != nil {
			Resp.Success = false
			fmt.Println("Unable to check session table!")
		}

		if Resp.Success {
			// add new session
			// create cookie
			var cookie SessionStruct

			cookie.SessionToken = uuid.NewV4().String()
			cookie.UserId = int(curUser.ID)

			if sessionExist > 0 {
				// update session in database
				var newSession crud.UpdateUserSessionParams
				newSession.UserID = int64(cookie.UserId)
				newSession.SessionToken = cookie.SessionToken
				query.UpdateUserSession(context.Background(), newSession)

			} else {
				// add session to database
				var session crud.CreateSessionParams
				fmt.Println("add session to database")
				session.SessionToken = cookie.SessionToken
				session.UserID = int64(cookie.UserId)
				_, err = query.CreateSession(context.Background(), session)

				if err != nil {
					fmt.Println("Unable to create session!")
				}
			}

			http.SetCookie(w, &http.Cookie{
				Name:  "session_token",
				Value: cookie.SessionToken,
			})

		}

		jsonResp, err := json.Marshal(Resp)
		fmt.Println(string(jsonResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func Reghandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/reg"); err != nil {
			return
		}

	// Prevents all request types other than POST
	if r.Method != http.MethodPost {
		http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
		return
	}

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

		// used to run query
		var regPayload crud.CreateUserParams

		// will be used to respond
		var Resp AuthResponse
		Resp.Success = true
		// convert password using bcrypt
		password := []byte(payload.Pw)

		cryptPw, err := bcrypt.GenerateFromPassword(password, 10)

		if err != nil {
			Resp.Success = false
			fmt.Println("Unable generate password!")
		}

		date, err := time.Parse("2006-01-02", payload.Dob)

		if err != nil {
			Resp.Success = false
			fmt.Println("Unable to convert date of birth")
		}

		regPayload.Password = string(cryptPw)
		regPayload.Email = payload.Email
		regPayload.FirstName = payload.Fname
		regPayload.LastName = payload.Lname
		regPayload.Dob = date
		regPayload.Image = payload.Avatar
		regPayload.NickName = payload.Nname
		regPayload.About = payload.About

		// ### CONNECT TO DATABASE ###

		db := db.DbConnect()

		var query *crud.Queries

		query = crud.New(db)

		// check if user already exists

		var checkExist crud.GetUserExistParams

		checkExist.Email = regPayload.Email
		checkExist.NickName = regPayload.NickName

		records, err := query.GetUserExist(context.Background(), checkExist)

		if err != nil {
			Resp.Success = false
			fmt.Println("Unable to check if user exists")
		}

		if records > 0 {

			// user already exists
			Resp.Success = false

		} else {

			// ### ATTEMPT TO ADD USER TO DATABASE ###
			var curUser crud.User
			curUser, err := query.CreateUser(context.Background(), regPayload)

			if err != nil {
				Resp.Success = false
				fmt.Println("Unable to create user!")
			}

			Resp.UserId = int(curUser.ID)
			Resp.Fname = curUser.FirstName
			Resp.Lname = curUser.LastName
			Resp.Nname = curUser.NickName
			Resp.Avatar = curUser.Image
			Resp.Email = curUser.Email
			Resp.About = curUser.About
			Resp.Dob = curUser.Dob.String()

			if email == "f" {
				Resp.Success = false
			}
		}

		jsonResp, err := json.Marshal(Resp)
		fmt.Println(string(jsonResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func Logouthandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/logout"); err != nil {
			return
		}

	// Prevents all request types other than POST
	if r.Method != http.MethodGet {
		http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Declares the handler response
	Resp := AuthResponse{Success: true}

	c, err := r.Cookie("session_token")

	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	sessionToken := c.Value

	// ### CONNECT TO DATABASE ###

	db := db.DbConnect()

	var query *crud.Queries

	query = crud.New(db)

	// ### REMOVE SESSION COOKIE FROM DATABASE AND BROWSER ###

	query.DeleteSession(context.Background(), sessionToken)

	http.SetCookie(w, &http.Cookie{
		Name:  "session_token",
		Value: "",
	})

	// Marshals the response struct to a json object
	jsonResp, err := json.Marshal(Resp)
	if err != nil {
		http.Error(w, "500 internal server error", http.StatusInternalServerError)
		return
	}

	// Sets the http headers and writes the response to the browser
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResp)
}


func Posthandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodPost {
		fmt.Printf("-----POST---(create-post)--\n")
		var payload PostStruct

		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(payload)

		author := payload.Author
		message := payload.Message
		image := payload.Image
		privacy := payload.Privacy
		createdAt := time.Now()

		fmt.Printf("post author userid %d\n", author)
		fmt.Printf("post message %s\n", message)
		fmt.Printf("post image %s\n", image)
		fmt.Printf("post privacy %d\n", privacy)
		fmt.Printf("post created at %d\n", createdAt)

		var Resp PostResponse
		Resp.Success = true

		// insert post to database

		db := db.DbConnect()

		var post crud.CreatePostParams

		post.Author = int64(payload.Author)
		post.Message = payload.Message
		post.CreatedAt = createdAt
		post.Image = payload.Image
		post.Privacy = int64(payload.Privacy)

		query := crud.New(db)

		newPost, err := query.CreatePost(context.Background(), post)

		if err != nil {
			Resp.Success = false
			fmt.Println("Unable to insert new post")
		}

		Resp.Author = int(newPost.Author)
		Resp.CreatedAt = newPost.CreatedAt.String()
		Resp.Image = newPost.Image
		Resp.Message = newPost.Message

		curUser, err := query.GetUserById(context.Background(), newPost.Author)

		if err != nil {
			Resp.Success = false
			fmt.Println("Unable to get user information")
		}

		Resp.Avatar = curUser.Image
		Resp.Fname = curUser.FirstName
		Resp.Nname = curUser.NickName
		Resp.Lname = curUser.LastName

		jsonResp, err := json.Marshal(Resp)

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}

	if r.Method == http.MethodGet {
		fmt.Printf("----post-GET---(display-posts)--\n")

		var data []PostResponse

		// get all public posts

		db := db.DbConnect()

		query := crud.New(db)

		posts, err := query.GetAllPosts(context.Background())

		if err != nil {
			fmt.Println("Unable to get all posts")
		}

		for _, post := range posts {
			var newPost PostResponse
			newPost.Success = true
			newPost.Id = int(post.ID)
			newPost.Author = int(post.Author)
			newPost.Message = post.Message
			newPost.CreatedAt = post.CreatedAt.String()
			newPost.Image = post.Image

			curUser, err := query.GetUserById(context.Background(), post.Author)

			if err != nil {
				newPost.Success = false
				fmt.Println("Unable to get user information")
			}

			newPost.Avatar = curUser.Image
			newPost.Fname = curUser.FirstName
			newPost.Lname = curUser.LastName
			newPost.Nname = curUser.NickName

			data = append(data, newPost)
		}

		// fmt.Printf("data %v\n", data)
		jsonResp, _ := json.Marshal(data)
		// fmt.Printf("posts resp %s\n", string(jsonResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func PostCommentHandler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf(w, "Post")

	if r.Method == http.MethodPost {
		fmt.Printf("-----POST---(create-comment)--\n")
		var payload PostCommentStruct

		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(payload)

		postid := payload.PostId
		userid := payload.UserId
		content := payload.Message
		image := payload.Image
		payload.CreatedAt = time.Now()

		fmt.Printf("postid %d\n", postid)
		fmt.Printf("userid %d\n", userid)
		fmt.Printf("content %s\n", content)
		fmt.Printf("image %s\n", image)

		// insert comment into database

		db := db.DbConnect()

		var postComment crud.CreatePostCommentParams

		postComment.PostID = int64(payload.PostId)
		postComment.UserID = int64(payload.UserId)
		postComment.Message = payload.Message
		postComment.CreatedAt = payload.CreatedAt
		postComment.Image = payload.Image

		query := crud.New(db)

		_, err = query.CreatePostComment(context.Background(), postComment)

		if err != nil {
			fmt.Println("Unable to insert new comment")
		}

		var Resp PostCommentResponse
		Resp.Success = true
		jsonResp, err := json.Marshal(Resp)

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}

	if r.Method == http.MethodGet {
		fmt.Printf("----post-comment-GET---(display)--\n")

		var data []PostCommentResponse

		// get all comments

		db := db.DbConnect()

		query := crud.New(db)

		comments, err := query.GetAllComments(context.Background())

		if err != nil {
			fmt.Println("Unable to get all comments")
		}

		for _, comment := range comments {
			var newComment PostCommentResponse
			newComment.Success = true
			newComment.PostId = int(comment.PostID)
			newComment.UserId = int(comment.UserID)
			newComment.CreatedAt = comment.CreatedAt.String()
			newComment.Message = comment.Message
			newComment.Image = comment.Image

			curUser, err := query.GetUserById(context.Background(), comment.UserID)

			if err != nil {
				newComment.Success = false
				fmt.Println("Unable to get user information")
			}

			newComment.Avatar = curUser.Image
			newComment.Fname = curUser.FirstName
			newComment.Lname = curUser.LastName
			newComment.Nname = curUser.NickName

			data = append(data, newComment)
		}
		fmt.Println(data)
		jsonResp, _ := json.Marshal(data)
		// fmt.Printf("posts resp %s\n", string(jsonResp))

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func Userhandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/user"); err != nil {
			return
		}

	// Prevents all request types other than GET
	if r.Method != http.MethodGet {
		http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Checks to find a user id in the url
	userId := r.URL.Query().Get("id")
	id, err := strconv.Atoi(userId)
	if err != nil {
		fmt.Println("Unable to convert to int")
	}

	foundId := false

	if userId != "" {
		foundId = true
	}

	// Declares the payload struct
	var Resp UserPayload

	// ### CONNECT TO DATABASE ###

	db := db.DbConnect()

	query := crud.New(db)

	if foundId {
		// ### GET USER BY ID ###
		user, err := query.GetUserById(context.Background(), int64(id))

		if err != nil {
			fmt.Println("Unable to find user")
		}

		var oneUser UserStruct

		oneUser.Id = int(user.ID)
		oneUser.Fname = user.FirstName
		oneUser.Lname = user.LastName
		oneUser.Nname = user.NickName
		oneUser.Email = user.Email
		oneUser.Password = user.Password
		oneUser.Dob = user.Dob.String()
		oneUser.Avatar = user.Image
		oneUser.About = user.About
		oneUser.Public = int(user.Public)

		Resp.Data = append(Resp.Data, oneUser)

	} else {
		// ### GET ALL USERS ###
		users, err := query.ListUsers(context.Background())

		if err != nil {
			fmt.Println("Unable to get users")
		}

		for _, user := range users {
			var oneUser UserStruct

			oneUser.Id = int(user.ID)
			oneUser.Fname = user.FirstName
			oneUser.Lname = user.LastName
			oneUser.Nname = user.NickName
			oneUser.Email = user.Email
			oneUser.Password = user.Password
			oneUser.Dob = user.Dob.String()
			oneUser.Avatar = user.Image
			oneUser.About = user.About
			oneUser.Public = int(user.Public)

			Resp.Data = append(Resp.Data, oneUser)
		}

	}

	// Marshals the response struct to a json object
	jsonResp, err := json.Marshal(Resp)
	if err != nil {
		http.Error(w, "500 internal server error", http.StatusInternalServerError)
		return
	}

	// Sets the http headers and writes the response to the browser
	WriteHttpHeader(jsonResp, w)

}

func UserFollowerHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/user-follower"); err != nil {
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp UserPayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL FOLLOWERS FOR USER ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the follower details and handler response
			var follower UserFollowerStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&follower)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD FOLLOWER TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func UserMessageHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/user-message"); err != nil {
			return
		}

		targetId := r.URL.Query().Get("id")
		if targetId == "" {
			http.Error(w, "400 bad request", http.StatusBadRequest)
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp UserMessagePayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL MESSAGES FOR THE TARGET ID ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the user message details and handler response
			var userMessage UserMessageStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&userMessage)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD USER MESSAGE TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func Grouphandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group"); err != nil {
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Checks to find a group id in the url
			groupId := r.URL.Query().Get("id")
			foundId := false

			if groupId != "" {
				foundId = true
			}

			// Declares the payload struct
			var Resp GroupPayload

			// ### CONNECT TO DATABASE ###

			// Gets the group by id if an id was passed in the url
			// Otherwise, gets all group
			if foundId {
				// ### GET GROUP BY ID ###

				// ### CHECK IF USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

				// ### IF THEY MATCH, GET GROUP DATA FROM DATABASE ###

				// ### ELSE, REQUEST TO JOIN ###
			} else {
				// ### GET ALL GROUPS ###
			}

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group details and handler response
			var post GroupStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&post)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD GROUP TO DATABASE ###

			// ### ADD GROUP CREATOR TO GROUP MEMBER TABLE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func GroupMemberHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group-member"); err != nil {
			return
		}

		// ### CHECK USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

		switch r.Method {
		case http.MethodGet:
			// Checks to find a user id in the url
			userId := r.URL.Query().Get("id")
			foundId := false

			if userId != "" {
				foundId = true
			}

			// Declares the payload struct
			var Resp UserPayload

			// ### CONNECT TO DATABASE ###

			// Gets the user by id if an id was passed in the url
			// Otherwise, gets all users
			if foundId {
				// ### GET USER BY ID ###
			} else {
				// ### GET ALL USERS ###
			}

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group member details and handler response
			var groupMember GroupRequestStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&groupMember)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### UPDATE GROUP REQUEST TABLE AND ADD USER TO GROUP MEMBER TABLE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func GroupRequestHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group-request"); err != nil {
			return
		}

		// ### CHECK USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

		switch r.Method {
		case http.MethodGet:
			// ### CHECK USER IS GROUP CREATOR ###

			// Declares the payload struct
			var Resp GroupRequestPayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL GROUP REQUESTS FOR GROUP ID ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group request details and handler response
			var groupRequest GroupRequestStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&groupRequest)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD GROUP REQUEST TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func GroupPostHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group-post"); err != nil {
			return
		}

		// ### CHECK USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

		switch r.Method {
		case http.MethodGet:
			// Checks to find a post id in the url
			postId := r.URL.Query().Get("id")
			foundId := false

			if postId != "" {
				foundId = true
			}

			// Declares the payload struct
			var Resp GroupPostPayload

			// ### CONNECT TO DATABASE ###

			// Gets the post by id if an id was passed in the url
			// Otherwise, gets all posts
			if foundId {
				// ### GET GROUP POST BY ID ###
			} else {
				// ### GET ALL GROUP POSTS ###
			}

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group post details and handler response
			var groupPost GroupPostStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&groupPost)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD GROUP POST TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func GroupPostCommentHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group-post-comment"); err != nil {
			return
		}

		// ### CHECK USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

		// Checks to find a post id in the url
		groupPostId := r.URL.Query().Get("id")
		if groupPostId == "" {
			http.Error(w, "400 bad request", http.StatusBadRequest)
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp GroupPostCommentPayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL COMMENTS FOR THE GROUP POST ID ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group post comment details and handler response
			var groupPostComment GroupPostCommentStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&groupPostComment)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD GROUP POST COMMENT TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func GroupEventHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group-event"); err != nil {
			return
		}

		// ### CHECK USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

		groupId := r.URL.Query().Get("id")
		if groupId == "" {
			http.Error(w, "400 bad request", http.StatusBadRequest)
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp GroupEventPayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL EVENTS FOR THE GROUP ID ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group event details and handler response
			var groupEvent GroupEventStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&groupEvent)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD GROUP EVENT TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func GroupEventMemberHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group-event-member"); err != nil {
			return
		}

		// ### CHECK USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

		// Checks to find a post id in the url
		eventId := r.URL.Query().Get("id")
		if eventId == "" {
			http.Error(w, "400 bad request", http.StatusBadRequest)
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp GroupEventMemberPayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL GROUP EVENT MEMBERS ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group event member details and handler response
			var groupPost GroupEventMemberStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&groupPost)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD/UPDATE GROUP EVENT MEMBER TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func GroupMessageHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		EnableCors(&w)
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/group-message"); err != nil {
			return
		}

		// ### CHECK USER ID AND GROUP ID MATCH IN GROUP MEMBER TABLE ###

		groupId := r.URL.Query().Get("id")
		if groupId == "" {
			http.Error(w, "400 bad request", http.StatusBadRequest)
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp GroupMessagePayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL MESSAGES FOR THE GROUP ID ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the group message details and handler response
			var groupMessage GroupMessageStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&groupMessage)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD GROUP MESSAGE TO DATABASE ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}
