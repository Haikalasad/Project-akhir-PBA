<template>
    <v-app-bar flat>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>GameWorld</v-app-bar-title>
      <v-spacer></v-spacer>
  
      
      <v-spacer></v-spacer>
      <div class="title d-flex ml-auto">
        <router-link to="/admin/produk" class="title" active-class="active-link">Your product</router-link>
        <router-link to="/admin/pesanan" class="title" active-class="active-link">Orders</router-link>
        <router-link to="/about" class="title" active-class="active-link">About</router-link>
      </div>
    </v-app-bar>
  </template>
  
  <style>
  .title:hover {
    color: gray;
  }
  .title {
    padding: 20px;
    text-decoration: none;
    color: black;
  }
  .active-link {
    font-weight: bold;
    text-decoration: none;
    color: black; /* Change the color as per your preference */
    padding: auto;
  }
  </style>
  