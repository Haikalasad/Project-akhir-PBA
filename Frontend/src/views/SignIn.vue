// Login.vue
<template>
  <div class="container">
    <div class="glassmorphism-card">
      <!-- Login Section -->
      <div class="login-section">
        <h2 class="LoginHeader">Sign In</h2> 
        <form @submit.prevent="signIn">
          <!-- Email Input -->
          <label for="email">Email:</label>
          <input v-model="email" type="email" placeholder="Enter your email" />

          <!-- Password Input -->
          <label for="password">Password:</label>
          <input v-model="password" type="password" placeholder="Enter your password" />

          <!-- Sign In Button -->
          <button type="submit" class="SignInButton">Sign In</button>
        </form>

        <!-- Don't Have an Account? Sign Up Link -->
        <div class="DonTHaveAnAccountCreateNowSignUp">
          <span>Don’t have an account? Create now </span>
          <router-link to="/signup" class="SignUpLink"> Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async signIn() {
      try {
        if (!this.email || !this.password) {
          console.error('Invalid input: Email and password are required.');
          return;
        }

        const response = await axios.post('http://localhost:3001/api/game/login', {
          email: this.email,
          password: this.password,
        });

    
        this.$store.commit('setUserID', response.data.user.id);
        console.log(response.data.user.id); // check user id

        if (this.email.toLowerCase() === 'admin@gmail.com') {
          console.log('Redirecting to admin page');
          // Redirect to the admin page
          router.push('/admin/produk');
        } else {
          console.log('Redirecting to home page');
          // Redirect to the user's home page
          router.push('/home');
        }

      } catch (error) {
        console.error('Login error:', error.response);

        if (error.response) {
          console.error('Server error status:', error.response.status);
          console.error('Server error data:', error.response.data);
        }
      }
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
  background: rgba(249, 249, 249, 0.9); 
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.login-section {
  max-width: 400px;
  margin: 0 auto;
}

label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
  }
.LoginHeader {
  font-size: 24px;
  color: #333; 
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.SignInButton {
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
 
  .DonTHaveAnAccountCreateNowSignUp {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .SignUpLink {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 5px;
  }
  </style>
  
