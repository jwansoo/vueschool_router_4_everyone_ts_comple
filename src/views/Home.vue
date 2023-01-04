<template>
  <div class="home">
    <h1>Home</h1>
    <h1>All Destinations</h1>
    <button @click="triggerRouterError">Trigger Router Error</button>
    <div class="destinations">
    <router-link
    v-for="destination in destinations"
    :key="destination.id"
    :to="{name:'destination.show', params:{id:destination.id, slug:destination.slug}}">
    <h2>{{destination.name}}</h2>
    <img :src="`/images/${destination.image}`" :alt="destination.name" />
  </router-link>
  </div>
</div>
</template>

<script setup lang="ts">
import sourceData from '../data.json'
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { isNavigationFailure,NavigationFailureType } from 'vue-router';
const destinations=ref(sourceData.destinations)
const router=useRouter()
const triggerRouterError=async()=>{
  const navigationFailure=await router.push('/')
  if(isNavigationFailure(navigationFailure,NavigationFailureType.duplicated)){
    console.log(navigationFailure.to)
    console.log((navigationFailure.from));
  } else{
    //all is well
  } 
}
</script>

<style scoped>

</style>