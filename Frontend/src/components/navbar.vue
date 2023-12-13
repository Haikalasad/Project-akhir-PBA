<template>
  <v-app-bar flat>
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>GameWorld</v-app-bar-title>
    <v-spacer></v-spacer>

    <div class="title d-flex justify-center">
      <router-link to="/home" class="title" active-class="active-link">Home</router-link>
      <router-link to="/cart" class="title" active-class="active-link">Cart</router-link>
      <router-link to="/about" class="title" active-class="active-link">About</router-link>
    </div>

    <v-spacer></v-spacer>

    <v-text-field
      v-model="searchQuery"
      v-slot:prepend
      prepend-inner-icon="mdi-magnify"
      label="Search products"
      variant="solo"
      single-line
      hide-details
      flat
      @input="searchProducts"
    ></v-text-field>
  </v-app-bar>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const searchProducts = () => {
  // Redirect ke halaman pencarian dengan parameter query
  router.push({ path: '/search', query: { q: searchQuery.value } });
};


</script>


<style>
.title:hover {
  color: gray;
}
.title{
  padding: 20px;
  text-decoration: none;
  color: black;
}
.active-link {
  font-weight: bold;
  text-decoration: none;
  color: Black; /* Ubah warna sesuai preferensi Anda */
  padding: auto;

}
</style>
