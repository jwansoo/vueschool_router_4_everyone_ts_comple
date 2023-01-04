<template>
  <div>
  <section class="destination" v-if="destination">
    <h1>{{destination.name}}</h1>
    <GoBack />
    <div class="destination-details">
      <img :src="`/images/${destination.image}`" :alt="destination.name" />
      <p>{{destination.description}}</p>
    </div>
  </section>
  <section class="experiences" v-if="destination">
    <h2>Top Experiences in {{destination.name}}</h2>
    <div class="cards">
    <router-link
    v-for="experience in destination.experiences"
    :key="experience.slug"
    :to="{name:'experience.show', params:{experienceSlug:experience.slug}}">
      <ExperienceCard
      :experience="experience"
      />
  </router-link>
   </div>
   <router-view></router-view>
  </section>
</div>
</template>

<script setup lang="ts">
import ExperienceCard from '@/components/ExperienceCard.vue';
import sourceData from '../data.json'
import GoBack from '../components/GoBack.vue'
import {ref, computed} from 'vue'
import { useRoute } from 'vue-router';
const props=defineProps<{
  id:number
}>()
const route=useRoute()
const destination=computed(()=>sourceData.destinations.find((destination)=>destination.id===props.id))
</script>

<style scoped>

</style>