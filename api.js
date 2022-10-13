const BASE_URL = 'https://api.exchangerate.host';
const LATEST_ENDPOINT = '/latest';

const buildLatestExchangeUrl = (currency) => {
  return `${BASE_URL}${LATEST_ENDPOINT}?base=${currency}`;
};

const fetchExchangeRates = async (currency) => {
  //Precisamos contruir a URL
  const urlToFetch = buildLatestExchangeUrl(currency);

  try{
  // Fazer um fetch com a URL criada
  const response = await fetch(urlToFetch);

  // Transformar o retorno em json
  const json = await response.json();

  //retornar as taxas de conversão
  const exchangeRates = {
    rates: json.rates,
    base: json.base
  }
  return exchangeRates;
  } catch(error){
    console.log(error);
    throw error;
  }
};
