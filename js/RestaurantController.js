import {
    Allergen, Category, Coordinate, Dish, Menu, Restaurant,
} from "./Restaurant.js";

import { getCookie } from './util.js';

const MODEL = Symbol('restaurant');
const VIEW = Symbol('restaurantView');
const LOAD_RESTAURANT_OBJECT = Symbol('Load Restaurant Objects');
const AUTH = Symbol('AUTH');
const USER = Symbol('USER');



class RestaurantController {
    constructor(model, view, auth) {
        this[MODEL] = model;
        this[VIEW] = view;
        this[AUTH] = auth;
        this[USER] = null;


        this.onLoad();
        this.onInit();

        this[VIEW].bindInit(this.handleInit);
    }

    [LOAD_RESTAURANT_OBJECT]() {
        const category1 = this[MODEL].createCategory('Entrantes', 'Es un plato de comida que puede consumirse como 1er plato un plato de menor cantidad de comida que el plato principal.', 'img/categorias/entrada.jpg');
        const category2 = this[MODEL].createCategory('Sopas', 'Son preparaciones culinarias consistentes en un líquido con sustancia y mucho sabor. En algunos casos poseen ingredientes sólido.', 'img/categorias/sopa.jpg');
        const category3 = this[MODEL].createCategory('Ensaladas', 'Las ensaladas pueden estar compuestas de verduras, frutas y/o proteínas. Pueden tener ingredientes crudos y/o cocidos.', 'img/categorias/ensalada.jpg');

        const allergen1 = this[MODEL].createAllergen('Allergen1', 'Description 1');
        const allergen2 = this[MODEL].createAllergen('Allergen2', 'Description 2');
        const allergen3 = this[MODEL].createAllergen('Allergen3', 'Description 3');
        const allergen4 = this[MODEL].createAllergen('Allergen4', 'Description 4');

        const dish1 = this[MODEL].createDish('1', 'Entrante1', 'Descripción del Entrante 1', 'Ingrediente1, Ingrediente2', 'img/platos/entrante1.jpg', 10.99);
        const dish2 = this[MODEL].createDish('2', 'Entrante2', 'Descripción del Entrante 2', 'Ingrediente3, Ingrediente4', 'img/platos/entrante2.jpg', 12.99);
        const dish3 = this[MODEL].createDish('3', 'Entrante3', 'Descripción del Entrante 3', 'Ingrediente5, Ingrediente6', 'img/platos/entrante3.jpg', 9.99);
        const dish4 = this[MODEL].createDish('4', 'Entrante4', 'Descripción del Entrante 4', 'Ingrediente7, Ingrediente8', 'img/platos/entrante4.jpg', 11.99);

        const dish5 = this[MODEL].createDish('5', 'Ensalada1', 'Descripción de la Ensalada 1', 'Ingrediente9, Ingrediente10', 'img/platos/ensalada1.jpg', 8.99);
        const dish6 = this[MODEL].createDish('6', 'Ensalada2', 'Descripción de la Ensalada 2', 'Ingrediente11, Ingrediente12', 'img/platos/ensalada2.jpg', 7.99);
        const dish7 = this[MODEL].createDish('7', 'Ensalada3', 'Descripción de la Ensalada 3', 'Ingrediente13, Ingrediente14', 'img/platos/ensalada3.jpg', 10.99);
        const dish8 = this[MODEL].createDish('8', 'Ensalada4', 'Descripción de la Ensalada 4', 'Ingrediente15, Ingrediente16', 'img/platos/ensalada4.jpg', 9.99);

        const dish9 = this[MODEL].createDish('9', 'Sopa1', 'Descripción de la Sopa 1', 'Ingrediente17, Ingrediente18', 'img/platos/sopa1.jpg', 6.99);
        const dish10 = this[MODEL].createDish('10', 'Sopa2', 'Descripción de la Sopa 2', 'Ingrediente19, Ingrediente20', 'img/platos/sopa2.jpg', 5.99);
        const dish11 = this[MODEL].createDish('11', 'Sopa3', 'Descripción de la Sopa 3', 'Ingrediente21, Ingrediente22', 'img/platos/sopa3.jpg', 8.99);
        const dish12 = this[MODEL].createDish('12', 'Sopa4', 'Descripción de la Sopa 4', 'Ingrediente23, Ingrediente24', 'img/platos/sopa4.jpg', 7.99);

        const menu1 = this[MODEL].createMenu('Menu1', 'Menu Description 1');
        const menu2 = this[MODEL].createMenu('Menu2', 'Menu Description 2');
        const menu3 = this[MODEL].createMenu('Menu3', 'Menu Description 3');

        const restaurant1 = this[MODEL].createRestaurant('Restaurant1', 'Restaurant Description 1', '162', '120', 'img/restaurante/restaurante1.jpg');
        const restaurant2 = this[MODEL].createRestaurant('Restaurant2', 'Restaurant Description 2', '138', '159', 'img/restaurante/restaurante2.jpeg');
        const restaurant3 = this[MODEL].createRestaurant('Restaurant3', 'Restaurant Description 3', '192', '125', 'img/restaurante/restaurante3.jpeg');

        this[MODEL].addCategory(category1).addCategory(category2).addCategory(category3).addMenu(menu1)
            .addMenu(menu2).addMenu(menu3).addAllergen(allergen1).addAllergen(allergen2).addAllergen(allergen3).addAllergen(allergen4)
            .addDish(dish1).addDish(dish2).addDish(dish3).addDish(dish4)
            .addDish(dish5).addDish(dish6).addDish(dish7).addDish(dish8)
            .addDish(dish9).addDish(dish10).addDish(dish11).addDish(dish12)
            .addRestaurant(restaurant1).addRestaurant(restaurant2).addRestaurant(restaurant3);

        this[MODEL].assignCategoryToDish(dish1, category1).assignCategoryToDish(dish2, category1).assignCategoryToDish(dish3, category1).assignCategoryToDish(dish4, category1)
            .assignCategoryToDish(dish5, category3).assignCategoryToDish(dish6, category3).assignCategoryToDish(dish7, category3).assignCategoryToDish(dish8, category3)
            .assignCategoryToDish(dish9, category2).assignCategoryToDish(dish10, category2).assignCategoryToDish(dish11, category2).assignCategoryToDish(dish12, category2);

        this[MODEL].assignAllergenToDish(dish1, allergen1, allergen2, allergen3, allergen4).assignAllergenToDish(dish2, allergen2, allergen3).assignAllergenToDish(dish3, allergen1, allergen3)
            .assignAllergenToDish(dish4, allergen1, allergen2, allergen3).assignAllergenToDish(dish5, allergen2, allergen3, allergen4).assignAllergenToDish(dish6, allergen2, allergen3)
            .assignAllergenToDish(dish7, allergen3).assignAllergenToDish(dish8, allergen3, allergen4).assignAllergenToDish(dish9, allergen2, allergen3)
            .assignAllergenToDish(dish10, allergen3, allergen4).assignAllergenToDish(dish11, allergen3, allergen4).assignAllergenToDish(dish12, allergen1, allergen3, allergen4);

        this[MODEL].assignDishToMenu(menu1, dish1, dish3, dish10, dish7).assignDishToMenu(menu2, dish2, dish4, dish6, dish8).assignDishToMenu(menu3, dish9, dish5, dish11, dish12);

    }

