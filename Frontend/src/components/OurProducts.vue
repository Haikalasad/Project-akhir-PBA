<template>
  
    <v-card-text>
      <h2>Our Products</h2>
    </v-card-text>
   
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

              <v-dialog v-model="dialogConfirmation" max-width="600">
                <v-card class="confirmation-card">
                  <v-row>
                    <!-- Gambar di sebelah kiri -->
                    <v-col cols="12" md="4">
                      <v-img :src="selectedProduct.foto" aspect-ratio="2/3" class="product-image"></v-img>
                    </v-col>
                    <!-- Detail produk di sebelah kanan -->
                    <v-col cols="12" md="8">
                      <v-card-title class="product-title">{{ selectedProduct.namaProduk }}</v-card-title>
                      <v-card-text>
                        <div class="product-info">Stok: {{ selectedProduct.stok }}</div>
                        <div class="product-info">Terjual: {{ selectedProduct.terjual }}</div>
                        <div class="product-info">Harga: Rp {{ selectedProduct.harga }}</div>
                      </v-card-text>
                      <v-row>
                        <v-col>
                          <v-text-field label="Jumlah" v-model="quantityToAdd" type="number" min="1"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-btn @click="confirmAddToCart" color="primary">Confirm</v-btn>
                        <v-btn @click="cancelAddToCart" color="error">Cancel</v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>
        </v-row>
        <v-btn @click="seeMore" class="see-more-btn">
      See More
    </v-btn>
      </v-container>
 
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      products: [],
      selectedProduct: null,
      dialogConfirmation: false,
      quantityToAdd: 1// Default quantity
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
      // Mendapatkan idProduk langsung dari objek produk atau melalui properti product.idProduk
      console.log('Quantity to Add:', this.quantityToAdd);
      const idProduk = product.id;

      // Menyimpan data ke selectedProduct dan menetapkan nilai default untuk Jumlah
      this.selectedProduct = { ...product, idProduk, Jumlah: this.quantityToAdd };


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
        // Mungkin tampilkan pesan atau arahkan pengguna untuk login
        return;
      }

      // Pastikan idProduk dan Jumlah memiliki nilai sebelum mengirimkan permintaan
      if (!idProduk || !Jumlah) {
        console.error('Invalid product data');
        // Mungkin tampilkan pesan atau lakukan sesuatu yang sesuai dengan logika aplikasi Anda
        return;
      }

      // Kirim permintaan untuk menambahkan produk ke keranjang dengan user ID
      axios
        .post('http://localhost:3001/api/game/keranjang/store', {
          idUser: userID,
          idProduk,
          Jumlah: this.quantityToAdd, // Menggunakan nilai dari input quantityToAdd
        })
        .then((response) => {
          console.log('Product added to cart:', this.selectedProduct);
          this.dialogConfirmation = false;
        })
        .catch((error) => {
          console.error('Error adding product to cart:', error);

          // Handle error di sini
          // Misalnya, tampilkan pesan kesalahan ke pengguna atau tangani kesalahan lainnya
          const errorMessage = error.response?.data?.message || 'Error adding product to cart';
          console.log('Server error details:', error.response?.data);
          console.error(errorMessage);
        });
    },

    cancelAddToCart() {
      // Clear the selected product and close the dialog
      // this.selectedProduct = null;
      this.dialogConfirmation = false;
    },
    seeMore() {
      this.$router.push('/produk');
    },
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
.see-more-btn {
  width: 100%;
  padding: 16px; 
  margin-top: 16px; 
  margin-bottom: 30px;
}
</style>
