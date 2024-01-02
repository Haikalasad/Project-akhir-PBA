<template>
  <v-app>
    <navbarAdmin/>
    <v-container>
      <v-card-text style="font-weight: bold;">
          <h2>Management product</h2>
          <v-btn style="background-color: black; color: white;" @click="openAddProductDialog">
            Tambah Produk
          </v-btn>
      </v-card-text>
      <v-spacer></v-spacer>
    </v-container>

    <v-container style="margin-top: 65px;">
      <v-row>
        <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="4">
          <v-card class="product-card">
            <v-img class="img" :src="product.foto" aspect-ratio="2/3"></v-img>
            <v-card-title>{{ product.namaProduk }}</v-card-title>
            <v-card-subtitle>Harga: Rp {{ product.harga }}</v-card-subtitle>
            <v-card-text>Stok: {{ product.stok }}</v-card-text>
            <v-card-text>Terjual: {{ product.terjual }}</v-card-text>
            <div class="addToCart">
              <v-btn class="cart" color="black" @click="openProductDetailDialog(product)">
                Lihat Detail
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Add Product Dialog -->
    <v-dialog v-model="addProductDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Tambah Produk
        </v-card-title>

        <v-card-text>
          <!-- Form untuk menambah produk -->
          <v-form ref="addProductForm" v-model="validForm">
            <v-text-field v-model="productName" label="Nama Produk" required></v-text-field>
            <v-file-input
              label="Foto Produk"
              accept="image/*"
              @change="handlePhotoUpload"
              required
            ></v-file-input>
            <v-text-field v-model="productKategori" label="Kategori" type="number" required></v-text-field>
            <v-text-field v-model="productPrice" label="Harga" type="number" required prefix="Rp."></v-text-field>
            <v-text-field v-model="productStock" label="Stok" type="number" required></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="cancelAddProduct">
            Batal
          </v-btn>
          <v-btn color="blue darken-1" @click="addProduct" :disabled="!validForm">
            Tambahkan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Product Detail Dialog -->
    <v-dialog v-model="productDetailDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Detail Produk
        </v-card-title>

        <v-card-text>
          <v-img :src="selectedProductDetail.foto" aspect-ratio="2/3"></v-img>
          <div>
            <strong>Nama Produk:</strong> {{ selectedProductDetail.namaProduk }}
          </div>
          <div>
            <strong>Harga:</strong> Rp {{ selectedProductDetail.harga }}
          </div>
          <div>
            <strong>Stok:</strong> {{ selectedProductDetail.stok }}
          </div>
          <div>
            <strong>Terjual:</strong> {{ selectedProductDetail.terjual }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red darken-1" @click="confirmDeleteProduct">
            Hapus
          </v-btn>
          <v-btn color="blue darken-1" @click="editProduct">
            Edit
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="productDetailDialog = false">
            Tutup
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Product Dialog -->
    <v-dialog v-model="editProductDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Edit Produk
        </v-card-title>

        <v-card-text>
          <!-- Form for editing product -->
          <v-form ref="editProductForm" v-model="validEditForm">
            <v-text-field v-model="editedProductName" label="Nama Produk" required></v-text-field>
            <v-file-input
              label="Edit Foto Produk"
              accept="image/*"
              @change="handlePhotoEdit"
            ></v-file-input>
            <v-text-field v-model="editedProductPrice" label="Edit Harga" type="number" required prefix="Rp."></v-text-field>
            <v-text-field v-model="editedProductStock" label="Edit Stok" type="number" required></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="cancelEditProduct">
            Batal
          </v-btn>
          <v-btn color="blue darken-1" @click="saveEditedProduct" :disabled="!validEditForm">
            Simpan Perubahan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDeleteDialog">
      <v-card>
        <v-card-title class="headline">
          Konfirmasi Hapus Produk
        </v-card-title>

        <v-card-text>
          Apakah Anda yakin ingin menghapus produk ini?
        </v-card-text>

        <v-card-actions>
          <v-btn color="red darken-1" @click="deleteProduct">
            Ya, Hapus
          </v-btn>
          <v-btn color="blue darken-1" @click="cancelDeleteProduct">
            Batal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
import axios from 'axios';
import navbarAdmin from '@/components/navbarAdmin.vue';
export default {
  data() {
    return {
      addProductDialog: false,
      productDetailDialog: false,
      editProductDialog: false,
      confirmDeleteDialog: false,
      validForm: false,
      validEditForm: false,
      productName: '',
      productPhoto: null,
      productPrice: null,
      productStock: null,
      selectedFile: null,
      selectedProductDetail: null,
      editedProductName: '',
      editedProductPrice: null,
      editedProductStock: null,
      products: [],
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
    openAddProductDialog() {
      this.addProductDialog = true;
    },
    openProductDetailDialog(product) {
      this.selectedProductDetail = product;
      this.editedProductName = product.namaProduk;
      this.editedProductPrice = product.harga;
      this.editedProductStock = product.stok;
      this.productDetailDialog = true;
    },
    cancelAddProduct() {
      this.addProductDialog = false;
      this.$refs.addProductForm.reset();
    },
    handlePhotoUpload(file) {
      this.selectedFile = file;
    },
async addProduct() {
  if (!this.productName || !this.selectedFile || this.productPrice === null || this.productStock === null || this.productKategori === null) {
    console.error('Please fill in all required fields.');
    return;
  }

  if (this.productPrice < 0 || isNaN(this.productPrice) || this.productStock < 0 || isNaN(this.productStock)) {
    console.error('Invalid input. Please enter non-negative numbers for Harga and Stok.');
    return;
  }
  if (this.productKategori <= 0 && this.productKategori >=4){
    console.error('Invalid input. Please enter idKategori 1-4');
    return;
  }

  const photoName = this.selectedFile ? (this.selectedFile.name || 'No Name') : 'No Photo';

  try {
    const response = await axios.post('http://localhost:3001/api/game/admin/add', {
      namaProduk: this.productName,
      foto: photoName,
      idKategori: this.productKategori,
      harga: this.productPrice,
      stok: this.productStock,
    });

    // Handle the response from the server if needed
    console.log('Product added successfully:', response.data);

    // Optionally, you can update your local data or perform other actions based on the response

  } catch (error) {
    // Handle the error from the server
    console.error('Error adding product:', error.message);
  }

  this.addProductDialog = false;
  this.$refs.addProductForm.reset();
},

    async deleteProduct() {
      const productId = this.selectedProductDetail.id;
      try {
        
        const response = await axios.post(`http://localhost:3001/api/game/admin/delete/${productId}`);

        // Handle the response from the server if needed
        console.log('Product deleted successfully:', response.data);

        // Optionally, you can update your local data or perform other actions based on the response

      } catch (error) {
        // Handle the error from the server
        console.error('Error deleting product:', error.message);
      }

      this.productDetailDialog = false;
      this.confirmDeleteDialog = false;
    },
    confirmDeleteProduct() {
      this.confirmDeleteDialog = true;
    },
    cancelDeleteProduct() {
      this.confirmDeleteDialog = false;
    },
    editProduct() {
      this.editProductDialog = true;
    },
    cancelEditProduct() {
      this.editProductDialog = false;
      this.$refs.editProductForm.reset();
    },
    async saveEditedProduct() {
      const productId = this.selectedProductDetail.id;

      try {
        const response = await axios.post(`http://localhost:3001/api/game/admin/edit/${productId}`, {
          namaProduk: this.editedProductName,
          harga: this.editedProductPrice,
          stok: this.editedProductStock,
          // Add other edited properties as needed
        });

        // Handle the response from the server if needed
        console.log('Product edited successfully:', response.data);

        // Optionally, you can update your local data or perform other actions based on the response

      } catch (error) {
        // Handle the error from the server
        console.error('Error editing product:', error.message);
      }

  this.editProductDialog = false;
  this.$refs.editProductForm.reset();
},
    addToCart(product) {
      console.log('Added to Cart:', product);
    },
  },
};
</script>

<style>
</style>
