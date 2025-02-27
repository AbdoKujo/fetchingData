const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    // Store exchange rates
    let rates = {};

    // Fetch currency rates
    async function fetchRates() {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        rates = data.rates;
        populateCurrencySelects();
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    }

    // Populate currency select dropdowns
    function populateCurrencySelects() {
      const currencies = Object.keys(rates);
      [fromCurrencySelect, toCurrencySelect].forEach(select => {
        currencies.forEach(currency => {
          const option = document.createElement('option');
          option.value = currency;
          option.textContent = currency;
          select.appendChild(option);
        });
      });
      // Set default selections
      fromCurrencySelect.value = 'USD';
      toCurrencySelect.value = 'EUR';
    }

    // Convert currency
    function convertCurrency() {
      const amount = parseFloat(amountInput.value);
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;

      if (isNaN(amount)) {
        resultDiv.textContent = 'Please enter a valid amount';
        return;
      }

      // Perform conversion
      const convertedAmount = amount * (rates[toCurrency] / rates[fromCurrency]);
      
      // Display result
      resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    }

    // Event listener for convert button
    convertBtn.addEventListener('click', convertCurrency);

    // Initialize the app
    fetchRates();