<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">NodeJS Challenge</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">User List</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
    <footer class="footer mt-auto py-3 bg-dark text-white">
      <div class="container text-center">
        <span class="text-muted">NodeJS Challenge © 2024</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

html, body, #app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

.footer {
  background-color: #343a40;
  color: #ffffff;
  padding: 1rem 0;
}
</style>
