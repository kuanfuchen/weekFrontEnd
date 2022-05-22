<template>
  <div class="">
    <section class="container mt-7" >
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4 pe-1 mb-md-2 mb-3">
              <select id="newPost" class="form-select py-2" v-model="selectCreateAt" @change="queryCheckFn">
                <option v-for="i in timeOption" :key="i" :value="i.value">
                  {{i.text}}
                </option>
              </select>
            </div>
            <div class="col-md-8">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="搜尋貼文"
                  aria-label="search"
                  aria-describedby="button-search"
                  v-model="search"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  id="button-search"
                  @click="queryCheckFn"
                >
                  <span class="material-icons-outlined"> search </span>
                </button>
              </div>
            </div>
          </div>
          <ul class="ps-0" v-if="data.length !== 0">
            <li class="card h-100 py-4 px-4 mb-3 border-2 shadow-black" v-for="personInfo in data" :key="personInfo">
              <div class="d-flex align-items-center mb-3">
                <img :src="personInfo.user.photo" class="mx-3 img-fluid" style="width:40px;height: 40px;border-radius: 50%;" />
                <div class="d-flex flex-column mt-2">
                  <a href="#" class="mb-0 fw-bold">{{ personInfo.user.name }}</a>
                  <small class="text-muted">{{ personInfo.createdAt }}</small>
                </div>
                <button class="btn btn-outline-danger ms-auto btn-sm" @click="deleteArticleContent(personInfo._id)">移除</button>
              </div>
              <p>{{ personInfo.content }}</p>
              <img :src="personInfo.image" alt="photo1" class="img-fluid" v-if="personInfo.image" />
              
            </li>
          </ul>
          <section class="card border-2 shadow-black" v-else>
            <div class="card-header bg-white">
              <div class="d-flex">
                <div class="p-1 bg-danger border border-light rounded-circle me-1"></div>
                <div  class="p-1 bg-success border border-light rounded-circle me-1"></div>
                <div class="p-1 rounded-circle border border-light rounded-circle bg-warning"></div>
              </div>
            </div>
            <div class="card-body py-5">
              <p class="card-text text-muted text-center">
                目前尚無動態，新增一則貼文吧！
              </p>
            </div>
          </section>
          <!--  -->
        </div>
        
      </div>
      <div
        class="list-group border border-dark rounded-pill fixed-bottom bg-secondary d-md-none mx-1">
        <ul class="d-flex justify-content-around mb-0 ps-0">
          <li class="list-group-item border-0 bg-secondary">
            <a href="#">
              <div class="rounded-circle border border-dark p-2 bg-white">
                <span class="material-icons material-icons-outlined">
                  home
                </span>
              </div>
            </a>
          </li>
          <li class="list-group-item border-0 bg-secondary">
            <a href="#">
              <div class="rounded-circle border border-dark p-2 bg-white">
                <span class="material-icons material-icons-outlined">
                  notifications
                </span>
              </div>
            </a>
          </li>
          <li class="list-group-item border-0 bg-secondary">
            <a href="#">
              <div class="rounded-circle border border-dark p-2 bg-white">
                <span class="material-icons material-icons-outlined">
                  thumb_up
                </span>
              </div>
            </a>
          </li>
          <li class="list-group-item border-0 bg-secondary">
            <a href="#">
              <div class="rounded-circle border border-dark p-2 bg-primary">
                <span class="material-icons material-icons-outlined text-white">
                  add
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script setup>
  import {ref, reactive, onMounted,inject } from 'vue';
  import axios from 'axios';
  const defaultUrl = 'https://boiling-wildwood-68884.herokuapp.com/posts';
  let data = reactive([]);
  const selectCreateAt = ref('');
  const timeOption = ref([{text:'最新貼文', value:''},{text:'由舊到新', value:'asc'}])
  const search = ref('');
  const reload = inject('reload');
  const queryCheckFn = ()=>{
    data.length = 0;
    let queryUrl ='';
    let queryUrl2 = '';
    search.value === ''? '' : queryUrl = `search=${search.value}`;
    selectCreateAt.value === '' ? '' : queryUrl2 = `timeStamp=${selectCreateAt.value}`;
    queryUrl !== '' && queryUrl2 !==''?  queryUrl +=`&${queryUrl2}`: queryUrl = queryUrl + queryUrl2;
    queryUrl === '' ? queryUrl = defaultUrl : queryUrl = `${defaultUrl}/?${queryUrl}`;
    getData(queryUrl)
  }
  const deleteArticleContent = async(id)=>{
    if(!id)return;
    await axios.delete(`${defaultUrl}/${id}`,{data:{_id:id}}).then((response)=>{
      console.log(response.data,'delete success')
    })
    .catch((err)=>console.log(err));
    reload();
  };
  const getData = (url)=>axios.get(url).then((response)=>
  {
    for(let i=0; response.data.data.length>i;i++){
      data.push(response.data.data[i])
    }
  })
  onMounted(()=>{
    getData(defaultUrl)
  })
</script>
