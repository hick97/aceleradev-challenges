package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
)

// CSV Labels used in this challenge
const (
	fullName    = "full_name"
	nationality = "nationality"
	club        = "club"
	eurWage     = "eur_wage"
	age         = "age"
)

// Player is a struct with data used on methods of this file
type Player struct {
	FullName    string
	Nationality string
	Club        string
	EurWage     float64
	Age         int
}

func main() {
	//Todas as perguntas são referentes ao arquivo data.csv
	natNumber := make(chan int)
	clubsNumber := make(chan int)
	playerPerAge := make(chan map[int]int)
	theTwenty := make(chan []string)
	richers := make(chan []string)
	moreOlds := make(chan []string)

	go func() {
		result, _ := q1()

		natNumber <- result
	}()
	go func() {
		result, _ := q2()

		clubsNumber <- result
	}()
	go func() {
		result, _ := q3()

		theTwenty <- result

	}()
	go func() {
		result, _ := q4()

		richers <- result

	}()
	go func() {
		result, _ := q5()

		moreOlds <- result

	}()
	go func() {
		result, _ := q6()

		playerPerAge <- result

	}()

	fmt.Println(<-natNumber)
	fmt.Println(<-clubsNumber)
	fmt.Println(<-theTwenty)
	fmt.Println(<-richers)
	fmt.Println(<-moreOlds)
	fmt.Println(<-playerPerAge)

}

func fillListOfPlayers() []Player {

	// Reading CSV File
	csvFile, _ := os.Open("data.csv")
	reader := csv.NewReader(bufio.NewReader(csvFile))

	records, error := reader.ReadAll()

	if error != nil {
		log.Fatal(error)
	}

	var players []Player
	var labelsIndex map[string]int

	// Map with index of each label
	labelsIndex = make(map[string]int)

	labels := records[0]

	indexFn := make(chan int)
	indexN := make(chan int)
	indexC := make(chan int)
	indexEw := make(chan int)
	indexA := make(chan int)

	//Using go routines for find label indexes
	go func() {
		indexFn <- findIndex(labels, fullName)
	}()
	go func() {
		indexN <- findIndex(labels, nationality)
	}()
	go func() {
		indexC <- findIndex(labels, club)
	}()
	go func() {
		indexEw <- findIndex(labels, eurWage)
	}()
	go func() {
		indexA <- findIndex(labels, age)
	}()

	labelsIndex[fullName] = <-indexFn
	labelsIndex[nationality] = <-indexN
	labelsIndex[club] = <-indexC
	labelsIndex[eurWage] = <-indexEw
	labelsIndex[age] = <-indexA

	// Filling player list
	for index := 1; index < len(records[:]); index++ {
		fn := records[index][labelsIndex[fullName]]
		n := records[index][labelsIndex[nationality]]
		c := records[index][labelsIndex[club]]
		ew, _ := strconv.ParseFloat(records[index][labelsIndex[eurWage]], 64)
		a, _ := strconv.Atoi(records[index][labelsIndex[age]])

		players = append(players, Player{fn, n, c, ew, a})
	}

	return players
}

func findIndex(a []string, x string) int {
	for i, n := range a {
		if x == n {
			return i
		}
	}

	return -1
}

//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo?
func q1() (int, error) {

	players := fillListOfPlayers()

	listOfNationalities := []string{}

	for _, player := range players {
		if findIndex(listOfNationalities, player.Nationality) == -1 {

			listOfNationalities = append(listOfNationalities, player.Nationality)
		}
	}

	return len(listOfNationalities), nil
}

//Quantos clubes (coluna `club`) diferentes existem no arquivo?
func q2() (int, error) {

	players := fillListOfPlayers()

	listOfClubs := []string{}

	for _, player := range players {
		if findIndex(listOfClubs, player.Club) == -1 {
			if player.Club != "" {
				listOfClubs = append(listOfClubs, player.Club)
			}
		}
	}

	return len(listOfClubs), nil
}

//Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
func q3() ([]string, error) {

	players := fillListOfPlayers()

	listName := []string{}
	firstPlayers := players[:20]

	for _, player := range firstPlayers {
		listName = append(listName, player.FullName)
	}

	if len(listName) != 20 {
		return nil, fmt.Errorf("Erro ao listar os 20 primeiros jogadores")
	}

	return listName, nil
}

//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
func q4() ([]string, error) {
	players := fillListOfPlayers()

	listName := []string{}

	sort.SliceStable(players, func(i, j int) bool {
		return players[i].EurWage > players[j].EurWage
	})

	for index := 0; index < len(players[:10]); index++ {
		listName = append(listName, players[index].FullName)
	}

	if len(listName) != 10 {
		return nil, fmt.Errorf("Erro ao listar os 10 jogadores mais ricos")
	}

	return listName, nil
}

//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
func q5() ([]string, error) {

	players := fillListOfPlayers()
	listName := []string{}

	sort.SliceStable(players, func(i, j int) bool {

		if players[i].Age == players[j].Age {
			return players[i].EurWage > players[j].EurWage
		}
		return players[i].Age > players[j].Age
	})

	for index := 0; index < len(players[:10]); index++ {
		listName = append(listName, players[index].FullName)
	}

	if len(listName) != 10 {
		return nil, fmt.Errorf("Erro ao listar os 10 jogadores mais velhos")
	}

	return listName, nil
}

//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
func q6() (map[int]int, error) {

	players := fillListOfPlayers()
	idades := make(map[int]int)

	sort.SliceStable(players, func(i, j int) bool {
		return players[i].Age > players[j].Age
	})

	maxAge := players[0].Age
	minAge := players[len(players)-1].Age

	currentAgeNumber := 0

	for index := minAge; index <= maxAge; index++ {
		for _, player := range players {
			if player.Age == index {
				currentAgeNumber++
			}
		}
		if currentAgeNumber != 0 {
			idades[index] = currentAgeNumber

		}
		currentAgeNumber = 0
	}

	return idades, nil
}
