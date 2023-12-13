<template>
  <v-app>
    <navbar/>
    <v-main>
      <v-container>
        <herosection/>
      </v-container>
      <v-container>
        <TopSell/>
      </v-container>
      <v-container>
        <produk/>
      </v-container>
      <footerSection/>
    </v-main>


  </v-app>
</template>

<script setup>
import navbar from "@/components/navbar.vue"
import herosection from "@/components/Hero-section.vue"
import footerSection from "@/components/footer.vue"
import TopSell from "@/components/TopSell.vue"
import produk from "@/components/OurProducts.vue"

</script>