<template>
    <v-app>
      <navbar/>
      <v-container>
        <About/>
        <TotalUsers/>
        <OurPartners/>
      </v-container>
      <v-main>
      </v-main>
        
    </v-app>
    <footerSection/>
  </template>
  <script setup>
  import navbar from "@/components/navbar.vue"
  import footerSection from "@/components/footer.vue";
  import About from "@/components/About.vue";
  import OurPartners from "@/components/OurPartners.vue";
  import TotalUsers from "@/components/TotalUsers.vue";
  </script>