    onLoad = () => {
        if (getCookie('accetedCookieMessage') !== 'true') {
            console.log(getCookie('accetedCookieMessage') !== 'true');
            this[VIEW].showCookiesMessage();
        }
        if (getCookie('activeUser')) {
        } else {
            this[VIEW].showIdentificationLink();
            this[VIEW].bindIdentificationLink(this.handleLoginForm);
        }
        this[LOAD_RESTAURANT_OBJECT]();
        this.onAddCategory();
        this[VIEW].showAdminMenu();
        this[VIEW].bindAdminMenu(this.handleNewDishForm, this.handleRemoveDishForm, this.handleGestMenuForm, this.handleGestCategoryForm, this.handleNewRestaurantForm, this.handleDelCategoryForm);
    };

    onInit = () => {
        this[VIEW].showCategories(this[MODEL].getCategories());
        this[VIEW].showDishes(this[MODEL].getDishes());
        this[VIEW].bindProductsCategoryList(this.handledishesCategoryList);
        this[VIEW].bindRestaurantListInMenu(this.handleRestaurantList);
        this[VIEW].bindProductsAllergenListInMenu(this.handledishesAllergenList);
        this[VIEW].bindProductsMenuList(this.handledishesMenuList);
    }

    onAddCategory = () => {
        this[VIEW].showMenuAllergens(this[MODEL].getAllergens());
        this.onAddRestaurant();
        this.onAddMenu();
        this[VIEW].showMenuCategories(this[MODEL].getCategories());
        this[VIEW].bindProductsCategoryListInMenu(this.handledishesCategoryList);
        this[VIEW].bindProductsAllergenListInMenu(this.handledishesAllergenList);
        this[VIEW].bindProductsMenuList(this.handledishesMenuList);
    };

    handleInit = () => {
        this.onInit();
    }

    handledishesCategoryList = (title) => {
        const category = this[MODEL].getCategory(title)
        const dishes = this[MODEL].getDishesInCategory(category, (resource) => resource.getName() === title);
        this[VIEW].listProducts(dishes, category.getName());
        this[VIEW].bindShowProduct(this.handleShowProduct);
    };

    handledishesAllergenList = (title) => {
        const allergen = this[MODEL].getAllergen(title)
        const dishes = this[MODEL].getDishesWithAllergen(allergen, (resource) => resource.getName() === title);
        this[VIEW].listProducts(dishes, allergen.getName());
        this[VIEW].bindShowProduct(this.handleShowProduct);
    }

    handledishesMenuList = (title) => {
        const dishes = this[MODEL].getDishesInMenu(title)
        this[VIEW].listProducts(dishes, title);
        this[VIEW].bindShowProduct(this.handleShowProduct);
    };

