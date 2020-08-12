<template>
  <div id="app">
    <Sidebar />
    <div id="container">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
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
