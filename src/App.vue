<template>
  <the-navigation />
  <div class="container">
    <!-- sidebar -->
    <router-view v-slot="{Component}" class="left-sidebar"
     name='LeftSidebar'>
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>

    <!-- main -->
    <router-view v-slot="{Component}" class="main-view">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import TheNavigation from './components/TheNavigation.vue';
</script>

<style>
.fade-enter-active,
.fade-leave-active{
  transition:opacity 0.3s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.container{
  display: flex;
}
.left-sidebar{
  width: 20%;
}
.main-view{
  width: 100%;
}
</style>