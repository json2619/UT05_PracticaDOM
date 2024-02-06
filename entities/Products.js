class Allergen {
    #name
    #description

    constructor(name, description = '') {

        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Allergen)) throw new InvalidConstructorException();


        this.#name = name;
        this.#description = description;
    }

    getName() {
        return this.#name;
    }

    setName(newName) {
        this.#name = newName;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(newDescription) {
        this.#description = newDescription;
    }

    toString() {
        return `Allergen: ${this.#name}, Description: ${this.#description}`;
    }
}

class Category {
    #name
    #description

    constructor(name, description = '') {
        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Category)) throw new InvalidConstructorException();

        this.#name = name;
        this.#description = description;
    }

    getName() {
        return this.#name;
    }

    setName(newName) {
        this.#name = newName;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(newDescription) {
        this.#description = newDescription;
    }

    toString() {
        return `Category: ${this.#name}, Description: ${this.#description}`;
    }
}

class Coordinate {
    #latitude
    #longitude

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    getLatitude() {
        return this.#latitude;
    }

    setLatitude(newLatitude) {
        this.#latitude = newLatitude;
    }

    getLongitude() {
        return this.#longitude;
    }

    setLongitude(newLongitude) {
        this.#longitude = newLongitude;
    }

    toString() {
        return `Latitude: ${this.#latitude}, Longitude: ${this.#longitude}`;
    }
}

class Dish {
    #name
    #description
    #ingredients
    #image

    constructor(name, description = '', ingredients = '') {

        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Dish)) throw new InvalidConstructorException();

        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = "";
    }

    getName() {
        return this.#name;
    }

    setName(newName) {
        this.#name = newName;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(newDescription) {
        this.#description = newDescription;
    }

    getIngredients() {
        return this.#ingredients;
    }

    setIngredients(newIngredients) {
        this.#ingredients = newIngredients;
    }

    getImage() {
        return this.#image;
    }

    setImage(newImage) {
        this.#image = newImage;
    }

    toString() {
        return `Dish: ${this.#name}, Description: ${this.#description}, Ingredients: ${this.#ingredients}, Image: ${this.#image}`;
    }
}

class Menu {
    #name
    #description

    constructor(name, description = '') {

        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Menu)) throw new InvalidConstructorException();

        this.#name = name;
        this.#description = description;
    }

    getName() {
        return this.#name;
    }

    setName(newName) {
        this.#name = newName;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(newDescription) {
        this.#description = newDescription;
    }

    toString() {
        return `Menu: ${this.#name}, Description: ${this.#description}`;
    }
}

class Restaurant {
    #name
    #description
    #location

    constructor(name, description = '', location = new Coordinate(0, 0)) {

        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Restaurant)) throw new InvalidConstructorException();

        this.#name = name;
        this.#description = description;
        this.#location = location;
    }

    getName() {
        return this.#name;
    }

    setName(newName) {
        this.#name = newName;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(newDescription) {
        this.#description = newDescription;
    }

    getLocation() {
        return this.#location;
    }

    setLocation(newLocation) {
        this.#location = newLocation;
    }

    toString() {
        return `Restaurant: ${this.#name}, Description: ${this.#description}, Location: ${this.#location.toString()}`;
    }
}

export {
    Allergen, Category, Coordinate, Dish, Menu, Restaurant
};