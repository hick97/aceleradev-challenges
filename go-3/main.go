package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/context"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

var (
	database *sql.DB
	err      error
)

// Answer is a structure with response fields given by api.
type Answer struct {
	Actor string `json:"actor,omitempty"`
	Quote string `json:"quote,omitempty"`
}

var answers []Answer

func init() {
	database, _ = sql.Open("sqlite3", "./database.sqlite")

	if err != nil {
		log.Println(err)
		return
	}

	err = database.Ping()
	if err != nil {
		//log.Println(err)
		return
	}
	println("connected!")
	return
}

//PORT port to be used
const PORT = "8080"

func main() {
	r := mux.NewRouter()
	http.Handle("/", r)
	r.Handle("/v1/quote", quote()).Methods("GET", "OPTIONS")
	r.Handle("/v1/quote/{actor}", quoteByActor()).Methods("GET", "OPTIONS")
	logger := log.New(os.Stderr, "logger: ", log.Lshortfile)
	srv := &http.Server{
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		Addr:         ":" + PORT,
		Handler:      context.ClearHandler(http.DefaultServeMux),
		ErrorLog:     logger,
	}
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

func quote() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var detail string
		var actor string

		rows, _ := database.Query("SELECT detail, actor FROM scripts ORDER BY RANDOM() LIMIT 1")

		for rows.Next() {
			rows.Scan(&detail, &actor)
		}
		response := Answer{Actor: actor, Quote: detail}

		js, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	})
}

func quoteByActor() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)

		var detail string
		actor := params["actor"]
		actor = strings.ReplaceAll(actor, "+", " ")

		rows, _ := database.Query("SELECT detail, actor FROM scripts WHERE actor = $1 ORDER BY RANDOM() LIMIT 1", actor)

		for rows.Next() {
			rows.Scan(&detail, &actor)
		}
		response := Answer{Actor: actor, Quote: detail}

		js, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)

	})
}
