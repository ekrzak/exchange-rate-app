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
  const $dataTable = document.querySelector('#data-table');
  if ($dataTable.hasChildNodes()) {
    while ($dataTable.firstChild) {
      $dataTable.removeChild($dataTable.lastChild); // resets the table for avoid duplicate data
    }
  }
  const tableDataFragment = document.createDocumentFragment();
  Object.entries(dataObject['conversion_rates']).forEach(function(pairs) {
    const newTr = document.createElement('tr');
    const currencyTd = document.createElement('td');
    const rateTd = document.createElement('td');
    currencyTd.textContent = `${pairs[0]}`;
    rateTd.textContent = `${pairs[1]}`;
    newTr.appendChild(currencyTd);
    newTr.appendChild(rateTd);
    tableDataFragment.appendChild(newTr);
  });

  $dataTable.appendChild(tableDataFragment);
  addDropdownItems(tickers);
}

function addDropdownItems(currencies) {
  const dropdownDataFragment = document.createDocumentFragment();
  for (element of currencies) {
    const newLi = document.createElement('li');
    const newAnchor = document.createElement('a');
    newAnchor.classList.add('dropdown-item');
    newAnchor.href = `#`;
    newAnchor.textContent = element;
    newLi.appendChild(newAnchor);
    dropdownDataFragment.appendChild(newLi);
  }
  
  document.querySelector('#dropdown-menu').appendChild(dropdownDataFragment);
}

function searchRatesWithOtherBase(event) {
  document.querySelector('#spinner').classList.remove('hidden');
  document.querySelector('.navbar-toggler').click();
  searchRatesInApi(event.target.innerText).then(data => printDataInDom(data));  
}

searchRatesInApi().then(data => printDataInDom(data));
document.querySelector('#dropdown-menu').onclick = searchRatesWithOtherBase;
