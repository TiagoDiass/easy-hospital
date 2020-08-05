<template>
  <div id="app">
    <Sidebar />
    <div id="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/layout/Sidebar';

export default {
  name: 'app',
  components: {
    Sidebar,
  },
};
</script>
