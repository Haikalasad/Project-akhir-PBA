<template>
    <div>
      <navbar />
      <v-container>
        <div class="list-category">
          <p>Category :</p>
          <ul>
            <ul>
              <li><router-link to="/produk/mouse">Mouse</router-link></li>
              <li><router-link to="/produk/keyboard">Keyboard</router-link></li>
              <li><router-link to="/produk/headphone">Headphone</router-link></li>
              <li><router-link to="/produk/joystick">Joystick</router-link></li>
            </ul>
          </ul>
        </div>
      </v-container>
  
        <v-container>
          <produk :searchQuery="searchQuery" />
        </v-container>
        
      <footerSection />
    </div>
  </template>
  
  <script setup>
  import navbar from "@/components/navbar.vue";
  import footerSection from "@/components/footer.vue";
  import produk from "@/components/SearchProduct.vue";
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const searchQuery = ref('');
  
  // Pantau perubahan pada route.query.q (query pencarian)
  watch(() => route.query.q, (newQuery) => {
    searchQuery.value = newQuery || '';
  });
  </script>
  