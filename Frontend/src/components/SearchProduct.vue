<template>
  <div class="container">
    <v-card-text>
      <h2>Our Products</h2>
    </v-card-text>
    <v-app>
      <v-container>
        <!-- Menampilkan pesan jika tidak ada produk yang ditemukan -->
        <div class="failed" v-if="filteredProducts.length === 0">
          <p>Produk tidak ditemukan.</p>
        </div>

        <v-row v-else>
          <v-col v-for="(product, index) in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
            <v-card class="product-card">
              <v-img class="img" :src="product.foto" aspect-ratio="2/3"></v-img>
              <v-card-title>{{ product.nama }}</v-card-title>
              <v-card-subtitle>Harga: Rp {{ product.harga }}</v-card-subtitle>
              <v-card-text>Stok: {{ product.stok }}</v-card-text>
              <v-card-text>Terjual: {{ product.terjual }}</v-card-text>
              <div class="addToCart">
                <v-btn class="cart" color="black" @click="addToCart">
                  Tambah ke Keranjang
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-btn>
        See More
      </v-btn>
    </v-app>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import productData from "@/data/data.js";

const props = defineProps(['searchQuery']);
const filteredProducts = ref([]);

// Pantau perubahan pada searchQuery
watch(() => props.searchQuery, (newSearchQuery) => {
  filterProducts(newSearchQuery);
});

const filterProducts = (searchQuery) => {
  // Filter produk berdasarkan pencarian
  filteredProducts.value = searchQuery
    ? productData.filter((product) => product.nama.toLowerCase().includes(searchQuery.toLowerCase()))
    : productData;
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
.cart :hover {
  width: 100%;
  color: gray;
}
.product-card {
  width: 100%;
  max-width: 300px;
  margin: 10px;
}
.failed{
  text-align: center;
  align-items: center;
  font-weight: 400;
  color: red;
}
.img {
  width: 100%;
  max-height: 200px;
}
</style>
