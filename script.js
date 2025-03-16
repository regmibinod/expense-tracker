const totalBalance = document.querySelector("#total");
const incomeBalance = document.querySelector("#income");
const totalExpense = document.querySelector("#expense");
const transactionList = document.querySelector("#transaction-list");
const transactionName = document.querySelector("#text");
const transactionAmount = document.querySelector("#amount");
const submitForm = document.querySelector("form");
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactionArray =
  localStorageTransactions !== null ? localStorageTransactions : [];
// function to update Local storage

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactionArray));
}
// function to add transaction DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";
  const list = document.createElement("LI");
  list.classList.add(`${transaction.amount > 0 ? "plus" : "minus"}`);
  list.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete" data-id=${transaction.id}>Delete</button>`;

  transactionList.appendChild(list);
}

//  calculation and updates function

function updateValues() {
  const amountArray = transactionArray.map(transaction => transaction.amount);
  // total balance
  const totalAmount = amountArray.reduce(
    (accumulate, currentValue) => accumulate + currentValue,
    0
  );
  totalBalance.innerHTML = `$${totalAmount.toFixed(2)}`;

  const income = amountArray // total income
    .filter((amount) => amount > 0)
    .reduce((accumulate, currentValue) => accumulate + currentValue, 0);
  incomeBalance.innerHTML = `$ ${income.toFixed(2)}`;

  const expense = amountArray // total expense
    .filter((amount) => amount < 0)
    .reduce((accumulate, currentValue) => accumulate + currentValue, 0);
  totalExpense.innerHTML = `$ ${Math.abs(expense).toFixed(2)}`;
}

// delete transactions function
function deleteTransaction(e) {
  if (e.target.classList.contains("delete")) {
    const id = +e.target.dataset.id;
    transactionArray = transactionArray.filter((item) => item.id !== id);
    updateLocalStorage();
    init();
  }
}
// Function to generate a unique transaction ID
const generateID = () => Date.now() + Math.floor(Math.random() * 1000);

// Function to add transaction to DOM
function addNewTransaction(e) {
  e.preventDefault();
  const name = transactionName.value.trim();
  const amount = transactionAmount.value.trim();
const amountValue = Number(amount);
  if (name === "" ||  amount === "" || amountValue === 0 || isNaN(amountValue))   {
    alert("Please enter a valid name and amount");
    return;
  }

  const transaction = {
    id: generateID(),
    text: transactionName.value.trim(),
    amount: Number(transactionAmount.value),
  };
  transactionArray.push(transaction);
  init();
  updateLocalStorage();
  transactionAmount.value = "";
  transactionName.value = "";
}
// Initialize app
function init() {
  transactionList.innerHTML = "";
  transactionArray.forEach(addTransactionDOM);
  updateValues();
}

init();

// Event Listeners

transactionList.addEventListener("click", deleteTransaction);
submitForm.addEventListener("submit", addNewTransaction);
