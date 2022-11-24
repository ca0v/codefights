package main

import (
	"fmt"
	"math"
)

var uom = map[string]float64 {
	"m": 1.0,
	"km": 1000,
	"cm": 0.01,
	"mm": 0.001,
	"in": 2.54 / 100.0,
	"ft": 12 * 2.54 / 100.0,
}

func polar(x float64, y float64) (radius float64, angle float64) {
	radius = math.Sqrt(x*x + y*y)
	angle = math.Atan2(y, x)
	return
}

func cartesian(radius float64, angle float64) (float64, float64) {
	return radius * math.Cos(angle), radius * math.Sin(angle)
}

func fill(array *[]float64, value float64) {
	for i := 0; i<len(*array); i++ {
		(*array)[i] = value
	}
}

func dump(array *[]float64) {
	for _,v := range *array {
		fmt.Println(v)
	}
}

func main() {
	var x = float64(10)
	y := float64(20)

	// grow x until it is not smaller than y
	for x < y {
		x++
	}

	if x > y {
	}

	// add x to y
	for i := 0; i < int(x); i++ {
		y++
	}

	fmt.Printf("x=%f y=%f\n", x, y)
	y, x = x, y
	fmt.Printf("x=%f y=%f\n", x, y)

	x, y = 10, -10
	{
		var radius, angle = polar(float64(x), float64(y))
		fmt.Printf("radius=%f angle=%f\n", radius, angle)
		x, y = cartesian(radius, angle)
		fmt.Printf("x=%f y=%f\n", x, y)
	}

	var slice []float64 = make([]float64, 10, 10)
	fill(&slice, 1.0)
	dump(&slice)

	x = slice[0]
	y = slice[1]
	fmt.Printf("x=%f y=%f\n", x, y)

	fmt.Printf("cm per foot: %f", uom["ft"]/uom["cm"])
	fmt.Printf("foot/m: %f", uom["m"]/uom["ft"])

}
