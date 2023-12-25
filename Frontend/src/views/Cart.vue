<template>
  <v-container>
    <h2 class="mb-4">Shopping Cart</h2>
    <v-row>
      <v-col v-for="(item, index) in cartItems" :key="index" cols="12">
        <v-card class="mb-3">
          <v-row>
            <v-col cols="1">
              <v-checkbox v-model="item.selected" @change="updateTotalPrice" class="checkbox"></v-checkbox>
            </v-col>
            <v-col cols="1">
              <v-img :src="item.foto" class="cart-image"></v-img>
            </v-col>
            <v-col cols="5">
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
  <v-col cols="12" class="d-inline-flex align-center">
    <v-checkbox v-model="selectAll" @change="selectAllItems" class="checkbox" label="Pilih semua"></v-checkbox>
  </v-col>
</v-row>




    <v-row class="mt-2">
      <v-col cols="6">
        <v-card-text>Total Harga: Rp {{ selectedTotalPrice }}</v-card-text>
      </v-col>
         <v-col cols="6" class="text-right">
        <v-btn @click="showProductDetails" color="primary">Checkout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import ProductDetails from '@/components/ProductDetails.vue';
export default {
  data() {
    return {
      cartItems: [],
      selectAll: false,
      selectedTotalPrice: 0,
    };
  },
  watch: {
    selectAll(value) {
      this.cartItems.forEach(item => {
        item.selected = value;
      });
      this.updateTotalPrice();
    },
    'cartItems': {
      handler: 'updateTotalPrice',
      deep: true,
    },
  },
  created() {
    const userId = this.$store.state.userID;
    this.fetchCartItems(userId);
  },
  methods: {
    async fetchCartItems(userId) {
      try {
        const response = await axios.get(`http://localhost:3001/api/game/keranjang/${userId}`);
        this.cartItems = response.data.data.map(item => ({ ...item, selected: false }));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.updateTotalPrice();
    },
    updateTotalPrice() {
      this.selectedTotalPrice = this.cartItems.reduce((total, item) => {
        return item.selected ? total + item.Total : total;
      }, 0);
    },
    checkout() {
      // Implement checkout logic
      console.log('Checkout clicked!');
      console.log('Total Harga:', this.selectedTotalPrice);
    },
    selectAllItems() {
      this.cartItems.forEach(item => {
        item.selected = this.selectAll;
      });
      this.updateTotalPrice();
      
    },
    showProductDetails() {
      if (this.selectedTotalPrice > 0 && this.cartItems.some(item => item.selected)) {
        // Find the first selected product (assuming only one product can be selected)
        const selectedProduct = this.cartItems.find(item => item.selected);

        // Set the selected product and navigate to the ProductDetails component
        this.selectedProduct = selectedProduct;
        this.$router.push({ name: 'product-details', params: { product: selectedProduct } });
      } else {
        // Handle the case when no product is selected or the total price is zero
        console.warn('No product selected or total price is zero.');
      }
    },
  },
  components: {
    ProductDetails,
  },
};
  

</script>
<style scoped>
.cart-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}

.text-right {
  margin-top: 20px;
}

.checkbox {
  margin-top: 10px;
}
</style>
