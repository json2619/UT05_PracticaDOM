function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    const messageDiv = (valid) ?
        input.parentElement.querySelector('div.valid-feedback') :
        input.parentElement.querySelector('div.invalid-feedback');
    for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
    }
    messageDiv.classList.remove('d-none');
    messageDiv.classList.add('d-block');
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    if (message) {
        messageDiv.innerHTML = message;
    }
}
function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack(this, false);
    } else {
        showFeedBack(this, true);
    }
}

function newDishValidation(handler) {
    const form = document.forms.fNewDish;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.ndDescription.value = this.ndDescription.value.trim();
        showFeedBack(this.ndDescription, true);
        if (!this.ndUrl.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndUrl, false);
            firstInvalidElement = this.ndUrl;
        } else {
            showFeedBack(this.ndUrl, true);
        }
        if (!this.ndTitle.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndTitle, false);
            firstInvalidElement = this.ndTitle;
        } else {
            showFeedBack(this.ndTitle, true);
        }
        if (!this.ndSerial.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndSerial, false);
            firstInvalidElement = this.ndSerial;
        } else {
            showFeedBack(this.ndSerial, true);
        }
        if (this.ndIngredients == "") {
            isValid = false;
            showFeedBack(this.ndIngredients, false);
            firstInvalidElement = this.ndIngredients;
        } else {
            showFeedBack(this.ndIngredients, true);
        }
        if (!this.ndPrice.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndPrice, false);
            firstInvalidElement = this.ndPrice;
        } else {
            showFeedBack(this.ndPrice, true);
        }
        if (!this.ndCat.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndCat, false);
            firstInvalidElement = this.ndCat;
        } else {
            showFeedBack(this.ndCat, true);
        }
        if (!this.ndAllergens.checkValidity()) {
            isValid = false;
            showFeedBack(this.ndAllergens, false);
            firstInvalidElement = this.ndAllergens;
        } else {
            showFeedBack(this.ndAllergens, true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            const categories = [...this.ndCat.selectedOptions].map(
                (option) => option.value
            );
            const allergens = [...this.ndAllergens.selectedOptions].map(
                (option) => option.value
            );

            handler(this.ndSerial.value, this.ndTitle.value, this.ndDescription.value, this.ndIngredients.value, this.ndUrl.value, this.ndPrice.value, categories, allergens);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.ndTitle.focus();
    }));
    form.ndTitle.addEventListener('change', defaultCheckElement);
    form.ndUrl.addEventListener('change', defaultCheckElement);
}

function gestMenuValidation(handler) {
    const form = document.forms.fGestMenu;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        if (!this.npmenus.checkValidity()) {
            isValid = false;
            showFeedBack(this.npmenus, false);
            firstInvalidElement = this.npmenus;
        } else {
            showFeedBack(this.npmenus, true);
        }
        if (!this.npdishes.checkValidity()) {
            isValid = false;
            showFeedBack(this.npdishes, false);
            firstInvalidElement = this.npdishes;
        } else {
            showFeedBack(this.npdishes, true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            const dishes = [...this.npdishes.selectedOptions].map(
                (option) => option.value
            );
            handler(
                dishes, this.npmenus.value
            );
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        if (!this.npmenus.checkValidity()) {
            isValid = false;
            showFeedBack(this.npmenus, false);
            firstInvalidElement = this.npmenus;
        } else {
            showFeedBack(this.npmenus, true);
        }

        if (!this.npdishes.checkValidity()) {
            isValid = false;
            showFeedBack(this.npdishes, false);
            firstInvalidElement = this.npdishes;
        } else {
            showFeedBack(this.npdishes, true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            const dishes = [...this.npdishes.selectedOptions].map(
                (option) => option.value
            );
            handler(
                dishes, this.npmenus.value
            );
        }
        event.preventDefault();
        event.stopPropagation();;
    }));
    form.npmenus.addEventListener('change', defaultCheckElement);
    form.npdishes.addEventListener('change', defaultCheckElement);
}

function gestCategoryValidation(handler) {
    const form = document.forms.fNewCategory;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.ncDescription.value = this.ncDescription.value.trim();
        showFeedBack(this.ncDescription, true);
        if (!this.ncUrl.checkValidity()) {
            isValid = false;
            showFeedBack(this.ncUrl, false);
            firstInvalidElement = this.ncUrl;
        } else {
            showFeedBack(this.ncUrl, true);
        }
        if (!this.ncTitle.checkValidity()) {
            isValid = false;
            showFeedBack(this.ncTitle, false);
            firstInvalidElement = this.ncTitle;
        } else {
            showFeedBack(this.ncTitle, true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ncTitle.value, this.ncDescription.value, this.ncUrl.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.ncTitle.focus();
    }));
    form.ncTitle.addEventListener('change', defaultCheckElement);
    form.ncDescription.addEventListener('change', defaultCheckElement);
    form.ncUrl.addEventListener('change', defaultCheckElement);
}

function newRestaurantValidation(handler) {
    const form = document.forms.fNewRestaurant;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        this.nrDescription.value = this.nrDescription.value.trim();
        showFeedBack(this.nrDescription, true);
        if (!this.nrUrl.checkValidity()) {
            isValid = false;
            showFeedBack(this.nrUrl, false);
            firstInvalidElement = this.nrUrl;
        } else {
            showFeedBack(this.nrUrl, true);
        }
        if (!this.nrTitle.checkValidity()) {
            isValid = false;
            showFeedBack(this.nrTitle, false);
            firstInvalidElement = this.nrTitle;
        } else {
            showFeedBack(this.nrTitle, true);
        }
        if (!this.nrCoordinate1.checkValidity()) {
            isValid = false;
            showFeedBack(this.nrCoordinate1, false);
            firstInvalidElement = this.nrCoordinate1;
        } else {
            showFeedBack(this.nrCoordinate1, true);
        }
        if (!this.nrCoordinate2.checkValidity()) {
            isValid = false;
            showFeedBack(this.nrCoordinate2, false);
            firstInvalidElement = this.nrCoordinate2;
        } else {
            showFeedBack(this.nrCoordinate2, true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.nrTitle.value, this.nrDescription.value, this.nrCoordinate1.value, this.nrCoordinate2.value, this.nrUrl.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.nrTitle.focus();
    }));
    form.nrTitle.addEventListener('change', defaultCheckElement);
    form.nrDescription.addEventListener('change', defaultCheckElement);
    form.nrCoordinate1.addEventListener('change', defaultCheckElement);
    form.nrCoordinate2.addEventListener('change', defaultCheckElement);
    form.nrUrl.addEventListener('change', defaultCheckElement);
}

function DelCategoryValidation(handler) {
    const form = document.forms.fDelCat;
    form.setAttribute('novalidate', true);
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        if (!this.delCat.checkValidity()) {
            isValid = false;
            showFeedBack(this.delCat, false);
            firstInvalidElement = this.delCat;
        } else {
            showFeedBack(this.delCat, true);
        }
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.delCat.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });
    form.addEventListener('reset', (function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.nrTitle.focus();
    }));
    form.delCat.addEventListener('change', defaultCheckElement);
}

export { newDishValidation, gestMenuValidation, gestCategoryValidation, newRestaurantValidation, DelCategoryValidation };