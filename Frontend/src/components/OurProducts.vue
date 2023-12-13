<template>
  <div class="container">
    <v-card-text>
      <h2>Our Products</h2>
    </v-card-text>
    <v-app>
      <v-container>
        <v-row>
          <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="4">
            <v-card class="product-card">
              <v-img class="img" :src="product.foto" aspect-ratio="2/3"></v-img>
              <v-card-title>{{ product.namaProduk }}</v-card-title>
              <v-card-subtitle>Harga: Rp {{ product.harga }}</v-card-subtitle>
              <v-card-text>Stok: {{ product.stok }}</v-card-text>
              <v-card-text>Terjual: {{ product.terjual }}</v-card-text>
              <div class="addToCart">
                <v-btn class="cart" color="black" @click="addToCart(product)">
                  Tambah ke Keranjang
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-btn @click="seeMore">
        See More
      </v-btn>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/api/game/all');
        this.products = response.data.data.slice(0, 3); // Limit to the first 3 products
        this.displayedProducts = [...this.products]; // Copy to displayedProducts
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    addToCart(product) {
      // Your existing addToCart logic
      console.log('Product added to cart:', product);
    },
    // ... other methods
  },
};
</script>

<style>
h2 {
  font-size: 40px;
  border-bottom: 2px solid #000;
  margin-bottom: 40px;
}

.addToCart {
  display: flex;
  width: 100%;
  background-color: black;
  text-align: center;
}

.cart {
  width: 100%;
}

.cart:hover {
  width: 100%;
  color: gray;
}

.product-card {
  width: 100%;
  max-width: 300px;
  margin: 10px;
}

.img {
  width: 100%;
  max-height: 200px;
}
</style>
