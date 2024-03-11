import Restaurant from './Restaurant.js';
import RestaurantController from './RestaurantController.js';
import RestaurantView from './RestaurantView.js';
import AuthenticationService from './authentication.js';


const RestaurantApp = new RestaurantController(
    Restaurant.getInstance(),
    new RestaurantView(),
    AuthenticationService.getInstance()
);

export default RestaurantApp;