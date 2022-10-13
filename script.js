const CACHE_KEY = 'CURRENCY_LIST';
const clearList = () => {
  const currencyList = document.getElementById('currency-list');
  currencyList.innerHTML = '';
}

const renderBaseCurrencyTitle = (base) => {
  const baseTitle = document.getElementById('title-base');
  baseTitle.innerHTML = `Valores referentes a: 1 ${base}`
}

const renderRateItemList = (currency, value) => {
  //recuperar a lista
  const currencyList = document.getElementById('currency-list');
  const fixedCurrency = value.toFixed(2);
  //criar uma li
  const li = document.createElement('li');

  //popular a li com as informacoes
  li.innerHTML = `<strong>${currency}:</strong> ${fixedCurrency}`

  //inserir a li na ul
  currencyList.appendChild(li);
}

const renderRates = (rates) => {
  const ratesEntries = Object.entries(rates);

  ratesEntries.forEach(([currency, value]) => {
    renderRateItemList(currency, value);
  })
}

const clearCurrencyInput = () => {
  const currencyInputElement = document.getElementById('currency-input');
  currencyInputElement.value = '';
}

const handleSearchEvent = async () => {
  const currencyElement = document.getElementById('currency-input');
  const currencyValue = currencyElement.value;

  if (currencyValue === '') {
    alert('Preencha o campo de pesquisa');

    return clearList();;
  }

  const object = await fetchExchangeRates(currencyValue);
  localStorage.setItem(CACHE_KEY, JSON.stringify(object));

  clearList();
  renderRates(object.rates);
  renderBaseCurrencyTitle(object.base);

  clearCurrencyInput();
}
const setupHtmlElements = () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', handleSearchEvent);
};

window.onload = () => {
  setupHtmlElements();

  const object = JSON.parse(localStorage.getItem(CACHE_KEY));
  if(object) {
    const { base , rates} = object;
    renderRates(rates);
    renderBaseCurrencyTitle(base);
  }
};