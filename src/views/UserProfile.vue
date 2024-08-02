<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center">Profile</h1>
        <form @submit.prevent="updateProfile">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" v-model="name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio:</label>
            <input type="text" v-model="bio" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Location:</label>
            <input type="text" v-model="location" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserProfile',
  data() {
    return {
      name: '',
      bio: '',
      location: ''
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        const response = await axios.get('http://localhost:8080/profile', {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        this.name = response.data.name;
        this.bio = response.data.bio;
        this.location = response.data.location;
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    },
    async updateProfile() {
      try {
        await axios.put('http://localhost:8080/profile', {
          name: this.name,
          bio: this.bio,
          location: this.location
        }, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
      } catch (error) {
        console.error('Failed to update profile', error);
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
