<template>
    <v-snackbar v-model="showAlert" :color="alertColor" top right>
      <v-icon left>mdi-check-circle</v-icon>
      Pembayaran berhasil dikonfirmasi!
      <v-btn icon @click="showAlert = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showAlert: false,
        alertColor: 'success',
      };
    },
  };
  </script>
  
  <style scoped>
  .v-snack {
    transition: opacity 0.5s;
  }
  
  .v-snack-enter-active, .v-snack-leave-active {
    transition: opacity 0.5s;
  }
  </style>
  