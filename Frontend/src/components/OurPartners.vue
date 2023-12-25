<template>
    <div class="our-partners">
      <h3>Our Partners:</h3>
      <div class="partners-list">
        <img src="../assets/logitech.png" alt="Logitech Logo" class="partner-logo">
        <img src="../assets/hyperx.png" alt="Hyper X Logo" class="partner-logo">
        <img src="../assets/asus.jpg" alt="Asus Logo" class="partner-logo">
        <img src="../assets/rexus.png" alt="Rexus Logo" class="partner-logo">
        <img src="../assets/steelseries.png" alt="Steelseries Logo" class="partner-logo">
        <img src="../assets/tuf.png" alt="Tuf Logo" class="partner-logo">
        <img src="../assets/rog.png" alt="ROG Logo" class="partner-logo">
        <img src="../assets/fantech.jpg" alt="Fantech Logo" class="partner-logo">
        <img src="../assets/corsair.png" alt="Corsair Logo" class="partner-logo">
        <img src="../assets/razer.png" alt="Razer Logo" class="partner-logo">
        <img src="../assets/msi.png" alt="MSI Logo" class="partner-logo">
        <img src="../assets/da.jpg" alt="Digital Alliance Logo" class="partner-logo">
        <!-- Tambahkan gambar mitra lainnya sesuai kebutuhan -->
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .our-partners {
    text-align: center;
    margin: 80px 0; /* Meningkatkan margin untuk menjauhkan dari komponen sebelumnya */
  }
  
  h3 {
    color: #333;
    font-size: 24px;
    font-weight: 600;
  }
  
  .partners-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    overflow: hidden; /* Menyembunyikan gambar yang keluar dari kotak */
  }
  
  .partner-logo {
    max-width: 100px;
    margin: 0 10px;
    animation: moveFromRight 8s linear infinite alternate; /* Animasi dari kanan ke kiri dan sebaliknya selama 8 detik */
  }
  
  @keyframes moveFromRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  </style>
  