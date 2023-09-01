const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("add");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransactionsInDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">&times;</button>
`;
  list.appendChild(item);
}
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionsInDOM);
  updateValues();
}

function updateValues() {
  const amounts = transactions.map((elem) => elem.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((elem) => elem > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = Math.abs(
    amounts.filter((elem) => elem < 0).reduce((acc, item) => acc + item, 0)
  ).toFixed(2);
  balance.innerHTML = `$${total}`;
  money_plus.innerHTML = `+$${income}`;
  money_minus.innerHTML = `-$${expense}`;
}

function addTransactions(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please, enter text filed and amount field");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionsInDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 1000000);
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransaction(id) {
  transactions = transactions.filter((elem) => elem.id !== id);
  updateLocalStorage();
  init();
}

form.addEventListener("submit", addTransactions);
init();
