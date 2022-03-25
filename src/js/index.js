function searchRatesInApi(ticker = 'USD') {
  return fetch(`https://v6.exchangerate-api.com/v6/b2aa2900d00de3bb4c3db731/latest/${ticker}`)
    .then(response => response.json())
    .catch(e => console.error(e));
}

function printDataInDom(dataObject) {
  const tickers = Object.keys(dataObject['conversion_rates']);
  document.querySelector('#spinner').classList.add('hidden');
  document.querySelector('#description').classList.remove('hidden');
  document.querySelector('#description-base').textContent = `${dataObject['base_code']}`;
  document.querySelector('#description-rate-date').textContent = `${dataObject['time_last_update_utc'].slice(0, 16)}`;
  Object.entries(dataObject['conversion_rates']).forEach(function(pairs) {
    const newTr = document.createElement('tr');
    const currencyTd = document.createElement('td');
    const rateTd = document.createElement('td');
    currencyTd.textContent = `${pairs[0]}`;
    rateTd.textContent = `${pairs[1]}`;
    newTr.appendChild(currencyTd);
    newTr.appendChild(rateTd);
    document.querySelector('#data-table').appendChild(newTr);

  });

  addDropdownItems(tickers);
}

function addDropdownItems(currencies) {
  const dropdownData = document.createDocumentFragment();
  for (element of currencies) {
    const newLi = document.createElement('li');
    const newAnchor = document.createElement('a');
    newAnchor.classList.add('dropdown-item');
    newAnchor.href = `#`;
    newAnchor.textContent = element;
    newLi.appendChild(newAnchor);
    dropdownData.appendChild(newLi);
  }
  
  document.querySelector('#dropdown-menu').appendChild(dropdownData);
}

searchRatesInApi().then(data => printDataInDom(data));
