//Capturando os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const result = document.getElementById("result");
const description = document.getElementById("description");

// Manipulando o input amount para receber apenas números
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

//Capturando o evento de submit(envio) do formulário
form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then((response) => response.json())
        .then((data) => {
          const price = data.rates.BRL;
          console.log("USD", price);
          convertCurrency(amount.value, price, "US$");
        });
      break;
    case "EUR":
      fetch("https://api.exchangerate-api.com/v4/latest/EUR")
        .then((response) => response.json())
        .then((data) => {
          const price = data.rates.BRL;
          convertCurrency(amount.value, price, "€");
        });
      break;
    case "GBP":
      fetch("https://api.exchangerate-api.com/v4/latest/GBP")
        .then((response) => response.json())
        .then((data) => {
          const price = data.rates.BRL;
          convertCurrency(amount.value, price, "£");
        });
      break;
  }
};

//Função para converter a moeda
async function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    let total = amount * price;

    if(isNaN(total)){
      throw new Error("Valor inválido");
    }

    total = formatCurrencyBRL(total).replace("R$", "");

    result.textContent = `${total} Reais`;

    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    footer.classList.remove("show-result");
  }
}

//Função para formatar o valor da moeda
const formatCurrencyBRL = (value) => {
  //Converte o valor para número e formata a moeda com o padrão brasileiro
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
