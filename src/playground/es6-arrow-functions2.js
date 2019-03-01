const multiplier = {
    numbers : [10, 20, 30, 40, 50],
    multiplyBy: 3,
    multiply(){
        return this.numbers.map(number => number * this.multiplyBy);
    }
}

console.log(multiplier.multiply());