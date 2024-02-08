import {
    Allergen, Category, Coordinate, Dish, Menu, Restaurant,
} from "./Restaurant.js";

const MODEL = Symbol('restaurant');
const VIEW = Symbol('restaurantView');
const LOAD_RESTAURANT_OBJECT = Symbol('Load Restaurant Objects');


class RestaurantController {
    constructor(model, view) {
        this[MODEL] = model;
        this[VIEW] = view;
        this.onLoad();
        this.onInit();
        this[VIEW].bindInit(this.handleInit);
    }

    [LOAD_RESTAURANT_OBJECT]() {
        const category1 = this[MODEL].createCategory('Entradas', 'Es un plato de comida que puede consumirse como 1er plato un plato de menor cantidad de comida que el plato principal.');
        const category2 = this[MODEL].createCategory('Sopas', 'Son preparaciones culinarias consistentes en un líquido con sustancia y mucho sabor. En algunos casos poseen ingredientes sólido.');
        const category3 = this[MODEL].createCategory('Ensaladas', 'Las ensaladas pueden estar compuestas de verduras, frutas y/o proteínas. Pueden tener ingredientes crudos y/o cocidos.');

        const allergen1 = this[MODEL].createAllergen('Allergen1', 'Description 1');
        const allergen2 = this[MODEL].createAllergen('Allergen2', 'Description 2');
        const allergen3 = this[MODEL].createAllergen('Allergen3', 'Description 3');
        const allergen4 = this[MODEL].createAllergen('Allergen4', 'Description 4');

        const dish1 = this[MODEL].createDish('Entrante1', 'Descripción del Entrante 1', 'Ingrediente1, Ingrediente2');
        const dish2 = this[MODEL].createDish('Entrante2', 'Descripción del Entrante 2', 'Ingrediente3, Ingrediente4');
        const dish3 = this[MODEL].createDish('Entrante3', 'Descripción del Entrante 3', 'Ingrediente5, Ingrediente6');
        const dish4 = this[MODEL].createDish('Entrante4', 'Descripción del Entrante 4', 'Ingrediente7, Ingrediente8');

        const dish5 = this[MODEL].createDish('Ensalada1', 'Descripción de la Ensalada 1', 'Ingrediente9, Ingrediente10');
        const dish6 = this[MODEL].createDish('Ensalada2', 'Descripción de la Ensalada 2', 'Ingrediente11, Ingrediente12');
        const dish7 = this[MODEL].createDish('Ensalada3', 'Descripción de la Ensalada 3', 'Ingrediente13, Ingrediente14');
        const dish8 = this[MODEL].createDish('Ensalada4', 'Descripción de la Ensalada 4', 'Ingrediente15, Ingrediente16');

        const dish9 = this[MODEL].createDish('Sopa1', 'Descripción de la Sopa 1', 'Ingrediente17, Ingrediente18');
        const dish10 = this[MODEL].createDish('Sopa2', 'Descripción de la Sopa 2', 'Ingrediente19, Ingrediente20');
        const dish11 = this[MODEL].createDish('Sopa3', 'Descripción de la Sopa 3', 'Ingrediente21, Ingrediente22');
        const dish12 = this[MODEL].createDish('Sopa4', 'Descripción de la Sopa 4', 'Ingrediente23, Ingrediente24');

        const menu1 = this[MODEL].createMenu('Menu1', 'Menu Description 1');
        const menu2 = this[MODEL].createMenu('Menu2', 'Menu Description 2');
        const menu3 = this[MODEL].createMenu('Menu3', 'Menu Description 3');

        const restaurant1 = this[MODEL].createRestaurant('Restaurant1', 'Restaurant Description 1', new Coordinate(162, 120));
        const restaurant2 = this[MODEL].createRestaurant('Restaurant2', 'Restaurant Description 2', new Coordinate(138, 159));
        const restaurant3 = this[MODEL].createRestaurant('Restaurant3', 'Restaurant Description 3', new Coordinate(192, 125));

        this[MODEL].addCategory(category1).addCategory(category2).addCategory(category3).addMenu(menu1)
            .addMenu(menu2).addMenu(menu3).addAllergen(allergen1).addAllergen(allergen2).addAllergen(allergen3).addAllergen(allergen4)
            .addDish(dish1).addDish(dish2).addDish(dish3).addDish(dish4)
            .addDish(dish5).addDish(dish6).addDish(dish7).addDish(dish8)
            .addDish(dish9).addDish(dish10).addDish(dish11).addDish(dish12)
            .addRestaurant(restaurant1).addRestaurant(restaurant2).addRestaurant(restaurant3);

        this[MODEL].assignCategoryToDish(dish1, category1);
        this[MODEL].assignAllergenToDish(dish1, allergen1);
        this[MODEL].assignAllergenToDish(dish1, allergen2)
        this[MODEL].assignDishToMenu(menu1, dish1);

    }

    onLoad = () => {
        this[LOAD_RESTAURANT_OBJECT]();
        this[VIEW].showCategories(this[MODEL].getCategories());
        this[VIEW].showDishes(this[MODEL].getDishes());
        this.onAddCategory();
    };

    onInit = () => {
    }

    handleInit = () => {
        this.onInit();
    }

    onAddCategory = () => {
        this[VIEW].showMenuCategories(this[MODEL].getCategories());
    };

}

export default RestaurantController;