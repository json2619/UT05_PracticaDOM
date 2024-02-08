import Restaurant from './Restaurant.js';
import RestaurantController from './RestaurantController.js';
import RestaurantView from './RestaurantView.js';

const RestaurantApp = new RestaurantController(
    Restaurant.getInstance(),
    new RestaurantView()
);

export default RestaurantApp;