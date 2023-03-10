package backend

import (
	"encoding/json"
	"errors"
	"net/http"
)

func UrlPathMatcher(w http.ResponseWriter, r *http.Request, p string) error {
	if r.URL.Path != p {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return errors.New("404")
	}

	return nil
}

func WriteHttpHeader(jsonResp []byte, w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResp)
}

func Homehandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}

func SessionHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/session"); err != nil {
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp SessionStruct

			// ### CONNECT TO DATABASE ###

			// ### GET SESSION FOR USER ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the session details and handler response
			var follower SessionStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&follower)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD/UPDATE SESSION FOR USER ###

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

func Loginhandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/login"); err != nil {
			return
		}

		// Prevents all request types other than POST
		if r.Method != http.MethodPost {
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Declares the variables to store the login details and handler response
		var payload loginPayload
		Resp := AuthResponse{Success: true}

		// Decodes the json object to the struct, changing the response to false if it fails
		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			Resp.Success = false
		}

		// ### CONNECT TO DATABASE ###

		// ### SEARCH DATABASE FROM USER ###

		// ### COMPARE PASSWORD WITH THE HASH IN THE DATABASE (SKIP IF USER NOT FOUND) ###

		// ### UPDATE SESSION COOKIE IN DATABASE AND BROWSER (SKIP IF USER NOT FOUND OR IF PASSWORD DOES NOT MATCH) ###

		// Marshals the response struct to a json object
		jsonResp, err := json.Marshal(Resp)
		if err != nil {
			http.Error(w, "500 internal server error", http.StatusInternalServerError)
			return
		}

		// Sets the http headers and writes the response to the browser
		WriteHttpHeader(jsonResp, w)
	}
}

func Reghandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/reg"); err != nil {
			return
		}

		// Prevents all request types other than POST
		if r.Method != http.MethodPost {
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Declares the variables to store the registration details and handler response
		var payload regPayload
		Resp := AuthResponse{Success: true}

		// Decodes the json object to the struct, changing the response to false if it fails
		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			Resp.Success = false
		}

		// ### CONNECT TO DATABASE ###

		// ### ATTEMPT TO ADD USER TO DATABASE ###

		// Marshals the response struct to a json object
		jsonResp, err := json.Marshal(Resp)
		if err != nil {
			http.Error(w, "500 internal server error", http.StatusInternalServerError)
			return
		}

		// Sets the http headers and writes the response to the browser
		WriteHttpHeader(jsonResp, w)
	}
}

func Logouthandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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

		// ### CONNECT TO DATABASE ###

		// ### REMOVE SESSION COOKIE FROM DATABASE AND BROWSER ###

		// Marshals the response struct to a json object
		jsonResp, err := json.Marshal(Resp)
		if err != nil {
			http.Error(w, "500 internal server error", http.StatusInternalServerError)
			return
		}

		// Sets the http headers and writes the response to the browser
		WriteHttpHeader(jsonResp, w)
	}
}

func Userhandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
	}
}

func UserFollowerHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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

func Posthandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/post"); err != nil {
			return
		}

		switch r.Method {
		case http.MethodGet:
			// Checks to find a post id in the url
			postId := r.URL.Query().Get("id")
			foundId := false

			if postId != "" {
				foundId = true
			}

			// Declares the payload struct
			var Resp PostPayload

			// ### CONNECT TO DATABASE ###

			// Gets the post by id if an id was passed in the url
			// Otherwise, gets all posts
			if foundId {
				// ### GET POST BY ID CHECKING AGAINST POST MEMBER TABLE ###
			} else {
				// ### GET ALL POSTS USING POST MEMBER TABLE ###
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
			// Declares the variables to store the post details and handler response
			var post PostStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&post)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD POST TO DATABASE ###

			// ### CHECK PRIVACY OF THE POST AND ADD TO THE POST MEMBER TABLE ###

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

func PostCommentHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if err := UrlPathMatcher(w, r, "/post-comment"); err != nil {
			return
		}

		// Checks to find a post id in the url
		postId := r.URL.Query().Get("id")
		if postId == "" {
			http.Error(w, "400 bad request", http.StatusBadRequest)
			return
		}

		// ### CHECK IF USER ID AND POST ID MATCH IN POST MEMBER TABLE ###

		switch r.Method {
		case http.MethodGet:
			// Declares the payload struct
			var Resp PostCommentPayload

			// ### CONNECT TO DATABASE ###

			// ### GET ALL COMMENTS FOR THE POST ID ###

			// Marshals the response struct to a json object
			jsonResp, err := json.Marshal(Resp)
			if err != nil {
				http.Error(w, "500 internal server error", http.StatusInternalServerError)
				return
			}

			// Sets the http headers and writes the response to the browser
			WriteHttpHeader(jsonResp, w)
		case http.MethodPost:
			// Declares the variables to store the post comment details and handler response
			var postComment PostCommentStruct
			Resp := AuthResponse{Success: true}

			// Decodes the json object to the struct, changing the response to false if it fails
			err := json.NewDecoder(r.Body).Decode(&postComment)
			if err != nil {
				Resp.Success = false
			}

			// ### CONNECT TO DATABASE ###

			// ### ADD POST COMMENT TO DATABASE ###

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
