Vue.component('product', {
    props: ['product', 'updated', 'selectedCurrency'],
    filters: {
        currency: function(value, currencySymbol, currencyMode) {
            if(currencyMode === 'right') {
                return value + currencySymbol;
            }
            return currencySymbol + value;
        }
    },
    methods: {
        emitStartProductUpdate() {
            this.$emit('start-product-update');
        },
        emitStopProductUpdate() {
            this.$emit('stop-product-update');
        }
    },
    template: `
        <tr>
            <th>
                <p v-show="!updated">{{ product.name }}</p>
                <input type="text" class="form-control" v-model="product.name" v-show="updated">
            </th>
            <th>
                <p v-show="!updated">{{ product.available }}</p>
                <input type="checkbox" v-model="product.available" v-show="updated">
            </th>
            <th>
                <p v-show="!updated">{{ product.quantity }}</p>
                <input type="number" class="form-control" v-model="product.quantity" v-show="updated" >

            </th>
            <th>
                <p v-show="!updated">{{ product.price | currency(selectedCurrency.symbol, selectedCurrency.mode) }}</p>
                <input type="number" class="form-control" v-model="product.price" v-show="updated" >
            </th>
            <th>
                <p>{{ (product.price * product.quantity) | currency(selectedCurrency.symbol, selectedCurrency.mode) }}</p>
            </th>
            <th>
                <button class="btn btn-warning" @click.prevent='emitStartProductUpdate' v-show="!updated">Update</button>
                <button class="btn btn-warning" @click.prevent='emitStopProductUpdate' v-show="updated" >OK</button>
            </th>

        </tr>
    `,
})
