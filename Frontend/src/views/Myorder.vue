<template>
    <v-app>
      <navbar/>
      <v-main>
      <v-container>
        <listOrder/>
      </v-container>
  
       <footerSection/>
    
      </v-main>
  
  
    </v-app>
  </template>
  
  <script setup>
  import navbar from "@/components/navbar.vue"
  import listOrder from "@/components/listOrder.vue";
  import footerSection from "@/components/footer.vue";
  </script>