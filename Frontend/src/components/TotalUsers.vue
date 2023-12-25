<template>
    <div class="total-users">
      <img src="../assets/user.png" alt="Users Icon">
      <p>
        <span class="static-text">Total Users:</span>
        <br />
        <span class="animated" data-text="1000+"></span>
      </p>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .total-users {
    text-align: center;
    margin: 180px 0; /* Meningkatkan margin untuk menjauhkan dari komponen sebelumnya */
  }
  
  img {
    max-width: 80px;
    margin-bottom: 20px;
  }
  
  p {
    color: #333;
    font-size: 36px;
    font-weight: 700;
    display: flex;
    flex-direction: column; /* Menjadikan elemen p sebagai flex container dengan arah kolom */
    align-items: center;
    justify-content: center; /* Menyelaraskan secara horizontal dan vertikal ke tengah */
  }
  
  .static-text {
    margin-bottom: 1px; /* Menambah margin di bagian bawah teks statis */
  }
  
  span.animated::before {
    content: attr(data-text);
    animation: rotateText 5s infinite linear;
    display: inline-block;
  }
  
  @keyframes rotateText {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  