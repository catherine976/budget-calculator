//adding an event listener to the button for the form

const totalBtn = document.getElementById("total-btn");

totalBtn.addEventListener("click", calculateTotal);

//function triggered by the form button

function calculateTotal() {
  //getting all the values from the form
  var income = Number(document.getElementById("income").value);
  var rent = Number(document.getElementById("rent").value);
  var groceries = Number(document.getElementById("groceries").value);
  var councilTax = Number(document.getElementById("council-tax").value);
  var utilities = Number(document.getElementById("utilities").value);
  var online = Number(document.getElementById("online-subs").value);
  var restaurants = Number(document.getElementById("restaurants").value);
  var leisure = Number(document.getElementById("leisure").value);
  var car = Number(document.getElementById("car").value);
  var savings = Number(document.getElementById("savings").value);
  var investments = Number(document.getElementById("investments").value);

  //calculating the totals for essentials, discretionary, savings and all the expenses combined
  var totalEssentialSpend = rent + groceries + councilTax + utilities;
  var totalDiscretionarySpend = online + restaurants + leisure + car;
  var totalSavingsSpend = savings + investments;
  var entireSpend =
    totalSavingsSpend + totalEssentialSpend + totalDiscretionarySpend;

  //calculating the percentages for savings and essentials
  var savingsPercentage = (totalSavingsSpend / income) * 100;
  savingsPercentage = Math.round(savingsPercentage * 100) / 100;
  var essentialsPercentage = (totalEssentialSpend / income) * 100;
  essentialsPercentage = Math.round(essentialsPercentage * 100) / 100;

  //adding the heading text for budgeting advice section and expenses breakdown section to the page
  const h4 = document.querySelector("#tips-heading");
  h4.textContent = "Budgeting Advice";

  const totalHeading = document.querySelector("#total-heading");
  totalHeading.textContent = "Expenses Breakdown";

  //adding the text for the totals to the page
  document.getElementById(
    "essentials-total"
  ).textContent = `Essentials total: £${totalEssentialSpend}`;
  document.getElementById(
    "discretionary-total"
  ).textContent = `Discretionary total: £${totalDiscretionarySpend}`;
  document.getElementById(
    "savings-total"
  ).textContent = `Savings and investments total: £${totalSavingsSpend}`;
  document.getElementById(
    "entire-total"
  ).textContent = `Entire expenses total: £${entireSpend}`;

  //adding the pie chart to the page
  var data = [
    {
      values: [totalSavingsSpend, totalEssentialSpend, totalDiscretionarySpend],
      labels: ["Savings and Investments", "Essentials", "Discretionary"],
      type: "pie"
    }
  ];

  var layout = {
    height: 400,
    width: 500
  };

  Plotly.newPlot("pieChart", data, layout);

  //defining the CSS styles that are applied to the budgeting advice boxes

  const greenStyles = `
    margin: 7px 0;
    padding: 5px;
    border: 2px solid black;
    background-color: green;
    color: white;
    font-size: 14px;
`;

  const redStyles = `
    margin: 7px 0;
    padding: 5px;
    border: 2px solid black;
    background-color: red;
    color: white;
    font-size: 14px;
`;

  //if statements for the income box in the budgeting advice section
  if (income > entireSpend) {
    const incomeTip = document.getElementById("income-tip");
    incomeTip.innerText = `Your income is £${income} and your total expenses are £${entireSpend}. Your income is greater than your expenses. You could increase the amount you put into your savings and investments each month.`;

    const incomeBox = document.querySelector("#income-box");

    incomeBox.style.cssText = greenStyles;
  } else if (income < entireSpend) {
    const incomeTip = document.getElementById("income-tip");
    incomeTip.innerText = `Your income is £${income} and your total expenses are £${entireSpend}. Your expenses are greater than your income and you need to decrease your spending.`;
    const incomeBox = document.querySelector("#income-box");

    incomeBox.style.cssText = redStyles;
  } else {
    const incomeTip = document.getElementById("income-tip");
    incomeTip.innerText = `Your income is £${income} and your total expenses are £${entireSpend}. You have a balanced budget - well done!`;
    const incomeBox = document.querySelector("#income-box");
    incomeBox.style.cssText = greenStyles;
  }

  //if statements for the essentials box in the budgeting advice section
  if (essentialsPercentage > 50) {
    const essentialsTip = document.getElementById("essentials-tips");
    essentialsTip.innerText = `You should aim to spend 50% or less of your income on essentials.Your essential expenses total is £${totalEssentialSpend} and is ${essentialsPercentage}% of your income. You need to decrease your spending on essentials.`;
    const essentialsBox = document.querySelector("#essentials-box");

    essentialsBox.style.cssText = redStyles;
  } else if (essentialsPercentage < 50) {
    const essentialsTip = document.getElementById("essentials-tips");
    essentialsTip.innerText = `You should aim to spend 50% or less of your income on essentials. Your essential expenses total is £${totalEssentialSpend} and is ${essentialsPercentage}% of your income. Well done - you are spending less than 50% of your income on essential expenses.`;
    const essentialsBox = document.querySelector("#essentials-box");

    essentialsBox.style.cssText = greenStyles;
  } else {
    const essentialsTip = document.getElementById("essentials-tips");
    essentialsTip.innerText = `You should aim to spend 50% or less of your income on essentials. Your essential expenses total is £${totalEssentialSpend} and is ${essentialsPercentage}% of your income.  Well done - you are spending exactly 50% of your income on essential expenses.`;
    const essentialsBox = document.querySelector("#essentials-box");

    essentialsBox.style.cssText = greenStyles;
  }

  //if statements for the savings box in the budgeting advice section
  if (savingsPercentage > 20) {
    const savingsTip = document.getElementById("savings-tips");
    savingsTip.innerText = `You should be saving and investing 20% or more of your income. Your savings and investments payments total is £${totalSavingsSpend} and is ${savingsPercentage}% of your income.  Well done - you are saving and investing 20% or more of your income.`;
    const savingsBox = document.querySelector("#savings-box");

    savingsBox.style.cssText = greenStyles;
  } else if (savingsPercentage < 20) {
    const savingsTip = document.getElementById("savings-tips");
    savingsTip.innerText = `You should be saving and investing 20% or more of your income. Your savings and investments payments total is £${totalSavingsSpend} and is ${savingsPercentage}% of your income. You should be saving more of your income each month.`;
    const savingsBox = document.querySelector("#savings-box");

    savingsBox.style.cssText = redStyles;
  } else {
    const savingsTip = document.getElementById("savings-tips");
    savingsTip.innerText = `You should be saving and investing 20% or more of your income. Your savings and investments payments total is £${totalSavingsSpend} and is ${savingsPercentage}% of your income. Well done - you are saving 20% of your income.`;
    const savingsBox = document.querySelector("#savings-box");

    savingsBox.style.cssText = greenStyles;
  }
}
