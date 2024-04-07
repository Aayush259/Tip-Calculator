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