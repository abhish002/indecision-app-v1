class Person {
    constructor(name = 'Anonymous', age = 0){
        this.name = name;
        this.age = age;
    }

    getGreeting(){
        return `Hi I am ${this.name}!`;
    }
    description(){
        return `${this.name} is ${this.age} year(s) old.`
    }
}

const personOne = new Person('Abhish', 33);
console.log(personOne.description());

class Traveller extends Person{
    constructor(name, age, homeLocation){
        super(name, age);
        this.homeLocation = homeLocation;
    }

    hasHomeLocation(){
        return !!this.homeLocation;
    }

    getGreeting(){
        let greeting = super.getGreeting();
        if(this.hasHomeLocation()){
            return greeting + ` I am visiting from ${this.homeLocation}`;
        }
        
        return greeting;
    }
}

const p1 = new Traveller('Abhish', 33, 'Kansas City');
const p2 = new Traveller();
console.log(p1.getGreeting());
console.log(p2.getGreeting());