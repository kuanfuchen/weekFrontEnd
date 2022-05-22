<template>
  <div>
   <section>
      <nav
        class="navbar navbar-expand-lg navbar-light border-bottom border-3 border-dark">
        <div class="container px-lg-12">
          <h1 class="font-paytone">
            <a class="navbar-brand fs-1" href="#">MetaWall</a>
          </h1>
          <div class="d-flex align-items-center">
            <img :src="user.photo"  style="width:40px;height: 40px;border-radius: 50%;">
            <div class="dropdown bg-white me-2">
              <button
                class="btn btn-white border-0  fw-bolder font-azeret"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ user.name }}
              </button>
              <ul
                class="dropdown-menu py-0"
                aria-labelledby="dropdownMenuButton1"
              >
                <li class="border border-dark" v-for="id in userlist" :key="id">
                  <a class="dropdown-item" @click="changeUser(id)">{{ id.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </section>
    <div class="container row mx-auto" >
      <div class="col-md-7">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
      <div class="col-md-5">
        <div class="mt-2">
          <Sidebar :sideBarUser ="user" />
        </div>
        
      </div>
    </div>
    
  </div>
</template>
<script setup>
import axios from 'axios';
import {ref, onMounted, reactive, provide, computed, nextTick} from 'vue';
import Sidebar from './components/SidebarComponent.vue';
let userlist = reactive([]);
const user = ref({});
const changeUser = (id)=>{
  user.value = id;
};
const isRouterAlive = ref(true);
const getUser = ()=>{
  axios.get('https://boiling-wildwood-68884.herokuapp.com/users').then((response)=>{
  for(let i=0 ; response.data.data.length > i ; i++){
    userlist.push(response.data.data[i])
    }
  user.value = userlist[0];
  })
}
const reload = ()=>{
  isRouterAlive.value =false;
  nextTick(()=>isRouterAlive.value = true)
}
provide('emitUesrInfo',computed(()=> user.value));
provide('reload',reload);
onMounted(()=>{
  getUser();
})
</script>
<style lang="scss">
@import './assets/all.scss';
@import 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp';
@import 'https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;700&amp;family=Baloo+Da+2&amp;family=Noto+Sans+TC:wght@400;700&amp;family=Paytone+One&amp;display=swap';
</style>
