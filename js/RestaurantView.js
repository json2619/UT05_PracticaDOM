class RestaurantView {
    constructor() {
        this.categories = document.getElementById('categories');
        this.dishes = document.getElementById('dishes');
        this.nav = document.getElementById('principal');
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
            'Entradas': 'img/categorias/entrada.jpg',
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
        li.classList.add('nav-item');
        li.classList.add('dropdown');
        li.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle"
        href="#" id="navCats" role="button"
        data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`);
        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');
        for (const [name, value] of categories) {
            container.insertAdjacentHTML('beforeend', `<li><a datacategory="${value.getName()}" class="dropdown-item" href="#productlist">${value.getName()}</a></li>`);
        }
        li.append(container);
        this.nav.append(li);
    }


    showDishes(dishes) {

        this.dishes.replaceChildren();

        let imageUrls = {
            'Entrante1': 'img/platos/entrante1.jpg',
            'Entrante2': 'img/platos/entrante2.jpg',
            'Entrante3': 'img/platos/entrante3.jpg',
            'Entrante4': 'img/platos/entrante4.jpg',
            'Sopa1': 'img/platos/sopa1.jpg',
            'Sopa2': 'img/platos/sopa2.jpg',
            'Sopa3': 'img/platos/sopa3.jpg',
            'Sopa4': 'img/platos/sopa4.jpg',
            'Ensalada1': 'img/platos/ensalada1.jpg',
            'Ensalada2': 'img/platos/ensalada2.jpg',
            'Ensalada3': 'img/platos/ensalada3.jpg',
            'Ensalada4': 'img/platos/ensalada4.jpg',
        };

        let arrKey = Array.from(dishes.keys());

        for (let index = 0; index < 3; index++) {

            let indiceAleatorio = Math.floor(Math.random() * arrKey.length);

            let claveAleatoria = arrKey[indiceAleatorio];

            let valorAleatorio = dishes.get(claveAleatoria);

            let imageUrl = imageUrls[claveAleatoria];

            this.dishes.insertAdjacentHTML('beforeend', `<div class="row"
            id="type-list">
            <div class="dishes__div"><a href="#product-list" data-type="${valorAleatorio.newDish.getName()}">
            <div class="categories__img"><img alt="${valorAleatorio}"
            src="${imageUrl}" />
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

        let imageUrls = {
            'Entrante1': 'img/platos/entrante1.jpg',
            'Entrante2': 'img/platos/entrante2.jpg',
            'Entrante3': 'img/platos/entrante3.jpg',
            'Entrante4': 'img/platos/entrante4.jpg',
            'Sopa1': 'img/platos/sopa1.jpg',
            'Sopa2': 'img/platos/sopa2.jpg',
            'Sopa3': 'img/platos/sopa3.jpg',
            'Sopa4': 'img/platos/sopa4.jpg',
            'Ensalada1': 'img/platos/ensalada1.jpg',
            'Ensalada2': 'img/platos/ensalada2.jpg',
            'Ensalada3': 'img/platos/ensalada3.jpg',
            'Ensalada4': 'img/platos/ensalada4.jpg',
        };

        this.categories.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = 'product-list';
        container.classList.add('container');
        container.classList.add('my-3');
        container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');
        for (const dish of dishes) {

            let imgUrl = imageUrls[dish.getName()];

            this.categories.insertAdjacentHTML('beforeend', `<div class="row">
            <div class="categories__div"><a href="#product-list" data-type="${dish.getName()}">
            <div class="categories__img"><img alt="${dish.getName()}"
            src="${imgUrl}" />
            </div>
            <div class="categories__description">
            <h3>${dish.getName()}</h3>
            <p>${dish.getDescription()}</p>
            </div>
            </a>
            </div>
            `);
        }

        container.insertAdjacentHTML('afterbegin', `<h1>${title}</h1>`);
        this.categories.append(container);
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
                handler(event.currentTarget.getAttribute('datacategory'));
            });
        }
    }
}
export default RestaurantView;