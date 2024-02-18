const EXCECUTE_HANDLER = Symbol('excecuteHandler');

class RestaurantView {
    constructor() {
        this.categories = document.getElementById('categories');
        this.dishes = document.getElementById('dishes');
        this.nav = document.getElementById('principal');
        this.products = document.getElementById('products');
        this.productWindow = null;
        this.openedWindows = [];
    }

    [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        const scroll = document.querySelector(scrollElement);
        if (scroll) scroll.scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    bindInit(handler) {
        document.getElementById('init').addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#',
                event);
        });
        document.getElementById('logo').addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#',
                event);
        });
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
                <div class="cart mt-4 align-items-center"> <button dataserial="${dish.getName()}" class="btn btn-primary text-uppercase mr-2 px4">Comprar</button> 
                <button id="b-open" data-serial="${dish.getName()}" class="btn btnprimary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
                </div>
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

    showProductInNewWindow(dish, message) {
        const main = this.productWindow.document.querySelector('main');
        const header = this.productWindow.document.querySelector('header nav');
        main.replaceChildren();
        header.replaceChildren();
        let container;
        if (dish) {
            this.productWindow.document.title = `${dish.getSerial()} -
        ${dish.getName()}`;
            header.insertAdjacentHTML('beforeend', `<h1 dataserial="${dish.getSerial()}" class="display-5">${dish.getSerial()} -
        ${dish.getName()}</h1>`);
            container = document.createElement('div');
            container.id = 'single-product';
            container.classList.add('container');
            container.classList.add('mt-5');
            container.classList.add('mb-5');
            container.insertAdjacentHTML('beforeend', `<div class="row d-flex
        justify-content-center">
        <div class="col-md-10">
        <div class="card">
        <div class="row">
        <div class="col-md-12">
        <div class="images p-3">
        <div class="text-center p-4"> <img id="main-image"
        src="${dish.getImage()}"/> </div>
        </div>
        </div>
        <div class="col-md-12">
        <div class="product p-4">
        <div class="mt-4 mb-3">
        <h5 class="text-uppercase">${dish.getName()}</h5>
        <div class="price d-flex flex-row align-itemscenter">
        <span class="actprice">${dish.getPrice()}</span>
        </div>
        </div>
        <p class="about">${dish.getDescription()}</p>
<div class="sizes mt-5">
<h6 class="text-uppercase">Características</h6>
</div>
<div class="cart mt-4 align-items-center"> <button
data-serial="${dish.getName()}" class="btn btn-primary text-uppercase mr2 px-4">Comprar</button> </div>
</div>
</div>
</div>
</div>
</div>
</div>`);
            container.insertAdjacentHTML('beforeend', '<button class="btn btnprimary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>');
            main.append(container);
        } else {
            container = document.createElement('div');
            container.classList.add('container');
            container.classList.add('mt-5');
            container.classList.add('mb-5');
            container.insertAdjacentHTML('beforeend', `<div class="row d-flex
justify-content-center">${message}</div>`);
        }
        main.append(container);
        this.productWindow.document.body.scrollIntoView();
    }

    closeAllWindows() {
        this.openedWindows.forEach(window => {
            window.close();
        });
        this.openedWindows = []; // Limpiar el array de ventanas abiertas
    }

    bindProductsCategoryList(handler) {
        const categoryList = document.getElementById('categories');
        const links = categoryList.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.getAttribute('data-type');
                this[EXCECUTE_HANDLER](
                    handler(event.currentTarget.getAttribute('data-type')),
                    [category],
                    '#product-list',
                    { action: 'productsCategoryList', category },
                    '#category-list',
                    event,
                );
            });
        }
    }

    bindProductsCategoryListInMenu(handler) {
        const navCats = document.getElementById('navCats');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.getAttribute('data-category');
                this[EXCECUTE_HANDLER](
                    handler(event.currentTarget.getAttribute('data-category')),
                    [category],
                    '#product-list',
                    { action: 'productsCategoryList', category },
                    '#category-list',
                    event,
                );
            });
        }
    }

    bindProductsAllergenListInMenu(handler) {
        const navCats = document.getElementById('navCats2');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.getAttribute('data-allergen');
                this[EXCECUTE_HANDLER](
                    handler(event.currentTarget.getAttribute('data-allergen')),
                    [category],
                    '#product-list',
                    { action: 'productsAllergenList', category },
                    '#category-list',
                    event,
                );
            });
        }
    }

    bindRestaurantListInMenu(handler) {
        const navCats = document.getElementById('navCats3');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.getAttribute('data-restaurant');
                this[EXCECUTE_HANDLER](
                    handler(event.currentTarget.getAttribute('data-restaurant')),
                    [category],
                    '#product-list',
                    { action: 'productsRestaurantList', category },
                    '#category-list',
                    event,
                );
            });
        }
    }

    bindProductsMenuList(handler) {
        const navCats = document.getElementById('navCats4');
        const links = navCats.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.getAttribute('data-menu');
                this[EXCECUTE_HANDLER](
                    handler(event.currentTarget.getAttribute('data-menu')),
                    [category],
                    '#product-list',
                    { action: 'productsMenuList', category },
                    '#category-list',
                    event,
                );
            });
        }
    }

    bindShowProduct(handler) {
        const productList = document.getElementById('product-list');
        const links = productList.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.getAttribute('data-serial');
                this[EXCECUTE_HANDLER](
                    handler(event.currentTarget.getAttribute('data-serial')),
                    [category],
                    '#product-list',
                    { action: 'showProducts', category },
                    '#category-list',
                    event,
                );
            });
        }
    }

    bindShowProductInNewWindow(handler) {
        const bOpen = document.getElementById('b-open');
        bOpen.addEventListener('click', (event) => {
            if (!this.productWindow || this.productWindow.closed) {
                this.productWindow = window.open('Dishes.html', 'ProductWindow',
                    'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar = no, location = no');
                this.openedWindows.push(this.productWindow);
                this.productWindow.addEventListener('DOMContentLoaded', () => {
                    handler(event.target.getAttribute('data-serial'));
                });
            } else {
                handler(event.target.getAttribute('data-serial'));
                this.productWindow.focus();
            }
        });
    }

    bindMenuEvents() {
        document.getElementById('close-all-windows').addEventListener('click', () => {
            this.closeAllWindows();
        });
    }

}
export default RestaurantView;