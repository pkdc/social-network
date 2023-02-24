package backend

import (
	"encoding/json"
	"net/http"
)

func Homehandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}

func Loginhandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if r.URL.Path != "/login" {
			http.Error(w, "404 not found.", http.StatusNotFound)
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
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func Reghandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if r.URL.Path != "/reg" {
			http.Error(w, "404 not found.", http.StatusNotFound)
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
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func Logouthandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if r.URL.Path != "/logout" {
			http.Error(w, "404 not found.", http.StatusNotFound)
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
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)
	}
}

func Userhandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if r.URL.Path != "/user" {
			http.Error(w, "404 not found.", http.StatusNotFound)
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

		// ### CONNECT TO DATABASE ###

		// ### IF NOT FOUND, GET ALL USERS ###

		// ### ELSE, USE PARAMETER TO FIND USER ###

		// ### MARSHAL RESULT TO JSON OBJECT ###

		// ### WRITE JSON TO FRONTEND ###
	}
}

func Posthandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Prevents the endpoint being called from other url paths
		if r.URL.Path != "/post" {
			http.Error(w, "404 not found.", http.StatusNotFound)
			return
		}

		switch r.Method {
		case http.MethodGet:
			// ### CHECKS FOR SEARCH PARAMETER ###

			// ### IF FOUND, GET ALL POSTS FROM ###

			// ### ELSE, USE PARAMETER TO FIND POST ###

			// ### MARSHAL RESULT TO JSON OBJECT ###

			// ### WRITE JSON TO FRONTEND ###
		case http.MethodPost:
			// ### READ REQUEST BODY TO STRUCT ###

			// ### CONNECT TO DATABASE ###

			// ### ADD POST TO DATABASE ###

			// ### WRITE RESPONSE TO FRONTEND ###
		default:
			// Prevents all request types other than POST and GET
			http.Error(w, "405 method not allowed", http.StatusMethodNotAllowed)
			return
		}
	}
}

func Grouphandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}