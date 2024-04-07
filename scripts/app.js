// Getting input elements.
const InputMoney = document.getElementById('input-money');
const InputCountPeople = document.getElementById('people-count');

// Getting reset button.
const ResetBtn = document.getElementById('reset-btn');

// Getting all radio buttons.
const RadioBtns = document.querySelectorAll('.radios > input[type="radio"]');

// Getting Custom input element for tip percent.
const CustomTipPercent = document.getElementById('custom');

/*
    This function takes the bill amount, number of people, and discount percentage and calculate the tip. It returns an object which contains the the amount to be given by each person as well as the total tip amount.
*/
const Calculate = (bill, people, percent) => {

    // Initializing Result object.
    let Result = {
        'Tip Amount By Each Person': 0.00,
        'Total Tip Amount': 0.00
    }

    // Calculating the tip amount (Total tip amount and Tip amount by each person).
    const Tip = bill * (percent/100);
    const TipByEachPerson = Tip / people;

    // Assigning the result in the Result object.
    Result['Tip Amount By Each Person'] = TipByEachPerson;
    Result['Total Tip Amount'] = Tip;

    // Returning Result.
    return Result;
}

/*
    Adding event listener to each radio buttons using forEach loop so that when any of them is clicked, then the modified value of Custom tip percent sets to `Custom`.
*/
RadioBtns.forEach(button => {
    button.addEventListener('click', () => {
        CustomTipPercent.value = `Custom`;
    })
})

/*
    Adding event listener to CustomTipPercent so that when it is clicked, the selected radio button gets unselected and the value of it becomes empty string until user does not enters his custom value.
*/
CustomTipPercent.addEventListener('click', () => {
    
    // Unchecking the checked radio button.
    RadioBtns.forEach(button => {
        if (button.checked) {
            button.checked = false;
        }
    })

    // If the value of CustomTipPercent is `Custom` then set it to an empty string.
    if (CustomTipPercent.value === `Custom`) {
        CustomTipPercent.value = ``;
    }
})

/*
    Adding event listener to CustomTipPercent so that when it looses its focus, then if the no value is entered by the user or invalid value is entered by the user, then it will set the value to `Custom`.
*/
CustomTipPercent.addEventListener('blur', () => {
    if ((CustomTipPercent.value === '') || isNaN(Number(CustomTipPercent.value))) {
        CustomTipPercent.value = `Custom`;
    }
})

/*
    Adding event listnere to InputCountPeople so that when any value is entered in it, it collects all the required input value to calculate tip and call the calculate function to calculate tip and displays the result on the screen. If user enters something wrong, it will show an error.
*/
InputCountPeople.addEventListener('input', () => {

    // Removing previous errors.
    InputCountPeople.parentNode.classList.remove('error-border');
    InputCountPeople.parentNode.previousElementSibling.children[1].classList.remove('error-active');

    // Initializing PeopleCount and BillAmount.
    const PeopleCount = Number(InputCountPeople.value);
    const BillAmount = Number(InputMoney.value);

    // If count of people is not a number or 0 then show error.
    if (isNaN(PeopleCount) || PeopleCount === 0) {
        DisplayError(InputCountPeople);
        return;
    }
    
    // Initializing Result with null and DiscountPercentage with 0.
    let Result = null;
    let DiscountPercentage = 0;

    // Getting the value of DiscountPercentage if from the checked radio button if it is present.
    RadioBtns.forEach(button => {
        if (button.checked) {
            DiscountPercentage = Number(button.value);
        }
    });

    // If there is no radio button checked, then get the value of discountPercentage from the custom input element if it is a number.
    if (DiscountPercentage === 0 && !isNaN(Number(CustomTipPercent.value))) {
        DiscountPercentage = Number(CustomTipPercent.value);
    }

    // If BillAmount or PeopleCount is NaN then do nothing, else get the result by calling the calculate function.
    if (isNaN(BillAmount) || isNaN(PeopleCount)) {
        // Do Nothing.
    } else {
        Result = Calculate(BillAmount, PeopleCount, DiscountPercentage);
    }

    // Getting elements which will display output.
    const PerPersonTip = document.getElementById('per-person-tip');
    const TotalTip = document.getElementById('total-tip');

    // Displaying output/result.
    PerPersonTip.innerHTML = `$${Result['Tip Amount By Each Person']}`;
    TotalTip.innerHTML = `$${Result['Total Tip Amount']}`;
});

/*
    Adding event listener to reset button so that when it is clicked, it resets the complete app.
*/
ResetBtn.addEventListener('click', () => {

    // Uncheking Radio buttons.
    RadioBtns.forEach(button => {
        button.checked = false;
    })

    // Setting the CustomTipPercent value to `Custom`.
    CustomTipPercent.value = `Custom`;

    // Removing the values of InputCountPeople and InputMoney.
    InputCountPeople.value = ``;
    InputMoney.value = ``;

    // Setting the the total tip to initial value.
    document.getElementById('per-person-tip').innerHTML = `$0.00`;
    document.getElementById('total-tip').innerHTML = `$0.00`;
})