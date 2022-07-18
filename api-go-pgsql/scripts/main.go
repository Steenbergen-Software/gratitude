package main

import "fmt"

// this is a commment

func main() {
	fmt.Println("Fibonacci sequence:")
	fmt.Println(getFibonacciSequenceAsArray(10))
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
