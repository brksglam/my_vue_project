<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center">Register</h1>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" v-model="name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" v-model="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" v-model="password" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio:</label>
            <input type="text" v-model="bio" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Location:</label>
            <input type="text" v-model="location" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      bio: '',
      location: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8080/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          bio: this.bio,
          location: this.location
        });
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration failed', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>
