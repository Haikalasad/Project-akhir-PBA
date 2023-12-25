<template>
  <div>
    <!-- Konten aplikasi Anda di sini -->

    <v-footer class="content text-center d-flex flex-column">
      <div class="moving-text">
        Hak cipta © 2023 Situs Web Anda. Semua hak dilindungi
      </div>
      <v-divider></v-divider>
      <div>
        {{ new Date().getFullYear() }} — <strong>GameWorld</strong>
      </div>
    </v-footer>
  </div>
</template>

<style>
v-btn {
  background-color: antiquewhite;
}

.content {
  color: black;
}

.moving-text {
  animation: moveText 5s linear infinite;
}

@keyframes moveText {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
