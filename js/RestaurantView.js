class RestaurantView {
    constructor() {
        this.categories = document.getElementById('categories');
        this.dishes = document.getElementById('dishes');
        this.nav = document.getElementById('principal');
        this.products = document.getElementById('products');
    }

    bindInit(handler) {
        document.getElementById('init').addEventListener('click', (event) => {
            handler();
        });
        document.getElementById('logo').addEventListener('click', (event) => {
            handler();
        })
    }

    showCategories(categories) {
        this.categories.replaceChildren();

        let imageUrls = {
            'Entrantes': 'img/categorias/entrada.jpg',
            'Sopas': 'img/categorias/sopa.jpg',
            'Ensaladas': 'img/categorias/ensalada.jpg',
        };

        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = 'category-list';
        container.classList.add('row');
        for (const [name, value] of categories) {

            let imageUrl = imageUrls[value.getName()];

            this.categories.insertAdjacentHTML('beforeend', `<div class="row">
            <div class="categories__div"><a href="#product-list" id="categories-list" data-type="${value.getName()}">
            <div class="categories__img"><img alt="${value.getName()}"
            src="${imageUrl}" />
            </div>
            <div class="categories__description">
            <h3>${value.getName()}</h3>
            <p>${value.getDescription()}</p>
            </div>
            </a>
            </div>
            `);
        }
        this.categories.append(container);
    }

    showMenuCategories(categories) {
        const li = document.createElement('li');
        li.classList.add('menu_nav');
        li.classList.add('nav-item');
        li.classList.add('dropdown');

        li.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`);

        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');

        for (const [name, value] of categories) {
            container.insertAdjacentHTML('beforeend', `<li><a data-category="${value.getName()}" class="dropdown-item" href="#productlist">${value.getName()}</a></li>`);
        }

        li.append(container);
        this.nav.append(li);
    }

    showMenuAllergens(allergens) {
        const li = document.createElement('li');
        li.classList.add('menu_nav');
        li.classList.add('nav-item');
        li.classList.add('dropdown');

        li.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#" id="navCats2" role="button" data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`);

        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');

        for (const [name, value] of allergens) {
            container.insertAdjacentHTML('beforeend', `<li><a data-allergen="${value.getName()}" class="dropdown-item" href="#productlist">${value.getName()}</a></li>`);
        }

        li.append(container);
        this.nav.append(li);
    }

    showMenuRestaurants(restaurants) {
        const li = document.createElement('li');
        li.classList.add('menu_nav');
        li.classList.add('nav-item');
        li.classList.add('dropdown');

        li.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#" id="navCats3" role="button" data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>`);

        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');

        for (const [name, value] of restaurants) {
            container.insertAdjacentHTML('beforeend', `<li><a data-restaurant="${value.getName()}" class="dropdown-item" href="#productlist">${value.getName()}</a></li>`);
        }

        li.append(container);
        this.nav.append(li);
    }

    showMenu(menus) {
        const li = document.createElement('li');
        li.classList.add('menu_nav');
        li.classList.add('nav-item');
        li.classList.add('dropdown');

        li.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#" id="navCats4" role="button" data-bs-toggle="dropdown" aria-expanded="false">Menú</a>`);

        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');

        for (const [name, value] of menus) {
            container.insertAdjacentHTML('beforeend', `<li><a data-menu="${value.newMenu.getName()}" class="dropdown-item" href="#productlist">${value.newMenu.getName()}</a></li>`);
        }

        li.append(container);
        this.nav.append(li);
    }


    showDishes(dishes) {

        this.dishes.replaceChildren();

        let arrKey = Array.from(dishes.keys());

        for (let index = 0; index < 3; index++) {

            let indiceAleatorio = Math.floor(Math.random() * arrKey.length);

            let claveAleatoria = arrKey[indiceAleatorio];

            let valorAleatorio = dishes.get(claveAleatoria);

            this.dishes.insertAdjacentHTML('beforeend', `<div class="row"
            id="type-list">
            <div class="dishes__div"><a href="#product-list" data-type="${valorAleatorio.newDish.getName()}">
            <div class="categories__img"><img alt="${valorAleatorio}"
            src="${valorAleatorio.newDish.getImage()}" />
            </div>
            <div class="dishes__description">
            <h3>${valorAleatorio.newDish.getName()}</h3>
            <p>${valorAleatorio.newDish.getDescription()}</p>
            </div>
            </a>
            </div>
            `);
        }

    }

    listProducts(dishes, title) {
        this.categories.replaceChildren();

        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = 'product-list';
        container.classList.add('container');
        container.classList.add('my-3');
        container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');
        for (const dish of dishes) {
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.insertAdjacentHTML('beforeend', `<div class="row g-4">
            <div class="col">
              <a data-serial="${dish.getName()}" href="#singleproduct" class="img-wrap">
                <div class="card h-100">
                  <img src="${dish.getImage()}" class="card-img-top img-fluid" alt="${dish.getName()}">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${dish.getName()}</h5>
                    <p class="card-text">${dish.getDescription()}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>`);
            container.children[0].append(div);
        }
        container.insertAdjacentHTML('afterbegin', `<h1>${title}</h1>`);
        this.categories.append(container);
    }

    showProducts(dish, message) {

        this.products.replaceChildren();
        if (this.products.children.length > 1)
            this.products.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('mt-5');
        container.classList.add('mb-5');
        if (dish) {
            container.id = 'single-product';
            container.insertAdjacentHTML('beforeend', `<div class="row d-flex
                        justify-content-center">
                        <div class="col-md-10">
                        <div class="card">
                        <div class="row">
                        <div class="col-md-6">
                        <div class="images p-3">
                        <div class="text-center p-4"> <img id="main-image"
                        src="${dish.getImage()}"/> </div>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="product p-4">
                        <div class="mt-4 mb-3"> <span class="text-uppercase
                        brand">${dish.getName()}</span>
                        <h5 class="text-uppercase">${dish.getName()}</h5>
                        <div class="price d-flex flex-row align-items-center">
                        <span class="actprice">${dish.getPrice()}</span>
                </div>
                </div>
                <p class="about">${dish.toString()}</p>
                <div class="sizes mt-5">
                <h6 class="text-uppercase">Características</h6>
                </div>
                <div class="cart mt-4 align-items-center"> <button dataserial="${dish.getName()}" class="btn btn-primary text-uppercase mr-2 px4">Comprar</button> </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>`);
        } else {
            container.insertAdjacentHTML(
                'beforeend',
                `<div class="row d-flex justify-content-center">
                    ${message}
                </div>`,
            );
        }
        this.products.append(container);
    }

    showRestaurant(restaurant) {
        this.dishes.replaceChildren();

        if (this.dishes.children.length > 1)
            this.dishes.children[1].remove();
        const container = document.createElement('div');
        container.id = 'product-list';
        container.classList.add('container');
        container.classList.add('my-3');
        container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.insertAdjacentHTML('beforeend', `<div class="row g-4">
            <div class="col">
              <a data-serial="${restaurant.getName()}" href="#singleproduct" class="img-wrap">
              <div class="card text-bg-dark">
              <img src="${restaurant.getImage()}" class="card-img" alt="${restaurant.getName()}">
              <div class="card-img-overlay">
                <h5 class="card-title">${restaurant.getName()}</h5>
                <p class="card-text">Description: ${restaurant.getDescription()}</p>
                <p class="card-text">Location: ${restaurant.getLocation()}</p>
              </div>
            </div>
              </a>
            </div>
          </div>`);
        container.children[0].append(div);
        this.dishes.append(container);
    }


    bindProductsCategoryList(handler) {
        const categoryList = document.getElementById('categories');
        const links = categoryList.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                handler(event.currentTarget.getAttribute('data-type'));
            });
        }
    }

    bindProductsCategoryListInMenu(handler) {
        const navCats = document.getElementById('navCats');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                handler(event.currentTarget.getAttribute('data-category'));
            });
        }
    }

    bindProductsAllergenListInMenu(handler) {
        const navCats = document.getElementById('navCats2');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                handler(event.currentTarget.getAttribute('data-allergen'));
            });
        }
    }

    bindRestaurantListInMenu(handler) {
        const navCats = document.getElementById('navCats3');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                handler(event.currentTarget.getAttribute('data-restaurant'));
            });
        }
    }

    bindProductsMenuList(handler) {
        const navCats = document.getElementById('navCats4');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                handler(event.currentTarget.getAttribute('data-menu'));
            });
        }
    }

    bindShowProduct(handler) {
        const productList = document.getElementById('product-list');
        const links = productList.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                handler(event.currentTarget.getAttribute('data-serial'));
            });
        }
    }

}
export default RestaurantView;