class Pet {
  constructor(name, age) {
    console.log("IN PET CONSTRUCTOR!!");
    this.name = name;
    this.age = age;
  }

  eat() {
    return `${this.name} is eating!`;
  }
}

class Cat extends Pet {
  constructor(name, age, livesLeft = 9) {
    console.log("IN CAT CONSTRUCTOR!!");
    super(name, age);
    this.livesLeft = livesLeft;
  }

  meow() {
    return "MEOW!";
  }
}

class Dog extends Pet {
  bark() {
    return "WOOF!";
  }

  eat() {
    return `${this.name} mlem mlem mlem food!`;
  }
}

const wyatt = new Dog("wyatt", 3);
const monty = new Cat("monty", 12, 9);
