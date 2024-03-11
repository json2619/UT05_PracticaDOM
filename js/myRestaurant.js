import RestaurantApp from './RestaurantApp.js';

const historyActions = {
    init: () => {
        RestaurantApp.handleInit();
    },
    productsCategoryList: (event) => RestaurantApp.handledishesCategoryList(event.state.category),
    productsAllergenList: (event) => RestaurantApp.handledishesAllergenList(event.state.allergen),
    productsRestaurantList: (event) => RestaurantApp.handleRestaurantList(event.state.restaurant),
    productsMenuList: (event) => RestaurantApp.handledishesMenuList(event.state.menu),
    showProducts: (event) => RestaurantApp.handleShowProduct(event.state.product),
    newDish: () => RestaurantApp.handleNewDishForm(),
    removeDish: () => RestaurantApp.handleRemoveDishForm(),
    gestMenu: () => RestaurantApp.handleGestMenuForm(),
    gestcategory: () => RestaurantApp.handleGestCategoryForm(),
    newRestaurant: () => RestaurantApp.handleNewRestaurantForm(),
    delCategory: () => RestaurantApp.handleDelCategoryForm(),
    login: () => RestaurantApp.handleLoginForm(),
};

window.addEventListener('popstate', (event) => {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

history.replaceState({ action: 'init' }, null);