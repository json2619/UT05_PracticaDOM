import { newDishValidation, gestMenuValidation, gestCategoryValidation, newRestaurantValidation, DelCategoryValidation } from './validation.js';
import { setCookie } from './util.js';


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
            navCats.append(container);
        } else {
            container.innerHTML = ''; // Vacía el contenido existente
        }

        for (const [name, value] of categories) {
            container.insertAdjacentHTML('beforeend', `<li><a data-category="${value.getName()}" class="dropdown-item" href="#produc-tlist">${value.getName()}</a></li>`);
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
        const menuOption = document.createElement('li');
        menuOption.classList.add('menu_nav');
        menuOption.classList.add('nav-item');
        menuOption.classList.add('dropdown');
        menuOption.insertAdjacentHTML(
            'beforeend',
            `<a class="nav-link dropdown-toggle" href="#" id="adminMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Adminitración</a>`);
        const suboptions = document.createElement('ul');
        suboptions.classList.add('dropdown-menu');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewdish" class= "dropdown-item" href = "#new-dish" > Crear plato</a ></li > ');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldeldish" class= "dropdown-item" href = "#del-dish" > Eliminar plato</a ></li > ');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="lgestmenu" class= "dropdown-item" href = "#gest-menu" >Gestión Menú</a ></li > ');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="lgestcat" class= "dropdown-item" href = "#gest-cat" >Gestión Categorias</a ></li > ');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="lnewrest" class= "dropdown-item" href = "#new-rest" >Crear Restaurante</a ></li > ');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="ldelcat" class= "dropdown-item" href = "#del-cat" >Eliminar Categoría</a ></li > ');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="GenBack" class= "dropdown-item" href = "#gen-back" >Generar Backup</a ></li > ');
        menuOption.append(suboptions);
        this.nav.append(menuOption);
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
        this.products.replaceChildren();

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
                <button id="b-open" data-serial="${dish.getName()}" 
                class="btn btnprimary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
                <button button id="dish-fav" data-dish="${dish.getName()}" 
                class="btn btnprimary text-uppercase mr-2 px-4 text-white red">⭐️</button>
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
        form.id = 'fNewDish';
        form.setAttribute('role', 'form');
        form.classList.add('row');
        form.classList.add('g-3');
        form.setAttribute('novalidate', '');

        container.appendChild(form);

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-6 mb-3">
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
        </div>`);

        form.insertAdjacentHTML(
            'beforeend',
            `<div class= "col-md-3 mb-3" >
                      <label class="form-label text-white" for="ndCat">Categorias *</label>
                      <div class="input-group">
                          <label class="input-group-text" for="ndCat"><i class="bi bi-card-checklist"></i></label>
                          <select class="form-select" name="ndCat" id="ndCat" multiple required>
                          <option value="" id="menu"></option></select>
                          <div class="invalid-feedback">Se debe elegir al menos una categoría.</div>
                          <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div> `
        );

        const ndCat = form.querySelector('#ndCat');
        for (const [key, cat] of categories) {
            ndCat.insertAdjacentHTML(
                "beforeend",
                `<option value = "${cat.getName()}" > ${cat.getName()}</option>`
            );
        }

        form.insertAdjacentHTML(
            "beforeend",
            `<div class= "col-md-3 mb-3" >
                          <label class="form-label text-white" for="ndAllergens">Alérgenos *</label>
                          <div class="input-group">
                              <label class="input-group-text" for="ndAllergens"><i class="bi bi-card-checklist"></i></label>
                              <select class="form-select" name="ndAllergens" id="ndAllergens" multiple required>
                              <option value="" id="menu"></option></select>
                              <div class="invalid-feedback">Se debe elegir al menos una categoría.</div>
                              <div class="valid-feedback">Correcto.</div>
                          </div>
                      </div > `
        );

        const ndAllergens = form.querySelector('#ndAllergens');
        for (const [key, allergen] of allergens) {
            ndAllergens.insertAdjacentHTML(
                "beforeend",
                `<option value = "${allergen.getName()}" > ${allergen.getName()}</option>`
            );
        }


        form.insertAdjacentHTML(
            'beforeend',
            `<div class="mb-12">
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
                      <label class="form-label text-white" for="npmenus">Menús *</label>
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
                <select class="form-select" name="npdishes" id="npdishes" required>
                <option value="" id="menu"></option></select>
                <div class="invalid-feedback">Se debe elegir un menu al que asignarle un plato.</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>`
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
        container.id = 'newCat-Form';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5 text-white">Crear Categoría</h1>'
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name="fNewCategory" role ="form" class="row g-3" novalidate >

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
        container.id = 'newRestaurant-Form';
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
        <label class="form-label text-white" for="nrCoordinate1">Longitud*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="nrCoordinate1"
        name="nrCoordinate1" placeholder="Ejem: 165" maxlength="3" value="" min="-180" max="180" required>
        <div class="invalid-feedback">Es obligatorio elegir una longitud entre (-180 y 180).</div>
        <div class="valid-feedback">Correcto.</div>
        </div>
        </div>

        <div class="col-md-12 mb-3">
        <label class="form-label text-white" for="nrCoordinate2">Latitud*</label>
        <div class="input-group">
        <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
        <input type="text" class="form-control" id="nrCoordinate2"
        name="nrCoordinate2" placeholder="Ejem: 80" maxlength="3" value="" min="-90" max="90" required>
        <div class="invalid-feedback">Es obligatorio elegir una latitud entre (-90 y 90).</div>
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

    showDelCategoryForm(categories) {
        this.categories.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'delCat-Form';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Borrar Categorias</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fDelCat';
        form.id = 'fDelCat';
        form.setAttribute('role', 'form');
        form.classList.add('row');
        form.classList.add('g-3');
        form.setAttribute('novalidate', '');

        container.appendChild(form);

        form.insertAdjacentHTML(
            'beforeend',
            `<div class= "col-md-3 mb-3" >
                      <label class="form-label text-white" for="delCat">Menús *</label>
                      <div class="input-group">
                          <label class="input-group-text" for="delCat"><i class="bi bi-card-checklist"></i></label>
                          <select class="form-select" name="delCat" id="delCat" required>
                          <option value="" id="menu"></option></select>
                          <div class="invalid-feedback">Se debe elegir un menu al que asignarle un plato.</div>
                          <div class="valid-feedback">Correcto.</div>
                      </div>
                  </div> `
        );

        const delCat = form.querySelector('#delCat');
        for (const [key, cat] of categories) {
            delCat.insertAdjacentHTML(
                "beforeend",
                `<option value = "${cat.getName()}" > ${cat.getName()}</option> `
            );
        }

        form.insertAdjacentHTML(
            'beforeend',
            `<div class= "mb-12" >
                    <button class="btn btn-primary" type="submit">Eliminar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div > `,
        );
        this.categories.append(container);
    }

    // Mensaje de que estamos usando una cookie
    showCookiesMessage() {
        const toast = `<div class="fixed-top p-5 mt-5">
        <div id="cookies-message" class="toast fade show bg-dark text-white
        w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
        <h4 class="me-auto">Aviso de uso de cookies</h4>
        <button type="button" class="btn-close" data-bs-dismiss="toast"
        aria-label="Close" id="btnDismissCookie"></button>
        </div>
        <div class="toast-body p-4 d-flex flex-column">
        <p>
        Este sitio web almacenda datos en cookies para activar su
        funcionalidad, entre las que se encuentra
        datos analíticos y personalización. Para poder utilizar este
        sitio, estás automáticamente aceptando
        que
        utilizamos cookies.
        </p>
        <div class="ml-auto">
        <button type="button" class="btn btn-outline-light mr-3 deny"
        id="btnDenyCookie" data-bs-dismiss="toast">
        Denegar
        </button>
        <button type="button" class="btn btn-primary"
        id="btnAcceptCookie" data-bs-dismiss="toast">
        Aceptar
        </button>
        </div>
        </div>
        </div>
        </div>`;
        document.body.insertAdjacentHTML('afterbegin', toast);

        const cookiesMessage = document.getElementById('cookies-message');
        cookiesMessage.addEventListener('hidden.bs.toast', (event) => {
            event.currentTarget.parentElement.remove();
        });

        const btnAcceptCookie = document.getElementById('btnAcceptCookie');
        btnAcceptCookie.addEventListener('click', (event) => {
            setCookie('accetedCookieMessage', 'true', 1);
        });

        const denyCookieFunction = (event) => {
            this.dishes.replaceChildren();
            this.dishes.insertAdjacentHTML('afterbegin', `<div class="container my3"><div class="alert alert-warning" role="alert">
            <strong>Para utilizar esta web es necesario aceptar el uso de
            cookies. Debe recargar la página y aceptar las condicones para seguir
            navegando. Gracias.</strong>
            </div></div>`);
        };
        const btnDenyCookie = document.getElementById('btnDenyCookie');
        btnDenyCookie.addEventListener('click', denyCookieFunction);
        const btnDismissCookie = document.getElementById('btnDismissCookie');
        btnDismissCookie.addEventListener('click', denyCookieFunction);
    }

    // Método que nos enseña el botón para identificarnos
    showIdentificationLink() {
        const userArea = document.getElementById('userArea');
        userArea.replaceChildren();
        userArea.insertAdjacentHTML('afterbegin', `<div class="account d-flex
        mx-2 flex-column" style="text-align: right; height: 40px">
        <a id="login" href="#"><i class="bi bi-person-circle" ariahidden="true"></i> Identificate</a>
        </div>`);
    }

    // Método que muestra el formulario de Login
    showLogin() {
        this.categories.replaceChildren();
        const login = `<div class="container h-100">
        <div class="d-flex justify-content-center h-100">
        <div class="user_card">
        <div class="d-flex justify-content-center form_container">
        <form name="fLogin" role="form" novalidate>
        <div class="input-group mb-3">
        <div class="input-group-append">
        <span class="input-group-text"><i class="bi bi-personcircle"></i></span>
        </div>
        <input type="text" name="username" class="form-control
        input_user" value="" placeholder="usuario">
        </div>
        <div class="input-group mb-2">
        <div class="input-group-append">
        <span class="input-group-text"><i class="bi bi-keyfill"></i></span>
        </div>
        <input type="password" name="password" class="form-control
        input_pass" value="" placeholder="contraseña">
        </div>
        <div class="form-group">
        <div class="custom-control custom-checkbox">
        <input name="remember" type="checkbox" class="customcontrol-input" id="customControlInline">
        <label class="custom-control-label"
for="customControlInline">Recuerdame</label>
</div>
</div>
<div class="d-flex justify-content-center mt-3
login_container">
<button class="btn login_btn"
type="submit">Acceder</button>
</div>
</form>
</div>
</div>
</div>
</div>`;
        this.categories.insertAdjacentHTML('afterbegin', login);
    }

    // Nos muestra un mensaje de que el usuario no es correcto
    showInvalidUserMessage() {
        this.main.insertAdjacentHTML('beforeend', `<div class="container my3"><div class="alert alert-warning" role="alert">
        <strong>El usuario y la contraseña no son válidos. Inténtelo
        nuevamente.</strong>
        </div></div>`);
        document.forms.fLogin.reset();
        document.forms.fLogin.username.focus();
    }

    showInvalidUserMessage() {
        this.main.insertAdjacentHTML('beforeend', `<div class="container my3"><div class="alert alert-warning" role="alert">
        <strong>El usuario y la contraseña no son válidos. Inténtelo
        nuevamente.</strong>
        </div></div>`);
        document.forms.fLogin.reset();
        document.forms.fLogin.username.focus();
    }

    showAuthUserProfile(user) {
        const userArea = document.getElementById('userArea');
        userArea.replaceChildren();
        userArea.insertAdjacentHTML('afterbegin', `<div class="account d-flex
        mx-2 flex-column" style="text-align: right; color: white">
        ${user.username} <a id="aCloseSession" href="#">Cerrar sesión</a>
        </div>`);
    }

    removeAdminMenu() {
        const adminMenu = document.getElementById('adminMenu');
        if (adminMenu) adminMenu.parentElement.remove();
    }

    removeDishFavMenu() {
        const favMenu = document.getElementById('favoritos');
        if (favMenu) favMenu.remove();
    }



    // Métodos bind


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

    bindProductsCategoryList(handler) {
        const categoryList = document.getElementById('categories');
        const links = categoryList.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const category = event.currentTarget.getAttribute('data-type');
                this[EXCECUTE_HANDLER](
                    handler,
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
        const links = navCats.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const category = event.currentTarget.getAttribute('data-category');
                this[EXCECUTE_HANDLER](
                    handler,
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
        const links = navCats.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const allergen = event.currentTarget.getAttribute('data-allergen');
                this[EXCECUTE_HANDLER](
                    handler,
                    [allergen],
                    '#product-list',
                    { action: 'productsAllergenList', allergen },
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
                const restaurant = event.currentTarget.getAttribute('data-restaurant');
                this[EXCECUTE_HANDLER](
                    handler,
                    [restaurant],
                    '#product-list',
                    { action: 'productsRestaurantList', restaurant },
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
                const menu = event.currentTarget.getAttribute('data-menu');
                this[EXCECUTE_HANDLER](
                    handler,
                    [menu],
                    '#product-list',
                    { action: 'productsMenuList', menu },
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
                const product = event.currentTarget.getAttribute('data-serial');
                this[EXCECUTE_HANDLER](
                    handler,
                    [product],
                    '#product-list',
                    { action: 'showProducts', product },
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
    bindAdminMenu(hNewDish, hRemoveDish, hGestMenu, hGestCat, hNewRestaurant, hdelCategory, hgenerateBackup) {
        const newDishLink = document.getElementById('lnewdish');
        newDishLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hNewDish, [], '#new-dish', {
                action:
                    'newDish'
            }, '#', event);
        });

        const delDishLink = document.getElementById('ldeldish');
        delDishLink.addEventListener('click', (event) => {
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

        const delCategoryLink = document.getElementById('ldelcat');
        delCategoryLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hdelCategory, [], '#del-cat', {
                action:
                    'delCategory'
            }, '#', event);
        });

        const generateBackupLink = document.getElementById("GenBack");
        generateBackupLink.addEventListener("click", (event) => {
            this[EXCECUTE_HANDLER](
                hgenerateBackup,
                [],
                "#generate-backup",
                { action: "generateBackup" },
                "#",
                event
            );
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

    bindGestMenuForm(handler1, handler2) {
        gestMenuValidation(handler1, handler2);
    }

    bindGestCategory(handler) {
        gestCategoryValidation(handler)
    }

    bindNewRestaurantForm(handler) {
        newRestaurantValidation(handler)
    }

    bindDelCatgory(handler) {
        DelCategoryValidation(handler);
    }

    // Bind que dota de funcionalidad al showIdentificationLink
    bindIdentificationLink(handler) {
        const login = document.getElementById('login');
        login.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](handler, [], 'main', { action: 'login' }, '#',
                event);
        });
    }

    //Dota de funcionalidad al formulario
    bindLogin(handler) {
        const form = document.forms.fLogin;
        form.addEventListener('submit', (event) => {
            handler(form.username.value, form.password.value, form.remember.checked);
            event.preventDefault();
        });
    }

    bindCloseSession(handler) {
        document.getElementById('aCloseSession').addEventListener('click',
            (event) => {
                handler();
                event.preventDefault();
            });
    }


    initHistory() {
        history.replaceState({ action: 'init' }, null);
    }

    setUserCookie(user) {
        setCookie('activeUser', user.username, 1);
    }

    deleteUserCookie() {
        setCookie('activeUser', '', 0);
    }

    bindAddDishToFav(handler) {
        // Recogemos el boton
        const btnAddFav = document.getElementById("dish-fav");
        // Capturamos el evento click
        btnAddFav.addEventListener("click", (event) => {
            // Recogemos el nombre del plato
            const { dish } = event.currentTarget.dataset;
            // Le pasamos al handler el plato
            handler(dish);
        });
    }

    // Metodo con el que mostraremos nuestro menu de administracion
    showDishFavMenu() {
        const itemMenu = document.createElement("li");

        itemMenu.id = "favoritos";
        // Le añadimos las clases pertinentes
        itemMenu.classList.add("nav-item", "dropdown", "nav_li", "menu_nav");
        // Creamos el elemento html que insertaremos en nuestro menu
        itemMenu.insertAdjacentHTML(
            "beforeend",
            `
            <a class="nav-link text-white" 
                href="#" id="dishFavs" role="button" aria-expanded="false">Platos favoritos</a>
                `
        );

        // Añadimos el elemento a nuestra lista
        this.nav.append(itemMenu);
    }
    // Creamos el bind con el que le añadiremos funcionlidad cunado se pulse el enlace de platos favoritos
    bindDishFav(handler) {
        // Recogemos el enlace que tendremos que pulsar para que se muestren
        const btn = document.getElementById("dishFavs");
        // Capturamos el evento click del boton
        btn.addEventListener("click", (event) => {
            this[EXCECUTE_HANDLER](
                handler,
                [],
                "#dish-list",
                { action: "dishFav" },
                "#",
                event
            );
        });
    }

}
export default RestaurantView;