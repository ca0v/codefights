package main

import (
	"fmt"
	"math/rand"
	"time"
)

import "math"

func celciusToFahrenheit(c float64) float64 {
	return c*9/5 + 32
}

func add(x int, y int) int {
	return 10 * x + y
}

func swap(x, y int) (int, int) {
	return y, x
}

// factored variable declarations
var (
	isIt = true
	better bool
	toBe   bool       = false
	orNot  bool       = true
)

func main() {
	// explicit variable declarations
	var a, b bool = true, false
	var c bool

	// implicit variable declarations
	d := a != b
	c = d
	fmt.Println(a, b, c, isIt, better, toBe, orNot)
	fmt.Println("Hello, world: %q", add(200, 22))
	fmt.Println("Time:", time.Now())
	fmt.Println("Random:", rand.Intn(100))
	fmt.Println("Pi:", math.Pi)
	fmt.Print("math", math.Sqrt(2))
	fmt.Println("math", 1/math.Sin(math.Pi/4))
	fmt.Println("Swap", add(swap(1, 2)))
	fmt.Println("Celcius to Fahrenheit", celciusToFahrenheit(-40), celciusToFahrenheit(0), celciusToFahrenheit(100))
}
