<template>
    <v-dialog v-model="showCheckoutPopup" max-width="600">
      <v-card class="checkout-card">
        <v-card-title class="headline">Checkout</v-card-title>
  
        <v-list dense>
          <v-list-item-group v-if="selectedProduct">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ selectedProduct.namaProduk }}</v-list-item-title>
                <v-list-item-subtitle>Harga: Rp {{ selectedProduct.harga }}</v-list-item-subtitle>
                <v-list-item-subtitle>Jumlah: {{ quantityToAdd }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
  
        <v-card-actions>
          <v-btn @click="confirmCheckout" color="primary">Confirm</v-btn>
          <v-btn @click="cancelCheckout" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      showCheckoutPopup: Boolean,
      selectedProduct: Object,
      quantityToAdd: Number,
    },
    methods: {
      confirmCheckout() {
        this.$emit('confirm-checkout');
      },
      cancelCheckout() {
        this.$emit('cancel-checkout');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Center the CheckoutPopup in the middle of the screen */
  .checkout-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .headline {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  .checkout-card {
    z-index: 9999; /* or any high value */
  }
  
  /* Adjust the styles as needed */
  </style>
  