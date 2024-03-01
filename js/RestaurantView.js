import { newDishValidation, gestMenuValidation, gestCategoryValidation, newRestaurantValidation } from './validation.js';
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

        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = 'category-list';
        container.classList.add('row');
        for (const [name, value] of categories) {

            this.categories.insertAdjacentHTML('beforeend', `<div class="row">
            <div class="categories__div"><a href="#product-list" id="categories-list" data-type="${value.getName()}">
            <div class="categories__img"><img alt="${value.getName()}"
            src="${value.getImage()}" />
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
        const navCats = document.getElementById('navCats');
        let container = navCats.querySelector('.dropdown-menu');

        if (!container) {
            container = document.createElement('ul');
            container.classList.add('dropdown-menu');
            navCats.appendChild(container);
        } else {
            container.innerHTML = ''; // Vacía el contenido existente
        }

        for (const [name, value] of categories) {
            container.insertAdjacentHTML('beforeend', `<li><a data-category="${value.getName()}" class="dropdown-item" href="#productlist">${value.getName()}</a></li>`);
        }

        navCats.append(container);
    }

    showMenuAllergens(allergens) {
        const navCats = document.getElementById('navCats2');
        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');
        for (const [name, value] of allergens) {
            container.insertAdjacentHTML('beforeend', `<li><a data-allergen="${value.getName()}" class="dropdown-item" href="#productlist">${value.getName()}</a></li>`);
        }
        navCats.append(container);
    }

    showMenuRestaurants(restaurants) {
        const navCats = document.getElementById('navCats3');
        let container = navCats.querySelector('.dropdown-menu');

        if (!container) {
            container = document.createElement('ul');
            container.classList.add('dropdown-menu');
            navCats.appendChild(container);
        } else {
            container.innerHTML = ''; // Vacía el contenido existente
        }

        for (const [name, value] of restaurants) {
            container.insertAdjacentHTML('beforeend', `<li><a data-restaurant="${value.getName()}" class="dropdown-item" href="#productlist">${value.getName()}</a></li>`);
        }
        navCats.append(container);
    }

    showMenu(menus) {
        const navCats = document.getElementById('navCats4');
        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');
        for (const [name, value] of menus) {
            container.insertAdjacentHTML('beforeend', `<li><a data-menu="${value.newMenu.getName()}" class="dropdown-item" href="#productlist">${value.newMenu.getName()}</a></li>`);
        }
        navCats.append(container);
    }

    showAdminMenu() {
        let existingDropdown = document.getElementById('navServices');

        if (!existingDropdown) {
            const menuOption = document.createElement('li');
            menuOption.classList.add('menu_nav');
            menuOption.classList.add('nav-item');
            menuOption.classList.add('dropdown');
            menuOption.insertAdjacentHTML(
                'beforeend',
                `<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">Adminitración</a>`);
            const suboptions = document.createElement('ul');
            suboptions.classList.add('dropdown-menu');
            suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewdish" class= "dropdown-item" href = "#new-dish" > Crear plato</a ></li > ');
            suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldeldish" class= "dropdown-item" href = "#del-dish" > Eliminar plato</a ></li > ');
            suboptions.insertAdjacentHTML('beforeend', '<li><a id="lgestmenu" class= "dropdown-item" href = "#gest-menu" >Gestión Menú</a ></li > ');
            suboptions.insertAdjacentHTML('beforeend', '<li><a id="lgestcat" class= "dropdown-item" href = "#gest-cat" >Gestión Categorias</a ></li > ');
            suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewrest" class= "dropdown-item" href = "#new-rest" >Crear Restaurante</a ></li > ');
            menuOption.append(suboptions);
            this.nav.append(menuOption);
        }
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
        this.openedWindows = [];
    }

    showNewDishForm(categories, allergens) {
        this.categories.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'gestDish-Form';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5 text-white">Crear plato</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fNewDish';
        form.id = 'fGestMenu';
        form.setAttribute('role', 'form');
        form.classList.add('row');
        form.classList.add('g-3');
        form.setAttribute('novalidate', '');

        container.appendChild(form);

        form.insertAdjacentHTML(
            'beforeend',
            `
        <div class="col-md-6 mb-3">
        <label class="form-label text-white" for="ndSerial">Serial del plato*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-type"></i></span>
        <input type="text" class="form-control" id="ndSerial"
        name="ndSerial"
        placeholder="Serial del plato" value="" required>
        <div class="invalid-feedback">Debe contener al menos un carácter alfanumérico.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-6 mb-3">
        <label class="form-label text-white" for="ndTitle">Nombre del Plato*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-type"></i></span>
        <input type="text" class="form-control" id="ndTitle"
        name="ndTitle"
        placeholder="nombre del plato" value="" required>
        <div class="invalid-feedback">Debe contener al menos un carácter alfanumérico o espacio en blanco.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="ndDescription">Descripción del plato*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="ndDescription"
        name="ndDescription" value=""  required>
        <div class="invalid-feedback">Puede contener caracteres alfanuméricos y algunos signos de puntuación.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="ndIngredients">Ingredientes*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="ndIngredients"
        name="ndIngredients" placeholder="ingrediente1, ingrediente2" value="" required>
        <div class="invalid-feedback">Debe contener caracteres alfanuméricos, comas y algunos signos de puntuación.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-6 mb-3">
        <label class="form-label text-white" for="ndUrl">URL de la imagen *</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-fileimage"></i></span>
        <input type="url" class="form-control" id="ndUrl" name="ndUrl"
        placeholder="URL de la imagen"
        value="" required>
        <div class="invalid-feedback">La URL no es válida.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="ndPrice">Precio*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="ndPrice"
        name="ndPrice" placeholder="introduzca el precio" value="" required>
        <div class="invalid-feedback">Debe ser un número decimal positivo con hasta dos decimales.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>
        <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
        </div>
        </form>`,
        );
        this.categories.append(container);
    }

    showRemoveDishForm(dishes) {
        this.categories.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'remove-dish';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Eliminar un Pato</h1>',
        );
        const row = document.createElement('div');
        row.classList.add('row');
        for (const [key, value] of dishes) {
            row.insertAdjacentHTML('beforeend', `<div class="row g-4">
            <div class="col">
              <a data-serial="${value.newDish.getName()}" href="#singleproduct" class="img-wrap">
              <div class="card text-bg-dark">
              <img src="${value.newDish.getImage()}" class="card-img" alt="${value.newDish.getName()}">
              <div class="card-img-overlay">
                <h5 class="card-title">${value.newDish.getName()}</h5>
                <p class="card-text">Description: ${value.newDish.getDescription()}</p>
              </div>
            </div>
            <div><button class="btn btn-primary" datadish="${value.newDish.getName()}" type='button'>Eliminar</button></div>
              </a>
            </div>
          </div>`);
        }
        container.append(row);
        this.categories.append(container);
    }

    showAsigDesasigForm(dishes, menus) {
        this.categories.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'gestMenu-Form';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Gestionar platos del menú</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fGestMenu';
        form.id = 'fGestMenu';
        form.setAttribute('role', 'form');
        form.classList.add('row');
        form.classList.add('g-3');
        form.setAttribute('novalidate', '');

        container.appendChild(form);

        form.insertAdjacentHTML(
            'beforeend',
            `<div class= "col-md-3 mb-3" >
                      <label class="form-label text-white" for="npmenus">Platos *</label>
                      <div class="input-group">
                          <label class="input-group-text" for="npmenus"><i class="bi bi-card-checklist"></i></label>
                          <select class="form-select" name="npmenus" id="npmenus" required>
                          <option value="" id="menu"></option></select>
                          <div class="invalid-feedback">Se debe elegir un menu al que asignarle un plato.</div>
                          <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div> `
        );

        const npmenus = form.querySelector('#npmenus');
        for (const [key, menu] of menus) {
            npmenus.insertAdjacentHTML(
                "beforeend",
                `<option value = "${menu.newMenu.getName()}" > ${menu.newMenu.getName()}</option> `
            );
        }

        form.insertAdjacentHTML(
            "beforeend",
            `<div class= "col-md-3 mb-3" >
                          <label class="form-label text-white" for="npdishes">Platos *</label>
                          <div class="input-group">
                              <label class="input-group-text" for="npdishes"><i class="bi bi-card-checklist"></i></label>
                              <select class="form-select" name="npdishes" id="npdishes" multiple required>
                              </select>
                              <div class="invalid-feedback">Se debe elegir al menos un plato para el menú.</div>
                              <div class="valid-feedback">Correcto.</div>
                          </div>
                      </div > `
        );

        const npdishes = form.querySelector('#npdishes');
        for (const [key, dish] of dishes) {
            npdishes.insertAdjacentHTML(
                "beforeend",
                `<option value = "${dish.newDish.getName()}" > ${dish.newDish.getName()}</option>`
            );
        }

        form.insertAdjacentHTML(
            'beforeend',
            `<div class= "mb-12" >
                    <button class="btn btn-primary" type="submit">Asignar</button>
                    <button class="btn btn-primary" type="reset">Desasignar</button>
                </div > `,
        );
        this.categories.append(container);
    }

    showNewCategoryForm() {
        this.categories.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'gestDish-Form';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5 text-white">Crear Categoría</h1>',
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name = "fNewCategory" role = "form" class= "row g-3" novalidate >

        <div class="col-md-6 mb-3">
        <label class="form-label text-white" for="ncTitle">Nombre de la categoría*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-type"></i></span>
        <input type="text" class="form-control" id="ncTitle"
        name="ncTitle"
        placeholder="Nombre de la categoría" value="" required>
        <div class="invalid-feedback">Debe contener al menos un carácter alfanumérico o espacio en blanco.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="ncDescription">Descripción de la categoría*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="ncDescription"
        name="ncDescription" value=""  required>
        <div class="invalid-feedback">Puede contener caracteres alfanuméricos y algunos signos de puntuación.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-6 mb-3">
        <label class="form-label text-white" for="ncUrl">URL de la imagen de la categoría*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-fileimage"></i></span>
        <input type="url" class="form-control" id="ncUrl" name="ncUrl"
        placeholder="URL de la imagen"
        value="" required>
        <div class="invalid-feedback">La URL no es válida.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
        </div>
        </form> `,
        );
        this.categories.append(container);
    }

    showNewRestaurantForm() {
        this.categories.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'gestDish-Form';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5 text-white">Crear Categoría</h1>',
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name = "fNewRestaurant" role = "form" class= "row g-3" novalidate >

        <div class="col-md-6 mb-3">
        <label class="form-label text-white" for="nrTitle">Nombre del restaurante*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-type"></i></span>
        <input type="text" class="form-control" id="nrTitle"
        name="nrTitle"
        placeholder="Nombre del restaurante" value="" required>
        <div class="invalid-feedback">Debe contener al menos un carácter alfanumérico o espacio en blanco.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="nrDescription">Descripción del restaurante*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="nrDescription"
        name="nrDescription" value=""  required>
        <div class="invalid-feedback">Puede contener caracteres alfanuméricos y algunos signos de puntuación.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="nrCoordinate1">Coordenada X*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="nrCoordinate1"
        name="nrCoordinate1" placeholder="Ejem: 165" pattern="/{0-9}{3}/v" maxlength="3" value=""  required>
        <div class="invalid-feedback">Puede contener caracteres alfanuméricos y algunos signos de puntuación.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="nrCoordinate2">Coordenada Y*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="nrCoordinate2"
        name="nrCoordinate2" placeholder="Ejem: 190" pattern="/{0-9}{3}/v" maxlength="3" value=""  required>
        <div class="invalid-feedback">Puede contener caracteres alfanuméricos y algunos signos de puntuación.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-6 mb-3">
        <label class="form-label text-white" for="nrUrl">URL de la imagen del restaurante*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-fileimage"></i></span>
        <input type="url" class="form-control" id="nrUrl" name="nrUrl"
        placeholder="URL de la imagen"
        value="" required>
        <div class="invalid-feedback">La URL no es válida.</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
        </div>
        </form> `,
        );
        this.categories.append(container);
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
        navCats.addEventListener('click', (event) => {
            if (event.target.matches('a')) {
                event.preventDefault(); // Evita que el enlace siga su comportamiento predeterminado
                const category = event.target.getAttribute('data-category'); // Obtener el valor del atributo
                this[EXCECUTE_HANDLER](
                    handler(event.target.getAttribute('data-category')), // Pasar el valor del atributo como argumento
                    [category],
                    '#product-list',
                    { action: 'productsCategoryList', category },
                    '#category-list',
                    event,
                );
            }
        });
    }

    bindProductsAllergenListInMenu(handler) {
        const navCats = document.getElementById('navCats2');
        const links = navCats.querySelectorAll('a');
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
        const links = navCats.querySelectorAll('a');
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
        const links = navCats.querySelectorAll('a');
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

    // Bind para mostrar el producto en un div aparte
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

    // Bind para abrir el plato en una nueva ventana
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

    // Bind para cerrar las ventanas
    bindMenuEvents() {
        document.getElementById('close-all-windows').addEventListener('click', () => {
            this.closeAllWindows();
        });
    }

    // Bind para crear el menu de administración con el botón de crear y borrar
    bindAdminMenu(hNewDish, hRemoveDish, hGestMenu, hGestCat, hNewRestaurant) {
        const newCategoryLink = document.getElementById('lnewdish');
        newCategoryLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hNewDish, [], '#new-dish', {
                action:
                    'newDish'
            }, '#', event);
        });

        const delCategoryLink = document.getElementById('ldeldish');
        delCategoryLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hRemoveDish, [], '#del-dish', {
                action: 'removeDish'
            }, '#', event);
        });

        const gestMenuLink = document.getElementById('lgestmenu');
        gestMenuLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hGestMenu, [], '#gest-menu', {
                action: 'gestmenu'
            }, '#', event);
        });

        const gestCategoryLink = document.getElementById('lgestcat');
        gestCategoryLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hGestCat, [], '#gest-cat', {
                action: 'gestcategory'
            }, '#', event);
        });

        const newRestaurantLink = document.getElementById('lnewrest');
        newRestaurantLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hNewRestaurant, [], '#new-rest', {
                action:
                    'newRestaurant'
            }, '#', event);
        });

    }

    bindNewDishForm(handler) {
        newDishValidation(handler);
    }

    // Bind para eliminar un plato
    bindRemoveDishForm(handler) {
        const removeContainer = document.getElementById('remove-dish');
        const buttons = removeContainer.getElementsByTagName('button');
        for (const button of buttons) {
            button.addEventListener('click', function (event) {
                handler(event.currentTarget.getAttribute('datadish'));
            });
        }
    }

    bindGestMenuForm(handler) {
        gestMenuValidation(handler);
    }

    bindGestCategory(handler) {
        gestCategoryValidation(handler)
    }

    bindNewRestaurantForm(handler) {
        newRestaurantValidation(handler)
    }


}
export default RestaurantView;