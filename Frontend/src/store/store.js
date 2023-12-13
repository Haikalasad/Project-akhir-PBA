// store.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      userID: localStorage.getItem('userID') || null,
    };
  },
  mutations: {
    setUserID(state, userID) {
      state.userID = userID;
      localStorage.setItem('userID', userID); // Simpan userID di local storage
    },
  },
});

export default store;
