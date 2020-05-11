var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './images/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        cart: 0,
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './images/vmSocks-green-onWhite.jpg',
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './images/vmSocks-blue-onWhite.jpg',
            }
        ],
    },
    methods: {
        addToCart() {
            this.cart  += 1
        },
        updateProduct(variantImage){
             this.image = variantImage
        }
    }
});