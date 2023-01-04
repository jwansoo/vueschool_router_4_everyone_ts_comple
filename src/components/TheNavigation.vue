<template>
<div id="nav">
  <router-link  id="logo" to="/">Vue School Travel App</router-link>
  <router-link 
   v-for="destination in destinations"
   :key="destination.id"
   :to="{name:'destination.show', params:{id:destination.id, slug:destination.slug}}">
  {{ destination.name }}
  </router-link>
  <router-link :to="{name:'Protected'}">Dashboard</router-link>
</div>
</template>
<script setup lang="ts">
import sourceData from '../data.json'
import {ref} from 'vue'

const destinations=ref(sourceData.destinations)
</script>