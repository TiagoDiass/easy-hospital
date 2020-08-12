<template>
  <div id="sidebar">
    <h1 class="logo text-300"><span class="text-bold text-info">Easy</span>Hospital</h1>

    <div id="nav">
      <a @click="navigateTo('Home')"><i class="fas fa-home"></i> Home</a>
      <a @click="navigateTo('Pacientes')"><i class="fas fa-users"></i> Pacientes</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',

  methods: {
    navigateTo(name) {
      this.$router.push({ name });
    },
  },
};
</script>
