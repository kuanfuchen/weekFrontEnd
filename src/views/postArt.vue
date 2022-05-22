<template>
  <div>
    <section class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card mb-5 rounded-0 border-2 position-relative">
            <h2 class="text-center fw-bold py-3 mb-0 fs-5">張貼動態</h2>
            <div
              class="position-absolute border border-dark border-2 w-100 py-4"
              style="z-index: -1; top: 10px; left: -6px"
            ></div>
          </div>
          <div class="card border border-dark border-2 shadow-black p-5">
            <form class="needs-validation" novalidate>
              <div class="form-group mb-3">
                <label for="content">貼文內容</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="5"
                  placeholder="輸入您的貼文內容"
                  v-model="articleContent"
                ></textarea>
              </div>
              <div class=" mb-2">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="imageWeb" />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">圖片網址</span>
                  </div>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-gray-dark border border-dark border-2 fw-bold"
                  @click="updataNewArticle" :disabled=" articleContent === '' ">
                  送出貼文
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </section>
  </div>
</template>
<script setup>
import axios from 'axios';
import {ref, inject} from 'vue';
import { useRouter } from 'vue-router';
const articleContent = ref('');
const router = useRouter();
const imageWeb = ref('');
const userInfo = inject('emitUesrInfo');
const updataNewArticle = async()=>{
  const user = await userInfo.value;
  const info = {
    "name": user.name,
    "user":user._id,
    "content":articleContent.value,
    "image":imageWeb.value
  }
  await axios.post('https://boiling-wildwood-68884.herokuapp.com/posts',info).then(()=>{
    articleContent.value = '';
    router.push('/')
  })
  
} 
</script>
