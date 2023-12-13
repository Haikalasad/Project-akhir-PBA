<template>
  <div class="container">
    <v-card-text>
      <h2>Mouse Products</h2>
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
import Mouse1 from "@/assets/Mouse1.jpg";
import Mouse2 from "@/assets/Mouse2.jpg";
import Mouse3 from "@/assets/Mouse3.jpg";
import Mouse4 from "@/assets/Mouse4.jpg";
import Mouse5 from "@/assets/Mouse5.jpg";
import Mouse6 from "@/assets/Mouse6.jpg";

export default {
  data() {
    return {
      products: [
        {
          id: 1,
          nama: "Logitech G203",
          harga: 300000,
          stok: 30,
          foto: Mouse1,
          terjual: 12
        },
        {
          id: 2,
          nama: "Razor DeathHadder",
          harga: 250000,
          stok: 40,
          foto: Mouse2,
          terjual: 20
        },
        {
          id: 3,
          nama: "Gaming mouse RGB",
          harga: 50000,
          stok: 50,
          foto: Mouse3,
          terjual: 50
        },
        {
          id: 4,
          nama: "ROG Gaming Mouse",
          harga: 500000,
          stok: 20,
          foto: Mouse4,
          terjual: 30
        },
        {
          id: 5,
          nama: "ROG Gaming Mouse",
          harga: 500000,
          stok: 20,
          foto: Mouse5,
          terjual: 30
        },
        {
          id: 6,
          nama: "Razor Lancehead Tournament Edition",
          harga: 450000,
          stok: 20,
          foto: Mouse6,
          terjual: 30
        }
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