    handleRestaurantList = (title) => {
        const restaurant = this[MODEL].getRestaurant(title)
        this[VIEW].showRestaurant(restaurant);
    };

    handleShowProduct = (dishName) => {
        try {
            const dish = this[MODEL].getDish(dishName);
            this[VIEW].showProducts(dish);
            this[VIEW].bindShowProductInNewWindow(this.handleShowProductInNewWindow);
        } catch (error) {
            this[VIEW].showProducts(null, 'No existe este producto en la página.');
        }
    };

    handleShowProductInNewWindow = (dishName) => {
        try {
            const dish = this[MODEL].getDish(dishName);
            this[VIEW].showProductInNewWindow(dish);
        } catch (error) {
            this[VIEW].showProductInNewWindow(null, 'No existe este producto en la página.');
        }
    };

    handleNewDishForm = () => {
        this[VIEW].showNewDishForm(this[MODEL].getCategories(), this[MODEL].getAllergens());
        this[VIEW].bindNewDishForm(this.handleCreateDish);
    };

    handleCreateDish = (serial, name, description, ingredients, image, price, categories, allergens) => {

        const dish = this[MODEL].createDish(serial, name, description, ingredients, image, price);
        let done; let
            error;
        try {
            this[MODEL].addDish(dish);

            for (const cat of categories) {
                let catSelected = this[MODEL].getCategory(cat);
                this[MODEL].assignCategoryToDish(dish, catSelected);
            }

            for (const allergen of allergens) {
                let allSelected = this[MODEL].getAllergen(allergen);
                this[MODEL].assignAllergenToDish(dish, allSelected);
            }
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
    };

    handleRemoveDishForm = () => {
        this[VIEW].showRemoveDishForm(this[MODEL].getDishes());
        this[VIEW].bindRemoveDishForm(this.handleRemoveDish);
    };

    handleRemoveDish = (title) => {
        let done; let error; let
            dish;
        try {
            dish = this[MODEL].getDish(title);
            this[MODEL].removeDish(dish);
            done = true;
            this.onAddCategory();
            this.handleRemoveDishForm();
        } catch (exception) {
            done = false;
            error = exception;
        }
    };

    handleGestMenuForm = () => {
        this[VIEW].showAsigDesasigForm(this[MODEL].getDishes(), this[MODEL].getMenus());
        this[VIEW].bindGestMenuForm(this.handleGestMenuAssign);
        this[VIEW].bindGestMenuForm(this.handleGestMenuDesassign);
    }

    handleGestMenuAssign = (dishes, menuTitle) => {
        let done; let error; let menu;
        try {
            menu = this[MODEL].getMenu(menuTitle);

            for (const dish of dishes) {
                let dishSelected = this[MODEL].getDish(dish);
                this[MODEL].assignDishToMenu(menu.newMenu, dishSelected);
            }
            this.onAddCategory();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
    };

    handleGestMenuDesassign = (dishes, menuTitle) => {
        let done; let error; let menu;
        try {
            menu = this[MODEL].getMenu(menuTitle);

            for (const dish of dishes) {
                let dishSelected = this[MODEL].getDish(dish);
                this[MODEL].deassignDishToMenu(menu.newMenu, dishSelected);
            }
            this.onAddCategory();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
    };

    handleGestCategoryForm = () => {
        this[VIEW].showNewCategoryForm();
        this[VIEW].bindGestCategory(this.handleGestCategory);
    };

    handleGestCategory = (name, desc, image) => {
        let done; let error; let cat;

        try {
            cat = this[MODEL].createCategory(name, desc, image);
            this[MODEL].addCategory(cat);
            this.onAddCategory();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
    };

    handleNewRestaurantForm = () => {
        this[VIEW].showNewRestaurantForm();
        this[VIEW].bindNewRestaurantForm(this.handlNewRestaurant);
    };

    handlNewRestaurant = (name, desc, coord1, coord2, image) => {
        let done; let error; let rest;

        try {
            rest = this[MODEL].createRestaurant(name, desc, coord1, coord2, image);
            this[MODEL].addRestaurant(rest);
            this.onAddCategory();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
    };

    handleDelCategoryForm = () => {
        this[VIEW].showDelCategoryForm(this[MODEL].getCategories());
        this[VIEW].bindDelCatgory(this.handlDelCategory);
    };

    handlDelCategory = (categoryName) => {
        let done; let error; let cat;

        try {
            cat = this[MODEL].getCategory(categoryName);
            this[MODEL].removeCategory(cat);
            this.onAddCategory();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
    };

    onAddMenu = () => {
        this[VIEW].showMenu(this[MODEL].getMenus());
    };

    onAddRestaurant = () => {
        this[VIEW].showMenuRestaurants(this[MODEL].getRestaurants());
    };

    // manejador que nos permite abrir el formulario de Login
    handleLoginForm = () => {
        this[VIEW].showLogin();
        //this[VIEW].bindLogin(this.handleLogin);
    };

}

export default RestaurantController;