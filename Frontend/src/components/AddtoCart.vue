<template>
     <v-dialog v-model="dialogConfirmation">
        <v-card>
          <v-img :src="selectedProduct.foto" aspect-ratio="2/3"></v-img>
          <v-card-title>{{ selectedProduct.namaProduk }}</v-card-title>
          <v-card-text>
            <div>Stok: {{ selectedProduct.stok }}</div>
            <div>Terjual: {{ selectedProduct.terjual }}</div>
            <div>Harga: Rp {{ selectedProduct.harga }}</div>
            <v-row>
              <v-col>
                <v-text-field
                  label="Jumlah"
                  v-model="quantityToAdd"
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="confirmAddToCart" color="primary">
              Confirm
            </v-btn>
            <v-btn @click="cancelAddToCart" color="error">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      selectedProduct: null,
      dialogConfirmation: false,
      quantityToAdd: 1,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/api/game/all');
        this.products = response.data.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    addToCart(product) {
  // Mendapatkan idProduk langsung dari objek produk atau melalui properti product.idProduk
  const idProduk = product.id;

  // Menyimpan data ke selectedProduct dan menetapkan nilai default untuk Jumlah
  this.selectedProduct = { ...product, idProduk, Jumlah: 1 };

  // Menampilkan dialog
  this.dialogConfirmation = true;
},

confirmAddToCart() {
  const { idProduk, Jumlah } = this.selectedProduct;

  // Dapatkan user ID dari Vuex store
  const userID = this.$store.state.userID;

  // Periksa apakah user sudah login
  if (!userID) {
    console.error('User is not logged in');
    return;
  }

 
  if (!idProduk || !Jumlah) {
    console.error('Invalid product data');
    return;
  }

  // Kirim permintaan untuk menambahkan produk ke keranjang dengan user ID
  axios
    .post('http://localhost:3001/api/game/keranjang/store', {
      idUser: userID,
      idProduk,
      Jumlah,
    })
    .then((response) => {
      console.log('Product added to cart:', this.selectedProduct);
      this.dialogConfirmation = false;
    })
    .catch((error) => {
      console.error('Error adding product to cart:', error);

      const errorMessage = error.response?.data?.message || 'Error adding product to cart';
      console.log('Server error details:', error.response?.data);
      console.error(errorMessage);
    });
},
    cancelAddToCart() {
      this.dialogConfirmation = false;
    },
    seeMore() {
    },
  },
};
</script>