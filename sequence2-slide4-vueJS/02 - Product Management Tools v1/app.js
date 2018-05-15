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
        updatedProductIndex: null,
        selectedCurrencyIndex: 1
    },
    computed: {
        selectedCurrency: function() {
            return this.currencies[this.selectedCurrencyIndex];
        },
    },
    filters: {
        currency: function(value, currencySymbol, currencyMode) {
            if(currencyMode === 'right') {
                return value + currencySymbol;
            }
            return currencySymbol + value;
        }
    },
    methods: {
        setUpdatedProduct(productIndex) {
            this.updatedProductIndex = productIndex;
        },
        resetUpdatedProduct() {
            this.updatedProductIndex = null;
        }
    }
});
