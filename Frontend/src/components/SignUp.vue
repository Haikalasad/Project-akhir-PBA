<template>
    <div class="container">
      <div class="glassmorphism-card">
        <!-- Sign Up Section -->
        <div class="signup-section">
          <h2 class="SignUpHeader">Sign Up</h2>
          <form @submit.prevent="signUp">
            <!-- Email Input -->
            <label for="email">Email:</label>
            <input v-model="emailValue" type="email" placeholder="Enter your email" />
  
            <!-- Username Input -->
            <label for="username">Username:</label>
            <input v-model="usernameValue" type="text" placeholder="Choose a username" />
  
            <!-- Password Input -->
            <label for="password">Password:</label>
            <input v-model="passwordValue" type="password" placeholder="Choose a password" />
  
            <!-- Sign Up Button -->
            <button type="submit" class="SignUpButton">Sign Up</button>
          </form>
  
          <!-- Already Have an Account? Sign In Link -->
          <div class="HaveAnAccountSignInLink">
            <span>Already have an account? </span>
            <router-link to="/" class="SignInLink">Sign in</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignUpPage',
    data() {
      return {
        emailValue: '',
        usernameValue: '',
        passwordValue: '',
      };
    },
    methods: {
      signUp() {
       
      
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    margin-top: 0;
    height: 100vh;
    width: 100%;
    background-image: url('@/assets/logo3.png');
    background-size: cover;
    background-position: center;
  }
  
  .glassmorphism-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px);
  background: rgba(249, 249, 249, 0.8); 
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}
  
  .signup-section {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .SignUpHeader {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .SignUpButton {
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .HaveAnAccountSignInLink {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .SignInLink {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 5px;
  }
  </style>
  