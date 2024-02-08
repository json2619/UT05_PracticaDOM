class RestaurantView {
    constructor() {
        this.categories = document.getElementById('categories');
        this.dishes = document.getElementById('dishes');
        this.nav = document.getElementById('principal');
    }

    showCategories(categories) {
        this.categories.replaceChildren();

        let imageUrls = {
            'Entradas': 'img/categorias/entrada.jpg',
            'Sopas': 'img/categorias/sopa.jpg',
            'Ensaladas': 'img/categorias/ensalada.jpg',
        };

        for (const [name, value] of categories) {

            let imageUrl = imageUrls[value.getName()];

            this.categories.insertAdjacentHTML('beforeend', `<div class="row"
            id="type-list">
            <div class="categories__div"><a href="#product-list" data-type="${value.getName()}">
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

    listProducts(products, title) {
        this.main.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = 'product-list';
        container.classList.add('container');
        container.classList.add('my-3');
        container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');
        for (const product of products) {
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.insertAdjacentHTML('beforeend', `<figure class="card cardproduct-grid card-lg"> <a data-serial="${product.serial}" href="#singleproduct" class="img-wrap"><img class="${product.constructor.name}-style"
        src="${product.url}"></a>
        <figcaption class="info-wrap">
        <div class="row">
        <div class="col-md-8"> <a data-serial="${product.serial}"
        href="#single-product" class="title">${product.brand} -
        ${product.model}</a> </div>
        <div class="col-md-4">
        <div class="rating text-right"> <i class="bi bi-starfill"></i> <i class="bi bi-star-fill"></i> <i class="bi bi-starfill"></i> </div>
        </div>
        </div>
        </figcaption>
        <div class="bottom-wrap">
        <a href="#" data-serial="${product.serial}" class="btn btnprimary float-end"> Comprar </a>
        <div><span class="price h5">${product.price.toLocaleString('esES', { style: 'currency', currency: 'EUR' })}</span> <br> <small
        class="text-success">Free shipping</small></div>
        </div>
        </figure>`);
            container.children[0].append(div);
        }
        container.insertAdjacentHTML('afterbegin', `<h1>${title}</h1>`);
        this.main.append(container);
    }

    bindInit(handler) {
        document.getElementById('init').addEventListener('click', (event) => {
            handler();
        });
        document.getElementById('logo').addEventListener('click', (event) => {
            handler();
        })
    }

}
export default RestaurantView;