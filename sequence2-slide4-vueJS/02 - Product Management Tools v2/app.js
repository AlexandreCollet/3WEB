var app = new Vue({
    el: '#app',
    data: {
        title: "My Application title",
        currencies: [
            { symbol: '$', mode: 'left' },
            { symbol: '€', mode: 'right' }
        ],
        products: [
            { name: "ProductA", price: 100.5, quantity: 1, available: true },
            { name: "ProductB", price: 40, quantity: 4, available: false },
            { name: "ProductC", price: 35.5, quantity: 5, available: true },
        ],
        selectedCurrencyIndex: 0
    },
    computed: {
        selectedCurrency: function() {
            return this.currencies[this.selectedCurrencyIndex];
        },
    }
});
