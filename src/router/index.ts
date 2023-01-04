import { createRouter, createWebHistory,useRoute } from 'vue-router'
import Home from '../views/Home.vue'
import sourceData from '../data.json'

const routes= [
  { path: '/', name: 'Home', component: Home, alias:'/home'},
  { path:'/protected',
  name:'Protected',
  
  components:{
  default:()=>import('../views/Protected.vue'),
  LeftSidebar:()=>import('../components/LeftSidebar.vue')
  },
  meta:{requiresAuth:true}},
  { path:'/login', name:'Login', component:()=>import('../views/Login.vue')},
  { path:'/invoices', name:'Invoices',
   components:{
    default:()=>import('../views/Invoices.vue'),
    LeftSidebar:()=>import('../components/LeftSidebar.vue')
   },
    meta:{requires:true}},
    {
      path:'/example/:id(\\d+)?',
      component:()=>import('../views/Login.vue')
    },
  {
    path:'/destination/:id/:slug',
    name:'destination.show',
    component:()=>import('../views/DestinationShow.vue'),
    props:route=>({...route.params, id:parseInt(route.params.id)}),
    beforeEnter: (to:any, from:any) => {
      const exists=sourceData.destinations.find(
        destination=>destination.id===parseInt(to.params.id)
      )
      if(!exists) return {
        name:'NotFound',
        params:{pathMatch: to.path.split('/').slice(1)},
        query:to.query,
        hash:to.hash
      }
    },
    children:[
      {
        path:':experienceSlug',
        name:'experience.show',
        component:()=>import('../views/ExperienceShow.vue'),
        props:route=>({...route.params, id:parseInt(route.params.id)})
      },
    ]
  },
  {
    path:'/:pathMatch(.*)*',
    name:'NotFound',
    component:()=>import('../views/NotFound.vue')
  },
  ]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to,from,savedPosition){
    return savedPosition || new Promise((resolve)=>{
      setTimeout(()=>resolve({top:0}),300)
    })
  }  
})
router.beforeEach((to,from)=>{
  if(to.meta.requiresAuth && !window.user){
    return {name:'Login',query:{redirect:to.fullPath}}
  }
})
export default router
