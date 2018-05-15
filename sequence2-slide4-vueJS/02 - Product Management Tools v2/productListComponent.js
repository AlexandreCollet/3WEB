Vue.component('product-list', {
    props: ['products', 'selectedCurrency'],
    data: function() {
        return {
            updatedProductIndex: null,
        }
    },
    methods: {
        setUpdatedProduct(productIndex) {
            this.updatedProductIndex = productIndex;
        },
        resetUpdatedProduct() {
            this.updatedProductIndex = null;
        }
    },
    template: `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Available</th>
                    <th>Quantity</th>
                    <th>Unit price</th>
                    <th>Total price</th>
                </tr>
            </thead>
            <tbody>
                <product
                    v-for="(product, index) in products"
                    :key="index"
                    :product="product"
                    :updated="index === updatedProductIndex"
                    :selected-currency="selectedCurrency"
                    @start-product-update="setUpdatedProduct(index)"
                    @stop-product-update="resetUpdatedProduct"
                />
            </tbody>
        </table>
    `,
})
