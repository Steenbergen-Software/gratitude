package main

import (
	"fmt"
	"log"

	"github.com/Steenbergen-Software/gratitude/api-go-pgsql/api"
)

const (
	serverAddress = "0.0.0.0:8080"
)

func main() {
	fmt.Println("10 Fibonacci sequences:")
	fmt.Println(getFibonacciSequenceAsArray(10))

	server := api.NewServer()
	err := server.Start(serverAddress)
	if err != nil {
		log.Fatal("cannot start server: ", err)
	}
}

func getFibonacciSequenceAsArray(n int) []uint64 {
	var fibonacciSequence []uint64
	fibonacciSequence = append(fibonacciSequence, 0)
	fibonacciSequence = append(fibonacciSequence, 1)
	for i := 2; i <= n; i++ {
		fibonacciSequence = append(fibonacciSequence, fibonacciSequence[i-1]+fibonacciSequence[i-2])
	}
	return fibonacciSequence
}
