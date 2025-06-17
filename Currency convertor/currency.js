const apiUrl = "https://api.exchangerate-api.com/v4/latest/";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const lastUpdated = document.getElementById("lastUpdated");

let allCurrencies = [];

window.onload = () => {
  fetch(`${apiUrl}USD`)
    .then(res => res.json())
    .then(data => {
      allCurrencies = Object.keys(data.rates);
      allCurrencies.forEach(curr => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = curr;
        option1.text = option2.text = curr;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
      });
      fromCurrency.value = "USD";
      toCurrency.value = "INR";
    });
};

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  if (amount === "" || isNaN(amount)) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  fetch(`${apiUrl}${fromCurrency.value}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[toCurrency.value];
      const converted = (amount * rate).toFixed(2);
      result.innerText = `${amount} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
      lastUpdated.innerText = `Last Updated: ${data.date}`;
    })
    .catch(() => {
      result.innerText = "Error fetching exchange rate.";
    });
}

function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
}
