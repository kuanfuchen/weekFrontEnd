<template>
  <div>
    <!-- sidebar -->
    <div class=" d-md-block d-none">
      <div class="border border-dark border-2 px-4 py-5">
        <div class="d-grid gap-2 mb-4">
          <router-link class="btn btn-primary shadow-black rounded-3" to="/post">
            張貼動態
          </router-link>
        </div>
      <ul class="ps-0">
        <li class="card h-100 border-0 mb-4">
          <a href="#">
            <div class="d-flex align-items-center">              
                    <img :src="user.photo" class="mx-3 img-fluid" style="width:40px;height: 40px;border-radius: 50%;">
                    <p class="mt-2 fw-bold">{{user.name}}</p>
                  </div>
                </a>
              </li>
              <li class="card h-100 border-0 mb-4">
                <a href="#">
                  <div class="media d-flex align-items-center">
                    <div
                      class="rounded-circle border border-dark p-2 mx-3 bg-light hover-primary"
                    >
                      <span class="material-icons-outlined">
                        notifications
                      </span>
                    </div>
                    <p class="mt-2 fw-bold">追蹤名單</p>
                  </div>
                </a>
              </li>
              <li class="card h-100 border-0">
                <a href="#">
                  <div class="media d-flex align-items-center">
                    <div
                      class="rounded-circle border border-dark p-2 mx-3 bg-light hover-primary"
                    >
                      <span class="material-icons material-icons-outlined">
                        thumb_up
                      </span>
                    </div>
                    <p class="mt-2 fw-bold">我按讚的文章</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
  </div>
</template>

<script setup>
import {defineProps,  computed } from 'vue';
const userObj = defineProps({
  'sideBarUser':{
    type:Object
  }
});
const user = computed(()=>{
  return userObj.sideBarUser
})
</script>
<style scoped>
</style>
