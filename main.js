Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,

        }
    },
    template:`
    <div class="product">
        <div class="product-image">
        <img :src="image" alt = "">
        </div>
        <div class="product-info">
        <h1> {{product}} </h1> 
        <p v-if="inStock"> In Stock </p> 
        <p v-else>Out of Stock </p>
        <p>Shipping: {{ Shipping }}</p>
        <ul>
            <li v-for="detail in details"> {{detail}} </li>
        </ul>
        <div v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{backgroundColor: variant.variantColor}"
        @mouseover="updateProduct(index)" >
        </div>

        <button @click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}" >
        Add to Cart </button>

      

        </div>
        </div>
        `,
    data() {
        return {
            product: 'Socks',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './images/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './images/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        Shipping() {
            if(this.premium){
                return "Free"
            }
            return 2.99
        }
    }

})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
});