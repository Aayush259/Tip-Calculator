// This function displays error on screen when the user input is invalid.
const DisplayError = (element) => {

    element.parentNode.classList.add('error-border');
    element.parentNode.previousElementSibling.children[1].classList.add('error-active');

}

/*
    This function adds the active state of the element provided as an argument by adding the `active` class.
*/
const AddActiveState = (element) => {
    element.classList.add('active');
}

/*
    This function removes the active state of the element provided as an argument by removing the `active` class.
*/
const RemoveActiveState = (element) => {
    element.classList.remove('active');
}

// Delcaring the array of input elements with type text.
const ArrayOfInputElements = [InputMoney, InputCountPeople, CustomTipPercent];

// Adding event listener to each input element using foeEach loop to add the active state when they are focused in.
ArrayOfInputElements.forEach(element => {
    element.addEventListener('focus', () => {
        AddActiveState(element.parentNode);
    })
})

// Adding event listener to each input element using foeEach loop to remove the active state when they are focused out.
ArrayOfInputElements.forEach(element => {
    element.addEventListener('focusout', () => {
        RemoveActiveState(element.parentNode);
    })
})

InputMoney.addEventListener('change', () => {
    // Removing previous errors.
    InputMoney.parentNode.classList.remove('error-border');
    InputMoney.parentNode.previousElementSibling.children[1].classList.remove('error-active');

    // If bill amount is zero or invlaid then display error.
    if (isNaN(Number(InputMoney.value)) || Number(InputMoney.value) === 0) {
        DisplayError(InputMoney);
        return;
    }

})