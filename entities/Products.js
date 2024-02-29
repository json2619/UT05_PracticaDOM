import {
    BaseException,
    InvalidConstructorException,
    EmptyValueException,
    InvalidObjectException,
    RegisteredObjectException,
    NonRegisteredObjectException,
    NotFunctionException
} from "../js/Exceptions.js";

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
    #image

    constructor(name, description = '', image) {
        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Category)) throw new InvalidConstructorException();

        this.#name = name;
        this.#description = description;
        this.#image = image;
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

    getImage() {
        return this.#image;
    }

    setImage(newImage) {
        this.#image = newImage;
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
    #serial
    #name
    #description
    #ingredients
    #image
    #price

    constructor(serial, name, description = '', ingredients = '', image, price) {

        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Dish)) throw new InvalidConstructorException();

        this.#serial = serial;
        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;
        this.#price = price;
    }

    getSerial() {
        return this.#serial;
    }

    setSerial(newSerial) {
        this.#serial = newSerial;
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

    getPrice() {
        return this.#price;
    }

    setPrice(newPrice) {
        this.#price = newPrice;
    }

    toString() {
        return `Dish: ${this.#name}, Description: ${this.#description}, Ingredients: ${this.#ingredients}, Price: ${this.#price}`;
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
    #image

    constructor(name, description = '', location = new Coordinate(0, 0), image) {

        // Comprobamoes si no se introduce ningun valor, lanzamos excepcion
        if (name === undefined || name === "") throw new EmptyValueException();

        // Comprobamos que se cree con el operador new
        if (!(new.target === Restaurant)) throw new InvalidConstructorException();

        this.#name = name;
        this.#description = description;
        this.#location = location;
        this.#image = image;
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

    getImage() {
        return this.#image;
    }

    setImage(newImage) {
        this.#image = newImage;
    }


    toString() {
        return `Restaurant: ${this.#name}, Description: ${this.#description}, Location: ${this.#location.toString()}`;
    }
}

export {
    Allergen, Category, Coordinate, Dish, Menu, Restaurant
};