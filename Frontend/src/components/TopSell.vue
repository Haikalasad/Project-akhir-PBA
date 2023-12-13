<template>
  <div class="container">
    <v-card-text>
      <h2>Top Selling</h2>
    </v-card-text>
    <v-container>
      <v-row>
        <v-col v-for="(product) in products" :key="product.id" cols="12" sm="6" md="4">
          <v-card class="product-card">
            <v-img class="img" :src="product.foto" aspect-ratio="2/3"></v-img>
            <v-card-title>{{ product.nama }}</v-card-title>
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
    this.fetchTopSellingProducts();
  },
  methods: {
    async fetchTopSellingProducts() {
      try {
        const response = await axios.get('http://localhost:3001/api/game/popular');
        this.products = response.data.data.slice(0, 3); // Limit to the first 3 products
      } catch (error) {
        console.error('Error fetching top-selling products:', error);
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
.container {
  margin-top: 35px;
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
