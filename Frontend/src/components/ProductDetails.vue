<!-- ProductDetails.vue -->

<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img :src="product.foto" class="detail-image"></v-img>
        </v-col>
        <v-col cols="12">
          <v-card-title class="text-h6">{{ product.nama }}</v-card-title>
          <v-card-subtitle>Harga: Rp {{ product.harga }}</v-card-subtitle>
          <v-card-text>Jumlah: {{ product.Jumlah }}</v-card-text>
          <v-card-text>Total: Rp {{ product.Total }}</v-card-text>
          <!-- Add other product details here -->
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12" class="text-right">
          <v-btn @click="pesan" color="primary">Pesan</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      product: Object, // Pass the product data as a prop
    },
    methods: {
      pesan() {
        // Implement logic to handle the "Pesan" button click
        console.log('Pesan button clicked!');
        // You can add additional logic here, e.g., send an order request to the server
      },
    },
  };
  </script>
  
  <style scoped>
  .detail-image {
    max-width: 300px;
    max-height: 300px;
    object-fit: cover;
  }
  </style>
  