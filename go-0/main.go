package main

import (
	"fmt"
	"sort"
)

// State is a structure with state properties
type State struct {
	Name      string
	Extension float64
}

func main() {

	// fmt.Println(country[:10])

	result, _ := os10maioresEstadosDoBrasil()

	fmt.Println(result)
}

func os10maioresEstadosDoBrasil() ([]string, error) {
	country := []State{
		{"Acre", 164123.040},
		{"Alagoas", 27778.506},
		{"Amapá", 142828.521},
		{"Amazonas", 1559159.148},
		{"Bahia", 564733.177},
		{"Ceará", 148920.472},
		{"Distrito Federal", 5779.999},
		{"Espírito Santo", 46095.583},
		{"Goiás", 340111.783},
		{"Maranhão", 331937.450},
		{"Mato Grosso", 903366.192},
		{"Mato Grosso do Sul", 357145.532},
		{"Minas Gerais", 586522.122},
		{"Pará", 1247954.666},
		{"Paraíba", 56585.000},
		{"Paraná", 199307.922},
		{"Pernambuco", 98311.616},
		{"Piauí", 251577.738},
		{"Rio de Janeiro", 43780.172},
		{"Rio Grande do Norte", 52811.047},
		{"Rio Grande do Sul", 281730.223},
		{"Rondônia", 237590.547},
		{"Roraima", 224300.506},
		{"Santa Catarina", 95736.165},
		{"São Paulo", 248222.362},
		{"Sergipe", 21915.116},
		{"Tocantins", 277720.520},
	}

	var data []string

	// Custo do sort O(n log n)
	sort.SliceStable(country, func(i, j int) bool {
		return country[i].Extension > country[j].Extension
	})

	bests := country[:10]

	for index := 0; index < len(bests); index++ {
		data = append(data, bests[index].Name)
	}

	if len(data) < 10 {
		return nil, fmt.Errorf("A saída contém menos que 10 países")
	}

	if len(data) > 10 {
		return nil, fmt.Errorf("A saída contém mais que 10 países")
	}

	return data, nil
}
