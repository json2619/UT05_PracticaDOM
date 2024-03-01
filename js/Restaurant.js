import {
    BaseException,
    InvalidConstructorException,
    EmptyValueException,
    InvalidObjectException,
    RegisteredObjectException,
    NonRegisteredObjectException,
    NotFunctionException
} from "../js/Exceptions.js";

import {
    Category, Allergen, Coordinate, Dish, Menu, Restaurant
} from "../entities/Products.js";

const RestaurantsManager = (function () {
    // Creamos la instace de nuestro patron Singleton
    let instance;

    // Creamos el objeto RestaurantsManager
    class RestaurantsManager {
        // Creamos las variables privadas de nuestra clase
        #name;
        #categories = new Map();
        #allergens = new Map();
        #dishes = new Map();
        #menus = new Map();
        #restaurants = new Map();

        constructor(name = "Restaurant Manager") {
            this.#name = name;
        }

        getCategories() {
            return this.#categories[Symbol.iterator]();
        }

        getCategory(title) {
            return this.#categories.get(title);
        }

        getMenus() {
            return this.#menus[Symbol.iterator]();
        }

        getMenu(title) {
            return this.#menus.get(title);
        }

        getAllergens() {
            return this.#allergens[Symbol.iterator]();
        }

        getAllergen(title) {
            return this.#allergens.get(title);
        }

        getRestaurants() {
            return this.#restaurants[Symbol.iterator]();
        }

        getRestaurant(title) {
            return this.#restaurants.get(title);
        }

        getDishes() {
            return this.#dishes;
        }

        getDish(title) {
            return this.#dishes.get(title).newDish;
        }

        getDishesInMenu(title) {
            return this.#menus.get(title).dishMenuArr;
        }

        addCategory(category) {

            if (!(category instanceof Category)) throw new InvalidObjectException();

            if (this.#categories.has(category.getName())) throw new RegisteredObjectException();

            this.#categories.set(category.getName(), category);
            return this;
        }

        removeCategory(category) {
            if (!category) {
                throw new EmptyValueException();
            }

            if (!this.#categories.has(category.getName())) {
                throw new NonRegisteredObjectException();
            }


            // Desasignar la categoría de todos los platos
            this.#dishes.forEach(dish => {
                const index = dish.dishCategory.findIndex(cat => cat.getName() === category.getName());
                if (index !== -1) {
                    dish.dishCategory.splice(index, 1);
                }
            });

            // Eliminar la categoría del mapa de categorías
            this.#categories.delete(category.getName());

            return this; // Retornar la instancia para encadenar
        }

        addMenu(menu) {
            if (!menu) {
                throw new EmptyValueException();
            }

            if (this.#menus.has(menu.getName())) {
                throw new RegisteredObjectException();
            }

            this.#menus.set(menu.getName(), {
                newMenu: menu,
                dishMenuArr: [],
            });
            return this;
        }

        removeMenu(menu) {
            if (!this.#menus.has(menu.getName())) {
                throw new NonRegisteredObjectException();
            }

            this.#menus.delete(menu.getName());
            return this;
        }

        addAllergen(allergen) {
            if (!allergen) {
                throw new EmptyValueException();
            }

            if (this.#allergens.has(allergen.getName())) {
                throw new RegisteredObjectException();
            }

            this.#allergens.set(allergen.getName(), allergen);
            return this;
        }

        removeAllergen(allergen) {
            if (!allergen) {
                throw new EmptyValueException();
            }

            if (!this.#allergens.has(allergen.getName())) {
                throw new NonRegisteredObjectException();
            }

            // Desasignar el alérgeno de todos los platos
            this.#dishes.forEach(dish => {
                const index = dish.dishAllergens.findIndex(alg => alg.getName() === allergen.getName());
                if (index !== -1) {
                    dish.dishAllergens.splice(index, 1);
                }
            });

            // Eliminar el alérgeno del mapa de alérgenos
            this.#allergens.delete(allergen.getName());

            return this; // Retornar la instancia para encadenar
        }

        addDish(dish) {
            if (!dish) {
                throw new EmptyValueException();
            }

            if (this.#dishes.has(dish.getName())) {
                throw new RegisteredObjectException();
            }

            this.#dishes.set(dish.getName(), {
                newDish: dish,
                dishCategory: [],
                dishAllergens: [],
            });
            return this;
        }

        removeDish(dish) {
            if (!dish) {
                throw new EmptyValueException();
            }

            if (!this.#dishes.has(dish.getName())) {
                throw new NonRegisteredObjectException();
            }

            this.#dishes.delete(dish.getName());
            return this;
        }

        addRestaurant(restaurant) {
            if (!restaurant) {
                throw new EmptyValueException();
            }

            if (this.#restaurants.has(restaurant.getName())) {
                throw new RegisteredObjectException();
            }

            this.#restaurants.set(restaurant.getName(), restaurant);
            return this;
        }

        removeRestaurant(restaurant) {
            if (!this.#restaurants.has(restaurant.getName())) {
                throw new Error('El restaurante no está registrado.');
            }

            this.#restaurants.delete(restaurant.getName());
            return this;
        }

        assignCategoryToDish(dish, ...categories) {

            // Verificar si la categoría y el plato existen en el sistema

            for (const category of categories) {

                // Verificar si la categoría y el plato son objetos válidos
                if (!category || !dish) {
                    throw new EmptyValueException();
                }

                if (this.#categories.has(category.getName())) {

                    if (this.#dishes.has(dish.getName())) {
                        // Obtener la categoría existente y el plato existente
                        const actualDish = this.#dishes.get(dish.getName());

                        let estaPresente = actualDish.dishCategory.some(function (element) {
                            return element.getName() === category.getName()
                        });

                        if (!estaPresente) {
                            actualDish.dishCategory.push(category);
                        }

                    }

                } else {
                    this.addCategory(category);
                    this.addDish(dish);
                    // Agregar la categoría al array de categorías del plato
                    this.#dishes.get(dish.getName()).dishCategory.push(category);
                }
            }

            return this;
        }

        deassingCategoryFromDish(dish, ...categories) {

            for (const category of categories) {
                // Verificar si la categoría y el plato son objetos válidos
                if (!category || !dish) {
                    throw new EmptyValueException();
                }

                // Obtener el objeto del plato
                if (this.#categories.has(category.getName()) && this.#dishes.has(dish.getName())) {
                    for (let [name, value] of this.#dishes) {

                        let pos = value.dishCategory.findIndex((element) => element.getName() === category.getName());

                        if (pos !== -1) {
                            value.dishCategory.splice(pos, 1);
                            break; // Si se encuentra, salimos del bucle externo
                        }
                    }

                }
            }

            return this;
        }

        assignAllergenToDish(dish, ...allergens) {

            for (const allergen of allergens) {
                if (!allergen || !dish) {
                    throw new EmptyValueException();
                }
                // Verificar si la categoría y el plato existen en el sistema
                if (this.#allergens.has(allergen.getName())) {

                    if (this.#dishes.has(dish.getName())) {
                        // Obtener el plato existente
                        const actualDish = this.#dishes.get(dish.getName());

                        let estaPresente = actualDish.dishAllergens.some(function (element) {
                            return element.getName() === allergen.getName()
                        });

                        if (!estaPresente) {
                            actualDish.dishAllergens.push(allergen);
                        }

                    } else {
                        this.addDish(dish);
                    }

                } else {
                    this.addAllergen(allergen);

                    // Agregar la categoría al array de categorías del plato
                    this.#dishes.get(dish.getName()).dishAllergens.push(allergen);
                }
            }

            return this;
        }

        deassignAllergenToDish(dish, ...allergens) {

            for (const allergen of allergens) {
                // Verificar si la categoría y el plato son objetos válidos
                if (!allergen || !dish) {
                    throw new EmptyValueException();
                }
                // Obtener la posición del alergeno que queremos quitar
                if (this.#allergens.has(allergen.getName()) && this.#dishes.has(dish.getName())) {
                    for (let [name, value] of this.#dishes) {

                        let pos = value.dishAllergens.findIndex((element) => element.getName() === allergen.getName());

                        if (pos !== -1) {
                            value.dishAllergens.splice(pos, 1);
                            break;
                        }
                    }
                }
            }

            return this;
        }

        assignDishToMenu(menu, ...dishes) {

            for (const dish of dishes) {
                // Verificar si la categoría y el plato son objetos válidos
                if (!menu || !dish) {
                    throw new EmptyValueException();
                }

                // Verificar si la categoría y el plato existen en el sistema
                if (this.#menus.has(menu.getName())) {

                    // Obtener la categoría existente y el plato existente
                    const actualMenu = this.#menus.get(menu.getName());

                    if (this.#dishes.has(dish.getName())) {

                        let estaPresente = actualMenu.dishMenuArr.some(function (element) {
                            return element.getName() === dish.getName()
                        });

                        if (!estaPresente) {
                            actualMenu.dishMenuArr.push(dish);
                        }

                    } else {
                        this.addDish(dish);
                    }

                } else {
                    this.addMenu(menu);
                    this.#menus.get(menu.getName()).dishMenuArr.push(dish);
                }
            }

            return this;
        }

        deassignDishToMenu(menu, ...dishes) {
            for (const dish of dishes) {
                // Verificar si la categoría y el plato son objetos válidos
                if (!menu || !dish) {
                    throw new EmptyValueException();
                }

                // Obtener la posición del alergeno que queremos quitar
                if (this.#menus.has(menu.getName()) && this.#dishes.has(dish.getName())) {
                    for (let [name, value] of this.#menus) {

                        let pos = value.dishMenuArr.findIndex((element) => element.getName() === dish.getName());

                        if (pos !== -1) {
                            value.dishMenuArr.splice(pos, 1);
                            break; // Si se encuentra, salimos del bucle externo
                        }
                    }
                }
            }

            return this;
        }

        changeDishesPositionsInMenu(menu, dish1, dish2) {
            // Verificar si el menú está registrado y es válido
            if (!menu || !dish1 || !dish2) {
                throw new EmptyValueException();
            }

            if (this.#menus.has(menu.getName()) && this.#dishes.has(dish1.getName()) && this.#dishes.has(dish2.getName())) {
                const dishMenu = this.#menus.get(menu.getName()).dishMenuArr;

                // Intercambiar las posiciones de los platos
                const index1 = dishMenu.indexOf(dish1);
                const index2 = dishMenu.indexOf(dish2);

                [dishMenu[index1], dishMenu[index2]] = [dishMenu[index2], dishMenu[index1]];
            }


            return this; // Retornar la instancia para encadenar
        }

        getDishesInCategory(category, criteria) {
            if (!category) {
                throw new EmptyValueException();
            }

            if (!this.#categories.has(category.getName())) {
                throw new NonRegisteredObjectException();
            }

            const filteredDishes = [];

            for (const [name, value] of this.#dishes) {

                for (const category of value.dishCategory) {
                    if (criteria(category)) {
                        filteredDishes.push(value.newDish);
                    }
                }
            }

            return filteredDishes[Symbol.iterator]();
        }

        getDishesWithAllergen(allergen, criteria) {
            if (!allergen) {
                throw new EmptyValueException();
            }

            if (!this.#allergens.has(allergen.getName())) {
                throw new NonRegisteredObjectException();
            }

            const filteredDishes = [];

            for (const [name, value] of this.#dishes) {
                for (const allergen of value.dishAllergens) {
                    if (criteria(allergen)) {
                        filteredDishes.push(value.newDish);
                    }
                }
            }

            return filteredDishes[Symbol.iterator]();
        }

        findDishes(search = null, order = null) {
            if (!search || typeof search !== 'function') {
                throw new NotFunctionException();
            }

            const dishIterator = this.#dishes.values();
            const filteredDishes = Array.from(dishIterator).filter(search);

            if (order) {
                filteredDishes.sort(order);
            }

            return filteredDishes[Symbol.iterator]();
        }

        // Metodo que crea un plato y devuelve un objeto dish
        createDish(serial, name, description, ingredients, image, price) {
            // Declaramos la variable plato que vamos a devolver
            let dish;

            if (this.#dishes.has(name)) {
                dish = this.#dishes.get(name).dish;
            } else {
                dish = new Dish(serial, name, description, ingredients, image, price);
            }

            // Devolvemos el plato
            return dish;
        }

        // Metodo que crea un menu y devuelve un objeto menu
        createMenu(name, description) {
            // Variable menu que vamos a devolver
            let menu;

            if (this.#menus.has(name)) {
                menu = this.#menus.get(name).menu;
            } else {
                menu = new Menu(name, description);
            }

            // Devolvemos el menu
            return menu;
        }

        // Metodo que crea un alergeno y devuelve un objeto allergen
        createAllergen(name, description) {
            // Variable alergeno que vamos a devolver
            let allergen;

            if (this.#allergens.has(name)) {
                allergen = this.#allergens.get(name).allergen;
            } else {
                allergen = new Allergen(name, description);
            }

            // Devolvemos el alergeno
            return allergen;
        }

        // Metodo que crea una categoria y devuelve un objeto Category
        createCategory(name, description, image) {
            // Variable caategory que vamos a devolver
            let category;

            if (this.#categories.has(name)) {
                category = this.#categories.get(name).category;
            } else {
                category = new Category(name, description, image);
            }

            // Devolvemos la categoria
            return category;
        }

        // Metodo que crea un restaurante y devuelve un objeto restaurant
        createRestaurant(name, description, locationx, locationy, image) {
            // Variable restaurant que vamos a devolver
            let restaurant;

            let location = new Coordinate(locationx, locationy);

            if (this.#restaurants.has(name)) {
                restaurant = this.#restaurants.get(name).restaurant;
            } else {
                restaurant = new Restaurant(name, description, location, image);
            }

            // Devolvemos el restaurante
            return restaurant;
        }

    }

    // Función con la que crearemos la instancia 
    // de nuestro patrón Singleton
    function createInstance() {
        const restaurantManager = new RestaurantsManager();
        Object.freeze(restaurantManager);
        return restaurantManager;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();

export default RestaurantsManager;
export {
    Allergen, Category, Coordinate, Dish, Menu, Restaurant
} from '../entities/Products.js';