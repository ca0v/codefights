package main

import (
	"fmt"
	"net/http"
	"time"
	"log"
)

func greet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World! %s", time.Now())
}

func main() {
	log.Println("Server started on: http://localhost:8080")
	http.HandleFunc("/", greet)
	http.ListenAndServe(":8080", nil)
}