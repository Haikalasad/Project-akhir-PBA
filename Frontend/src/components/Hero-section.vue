<template>
  <div class="hero-section">
    <div class="sentence">
      <h1>Welcome to GameWorld Pro !!!</h1>
      <h5>Your Ultimate Gaming Destination! Elevate Your Experience with Us.</h5>
      <div class="btn-explore">
        <router-link to="/produk" class="btn-explore">Explore Now</router-link>
      </div>  
    </div>

    <div class="image">
      <img src="../assets/hero-section.jpg"> 
    </div>
  </div>
</template>

<style>
.hero-section {
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 100%;
height: 453px;
  
  
}


.sentence {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
  padding: 30px;
  text-align: left;
}
.btn-explore {
  background: #000;
  text-decoration: none;
  color: white;
  text-align: center;
  width: 250px;
  padding: 4px; 
  font-size: 24px; 
  margin-top: 25px;
}

.btn-explore :hover{
  color: gray;
  
  
}

h1 {
  color: #0B0B0B;
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
}

h5 {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
}

.explore:hover {
  background: #000;
}

.image {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
}

img {
  max-width: 100%;
  max-height: 100%;
  margin:  auto;
}




</style>
