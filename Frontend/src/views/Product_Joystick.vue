<template>
    <navbar />
    <v-main>
      <v-container>
        <div class="list-category">
          <p>Category :</p>
          <ul>
            <ul>
              <li><router-link to="/produk/mouse">Mouse</router-link></li>
              <li><router-link to="/produk/keyboard">Keyboard</router-link></li>
              <li><router-link to="/produk/headphone">Headphone</router-link></li>
              <li><router-link to="">Joystick</router-link></li>
            </ul>
          </ul>
        </div>
        <produk_joystik />
      </v-container>
      <footerSection />
    </v-main>
</template>

<script setup>
import navbar from "@/components/navbar.vue"
import footerSection from "@/components/footer.vue"
import produk_joystik from "@/components/OurJoystik.vue"

</script>
<style>
.list-category ul {
  display: flex;
  justify-content: center;
  list-style: none; /* Menghapus poin dari daftar */
  padding: 0;
}

.list-category li {
  text-align: center;
  font-size: 15px;
  margin: 0 10px; /* Jarak antara tautan */
  text-decoration: none;
  margin-top: 20px;
}

.list-category li a {
  text-decoration: none; /* Menghapus garis bawah default pada tautan */
  padding: 10px 20px; /* Atur ukuran tombol sesuai kebutuhan Anda */
  background-color: black; /* Warna latar belakang tombol */
  color: #fff; /* Warna teks tombol */
  border: none;
  border-radius: 5px; /* Mengatur sudut tombol */
  cursor: pointer; /* Mengubah ikon kursor menjadi tangan saat mengarah ke tombol */
  transition: background-color 0.3s; /* Animasi perubahan warna latar belakang */
}

.list-category li a:hover {
  background-color: gray; /* Warna latar belakang saat tombol dihover */
}

</style>
