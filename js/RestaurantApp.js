import Restaurant from '../js/Restaurant.js';
import RestaurantController from '../js/RestaurantController.js';
import RestaurantView from '../js/RestaurantView.js';

const RestaurantApp = new RestaurantController(
    Restaurant.getInstance(),
    new RestaurantView()
);

export default RestaurantApp;