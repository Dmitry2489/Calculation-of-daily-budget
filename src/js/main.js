// Elements
let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


    // expensesItemAll = document.querySelectorAll('.expenses-item'),
    expensesItem = document.getElementsByClassName('expenses-item'),
    btnAll = document.querySelectorAll('button'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtN = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.getElementById('savings'),
    sumValue = document.getElementById('sum'),
    percentValue = document.getElementById('percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;
let sumExpensesValue = 0;

expensesBtn.setAttribute('disabled', 'disabled');
optionalExpensesBtN.setAttribute('disabled', 'disabled');
countBtn.setAttribute('disabled', 'disabled');
expensesBtn.setAttribute('title', ' Нажмити кнопку "Начать расчет"');
optionalExpensesBtN.setAttribute('title', ' Не нажали кнопку "Начать расчет"');
countBtn.setAttribute('title', ' Не нажали кнопку "Начать расчет"');
// btnAll.forEach(element => {

// });
btnAll.forEach(function (item, i, arr) {
    console.log(i + ": " + item + " (массив:" + arr + ")");
});

for (let i = 0; i < btnAll.length - 1; i++) {
    btnAll[i].setAttribute('disabled', 'disabled');
    btnAll[i].style.display = 'none';
}


startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");
    while (time == '') {
        time = prompt("Введите дату в формате ГОД-МЕСЯЦ-ДЕНЬ", "");
    }

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет?", "");
    }
    appData.budget = money;
    console.log(appData);
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();

    for (let i = 0; i < btnAll.length - 1; i++) {
        btnAll[i].removeAttribute('disabled', 'disabled');
        btnAll[i].style.display = 'block';
    }

});
expensesBtn.addEventListener('click', function () {
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        if (
            typeof b === "string" &&
            typeof a != null &&
            typeof b != null &&
            a != "" &&
            b != "" &&
            a.length < 50
        ) {
            console.log("Все верно");
            appData.expenses[a] = b;
            sumExpensesValue += +b;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sumExpensesValue;
});
optionalExpensesBtN.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - sumExpensesValue) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 15) {
            levelValue.textContent = "Минимальный уровень достатака!";
        } else if (appData.moneyPerDay > 20) {
            levelValue.textContent = "Средний уровень достатака!";
        } else if (appData.moneyPerDay > 40) {
            levelValue.textContent = "Выской уровень достатка!";
        } else {
            levelValue.textContent = "Мне вас жаль хоть я и машина!";
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }

});
chooseIncome.addEventListener('input', function () {
    let items = chooseIncome.value;
    appData.income = items.split(",");
    incomeValue.textContent = appData.income;
});
checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.mountIncome = (sum / 100 / 12) * percent;
        appData.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = appData.mountIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }

});
percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.mountIncome = (sum / 100 / 12) * percent;
        appData.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = appData.mountIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }

});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key);
}