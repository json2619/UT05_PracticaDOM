import RestaurantApp from './RestaurantApp.js';

window.addEventListener('popstate', (event) => {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

const historyActions = {
    init: () => {
        RestaurantApp.handleInit();
    },
    productsCategoryList: (event) => RestaurantApp.handledishesCategoryList(event.currentTarget.getAttribute('data-type')),
    productsAllergenList: (event) => RestaurantApp.handledishesAllergenList(event.currentTarget.getAttribute('data-allergen')),
    productsRestaurantList: (event) => RestaurantApp.handleRestaurantList(event.currentTarget.getAttribute('data-restaurant')),
    productsMenuList: (event) => RestaurantApp.handledishesMenuList(event.currentTarget.getAttribute('data-menu')),
    showProducts: (event) => RestaurantApp.handleShowProduct(event.currentTarget.getAttribute('data-serial')),
    newDish: () => RestaurantApp.handleNewDishForm(),
    removeDish: () => RestaurantApp.handleRemoveDishForm(),
};

history.replaceState({ action: 'init' }, null);