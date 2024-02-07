import {
    Allergen, Category, Coordinate, Dish, Menu, Restaurant
} from "../entities/Products.js";

const MODEL = Symbol('RestaurantModel');
const VIEW = Symbol('RestaurantView');
const LOAD_MANAGER_OBJECTS = Symbol('Load Restaurant Objects');

class ManagerController {
    constructor(model, view) {
        this[MODEL] = model;
        this[VIEW] = view;
    }

    [LOAD_MANAGER_OBJECTS]() {
        const category1 = this[MODEL].createCategory('Category1', 'Description 1');
        const category2 = this[MODEL].createCategory('Category2', 'Description 2');

        const allergen1 = this[MODEL].createAllergen('Allergen1', 'Description 1');
        const allergen2 = this[MODEL].createAllergen('Allergen2', 'Description 2');

        const dish1 = this[MODEL].createDish('Dish1', 'Description 1', 'ingredient1, ingredient2');
        const dish2 = manager.createDish('Dish2', 'Description 2', 'Ingredient3,  Ingredient4');

        const menu1 = this[MODEL].createMenu('Menu1', 'Menu Description 1');
        const menu2 = this[MODEL].createMenu('Menu2', 'Menu Description 2');

        const restaurant1 = this[MODEL].createRestaurant('Restaurant1', 'Restaurant Description 1', new Coordinate(162, 120));
        const restaurant2 = this[MODEL].createRestaurant('Restaurant2', 'Restaurant Description 2', new Coordinate(138, 159));
    }


    onLoad = () => {
        this[LOAD_MANAGER_OBJECTS]();
    };

    onInit = () => {

    };

    handleInit = () => {
        this.onInit();
    };

}

export default ManagerController;