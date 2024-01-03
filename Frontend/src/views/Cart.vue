<template>
  <v-app>
    <navbar/>
    <v-container style="margin-top: 65px;">
  
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
                <v-card-title class="text-h6">{{ item.namaProduk }}</v-card-title>
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
          <v-btn @click="checkout" color="primary">Checkout</v-btn>
        </v-col>
      </v-row>
  
      <v-dialog v-model="checkoutDialog" width="900">
    <v-card class="checkout-card">
      <v-card-title class="headline">Checkout</v-card-title>
  
      <!-- Display selected products or message -->
      <v-row v-if="selectedProducts.length > 0">
        <v-col v-for="(product, index) in selectedProducts" :key="index" cols="12" sm="6" md="4">
          <v-card class="product-card">
            <v-img :src="product.foto" class="product-image"></v-img>
            <v-card-title class="text-h6">{{ product.namaProduk }}</v-card-title>
            <v-card-subtitle>Harga: Rp {{ product.Total }}</v-card-subtitle>
            <v-card-subtitle>Jumlah: {{ product.Jumlah }}</v-card-subtitle>
            <v-card-actions>
              <v-btn @click="removeProduct(index)" icon>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Display a message if no products are selected -->
      <v-row v-else>
        <v-col cols="12">
          <v-card class="empty">
            <v-card-subtitle>Silahkan pilih produk yang ingin di checkout</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Display total price dynamically -->
      <v-row v-if="selectedProducts.length > 0" align="center">
        <v-col cols="12" class="text-center">
          <v-card-text>Total Harga: Rp {{ calculateTotalPrice() }}</v-card-text>
        </v-col>
      </v-row>
  
      <!-- Display actions if there are selected products -->
      <v-row v-if="selectedProducts.length > 0" align="center">
        <v-col cols="12">
          <v-btn @click="confirmCheckout" color="primary">Confirm</v-btn>
          <v-btn @click="cancelCheckout" color="error">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
  
  
  
  
  
    </v-container>
  </v-app>
</template>
<script setup>
import navbar from '@/components/navbar.vue';
</script>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
      selectAll: false,
      selectedTotalPrice: 0,
      checkoutDialog: false,
      selectedProducts: [],
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
    removeProduct(index) {
      this.selectedProducts.splice(index, 1);
  
      this.updateTotalPrice();
    },
    updateTotalPrice() {
      this.selectedTotalPrice = this.cartItems.reduce((total, item) => {
        return item.selected ? total + item.Total : total;
      }, 0);
    },
    calculateTotalPrice() {
    return this.selectedProducts.reduce((total, product) => {
      return total + product.Total;
    }, 0);
  },
    checkout() {
 
      this.checkoutDialog = true;

      this.selectedProducts = this.cartItems.filter(item => item.selected);
    },


    async confirmCheckout() {
  try {
    const userId = this.$store.state.userID;
    const selectedProductIds = this.selectedProducts.map(product => product.id);

  
    const response = await axios.post('http://localhost:3001/api/game/order', {
      idUser: userId,
      idCart: selectedProductIds,
      totalHarga: this.selectedTotalPrice,
      status: 'Pending',
    });

    const orderId = response.data.orderId;


    console.log(`Order placed successfully with ID: ${orderId}`);


    this.removeSelectedProductsFromCartLocally();
    this.checkoutDialog = false;
  } catch (error) {
    console.error('Error placing order:', error);
  }
},
removeSelectedProductsFromCartLocally() {
  this.cartItems = this.cartItems.filter(item => !item.selected);
  this.selectedProducts = [];
  this.updateTotalPrice();
},

  },
};
</script>

<style scoped>
.cart-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.text-right {
  margin-top: 20px;
}

.checkbox {
  margin-top: 10px;
}

.checkout-card {
  text-align: center;
  justify-content: center;

  display: flex;
}

.product-card {
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;

  width: 90%;
  justify-content: center;
}

.product-image {
  max-height: 180px;
  object-fit: cover;
}

.headline {
  border-bottom: 2px solid black;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
  padding: 20px;

  font-family: sans-serif;
}


.empty{
  width: 800px;
  text-align: center;
}
</style>
