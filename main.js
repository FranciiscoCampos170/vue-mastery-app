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
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>Name: {{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>Review: {{ review.name }}</p>
                    
                </li>
            </ul>
        </div>
      <product-review @review-submitted="addReview"> </product-review>

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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview){
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
        
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">
                    {{ error }}
                </li>
            </ul>
        </p>
        <p>
            <label>Name</label>
            <input id="name" v-model="name">
        </p>
        <p>
            <label>Review</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label>Rating</label>
            <select v-model.number="rating">
                <option value="1">1</option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
                <option value="4"> 4 </option>
                <option value="5"> 5 </option>
            </select>
        </p>
        <p>
            <button type="submit">Submit</button>
        </p>
    </form>
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if (this.name && this.rating && this.review)
            {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                }
                this.$emit('review-submitted', productReview)
                this.name= null,
                this.review= null,
                this.rating= null
            }else{
                if(!this.name) this.errors.push("Name required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.review) this.errors.push("Review required.")
            }
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