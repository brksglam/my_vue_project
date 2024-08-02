<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="text-center mb-4">Nearby Users</h1>
        <ul class="list-group">
          <li v-for="user in users" :key="user.id" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{{ user.name }}</h5>
              <p class="mb-0">{{ user.bio }}</p>
              <small class="text-muted">{{ user.location }}</small>
            </div>
            <div>
              <button @click="likeUser(user.id)" class="btn btn-outline-primary btn-sm">Like</button>
              <button @click="dislikeUser(user.id)" class="btn btn-outline-secondary btn-sm">Dislike</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserList',
  data() {
    return {
      users: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users', {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    },
    async likeUser(userId) {
      try {
        await axios.post('http://localhost:8080/like', {
          likedUserId: userId
        }, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
      } catch (error) {
        console.error('Failed to like user', error);
      }
    },
    async dislikeUser(userId) {
      try {
        await axios.post('http://localhost:8080/dislike', {
          dislikedUserId: userId
        }, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
      } catch (error) {
        console.error('Failed to dislike user', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

h5 {
  margin: 0;
}

p {
  margin: 0;
}

button {
  margin-left: 10px;
}
</style>
