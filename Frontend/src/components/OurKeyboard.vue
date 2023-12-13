<template>
  <div class="container">
    <v-card-text>
      <h2>Keyboard Products</h2>
    </v-card-text>
    <v-app>
      <v-container>
        <v-row>
          <v-col v-for="(product, index) in products" :key="product.id" cols="12" sm="6" md="4">
            <v-card class="product-card">
              <!-- Impor gambar langsung -->
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
              <!-- Tambahkan tombol Edit, Copy, Delete di sini sesuai kebutuhan Anda -->
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



<script>
import Keyboard1 from "@/assets/Keyboard1.jpg";
import Keyboard2 from "@/assets/Keyboard2.jpg";
import Keyboard3 from "@/assets/Keyboard3.jpg";


export default {
  data() {
    return {
      products: [
        {
          id: 1,
          nama: "Keyboard Gaming RGB 60%",
          harga: 300000,
          stok: 30,
          foto: Keyboard1,
          terjual: 12
        },
        {
          id: 2,
          nama: "Keyboard 75%",
          harga: 250000,
          stok: 40,
          foto: Keyboard2,
          terjual: 20
        },
        {
          id: 3,
          nama: "Keyboard Gaming ROG",
          harga: 50000,
          stok: 50,
          foto: Keyboard3,
          terjual: 50
        },
        // Anda dapat menambahkan produk lainnya di sini
      ],
    };
  },
};
</script>


<style>
h2{
  font-size: 40px;
  border-bottom: 2px solid #000;
  margin-bottom: 40px;
}
.container {
  margin-top: 35px;
}

.addToCart{
  display: flex;
  width: 100%;
  background-color: black;
  text-align: center;
}

.cart{
  width: 100%;
}
.cart :hover{
  width: 100%;
  color: gray;
}
.product-card {
  width: 100%;
  max-width: 300px; /* Sesuaikan lebar maksimum sesuai kebutuhan Anda */
  margin: 10px; /* Sesuaikan margin sesuai kebutuhan Anda */
}

.img {
  width: 100%;
  max-height: 200px; /* Sesuaikan tinggi maksimum sesuai kebutuhan Anda */
  /* Memastikan gambar mempertahankan proporsi aspek */
}

</style>