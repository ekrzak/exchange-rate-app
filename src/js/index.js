fetch('https://v6.exchangerate-api.com/v6/b2aa2900d00de3bb4c3db731/latest/USD')
  .then(response => response.json())
  .then(data => {
    document.querySelector('#spinner').classList.add('hidden');
    document.querySelector('#description').classList.remove('hidden');
    document.querySelector('#description-base').textContent = `${data['base_code']}`;
    document.querySelector('#description-rate-date').textContent = `${data['time_last_update_utc'].slice(0, 16)}`;
    Object.entries(data['conversion_rates']).forEach(function(pairs) {
      const newTr = document.createElement('tr');
      const currencyTd = document.createElement('td');
      const rateTd = document.createElement('td');
      currencyTd.textContent = `${pairs[0]}`;
      rateTd.textContent = `${pairs[1]}`;
      newTr.appendChild(currencyTd);
      newTr.appendChild(rateTd);
      document.querySelector('#data-table').appendChild(newTr);

    });
  });
