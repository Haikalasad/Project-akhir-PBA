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

<!-- <style>
h6 {
  color: #0B0B0B;
  font-size: 50px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  /* margin-bottom: 20px; */
  text-align: center;
  padding: 3%;
}

h3 {
  margin-left: 156px;
  font-size: 30px;
}

.h8 {
  color: #0B0B0B;
}
.image1 {
  margin-left: 900px;
  width: 550px;
  height: 550px;
  padding: 2%;
  float: right;
}
</style> -->