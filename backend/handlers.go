package backend

import (
	"fmt"
	"net/http"
)

func Homehandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home")
}
func Loginhandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "login")
}
func Reghandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "reg")
}
func Logouthandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "logout")
}
