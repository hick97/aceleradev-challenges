package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

// Repository is a struct with api response fields
type Repository struct {
	FullName        string `json:"full_name"`
	Description     string `json:"description"`
	URL             string `json:"html_url"`
	StargazersCount int    `json:"stargazers_count"`
}

// Result is a struct with set of repositories
type Result struct {
	Items []Repository `json:"items"`
}

//FileFields contains fields of stars.json file
type FileFields struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	URL         string `json:"url"`
	Stars       int    `json:"stars"`
}

func main() {

	_ = githubStars("go")
}

func githubStars(lang string) error {
	language := url.QueryEscape(lang)
	url := fmt.Sprintf("https://api.github.com/search/repositories?q=language:%s&sort=stars&order=desc", language)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return fmt.Errorf("Erro ao construir requisição")
	}

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		return fmt.Errorf("Erro ao enviar requisição HTTP")
	}
	defer resp.Body.Close()

	var result Result
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return fmt.Errorf("Falha ao ler streams de dados JSON")
	}

	topTen := result.Items[:10]
	var answers []FileFields

	for _, value := range topTen {
		fields := FileFields{Name: value.FullName, Description: value.Description, URL: value.URL, Stars: value.StargazersCount}
		answers = append(answers, fields)
	}

	json, err := json.Marshal(answers)
	if err != nil {
		return fmt.Errorf("Falha ao formartar dados em JSON")
	}

	_ = ioutil.WriteFile("stars.json", json, 0644)

	return nil
}
