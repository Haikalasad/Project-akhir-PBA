<template>
  <v-container>
    <h2 class="mb-4">Shopping Cart</h2>
    <v-row>
      <v-col v-for="(item, index) in cartItems" :key="index" cols="12">
        <v-card class="mb-3">
          <v-row>
            <v-col cols="2">
              <v-img :src="item.foto" class="cart-image"></v-img>
            </v-col>
            <v-col cols="6">
              <v-card-title class="text-h6">{{ item.nama }}</v-card-title>
              <v-card-subtitle>Harga: Rp {{ item.harga }}</v-card-subtitle>
              <v-card-text>Jumlah: {{ item.Jumlah }}</v-card-text>
              <v-card-text>Total: Rp {{ item.Total }}</v-card-text>
            </v-col>
            <v-col cols="4" class="text-right">
              <v-btn @click="removeItem(index)" icon>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12" class="text-right">
        <v-btn @click="checkout" color="primary">Checkout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  created() {
    const userId = this.$store.state.userID;

    this.fetchCartItems(userId);
  },
  methods: {
    async fetchCartItems(userId) {
      try {
        const response = await axios.get(`http://localhost:3001/api/game/keranjang/${userId}`);
        this.cartItems = response.data.data;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    checkout() {
      // Implement checkout logic
      console.log('Checkout clicked!');
    },
  },
};
</script>

<style scoped>
.cart-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}
</style>
