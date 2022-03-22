fetch('https://v6.exchangerate-api.com/v6/b2aa2900d00de3bb4c3db731/latest/USD')
  .then(response => response.json())
  .then(data => {
    document.querySelector('#spinner').classList.add('hidden');
    Object.entries(data['conversion_rates']).forEach(function(pairs) {
      const newLi = document.createElement('li');
      const newText = document.createTextNode(`${pairs.join(': ')}`);
      newLi.appendChild(newText);
      document.querySelector('#rates').appendChild(newLi);

    });
  });
