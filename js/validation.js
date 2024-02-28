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
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.ndSerial.value, this.ndTitle.value, this.ndDescription.value, this.ndIngredients.value, this.ndUrl.value, this.ndPrice.value);
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

export { newDishValidation, gestMenuValidation };