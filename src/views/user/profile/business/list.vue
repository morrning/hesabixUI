<template>
  <div class="block block-rounded mb-5">
    <div class="block-header block-header-default">
      <h3 class="block-title">کسب و کار ها</h3>
      <span class="block-options">
        <RouterLink to="/profile/new-business" class="btn btn-alt-success">
          <i class="fa fa-plus-circle"></i>
          کسب و کار جدید
        </RouterLink>
      </span>
    </div>
    <div class="block-content">
      <div class="list-group mb-3">
        <div v-for="item in contents" @click="runBid(item.id)" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <img src="/img/icons/business.png" alt="twbs" class="rounded-circle flex-shrink-0" width="50" height="50">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-0">{{item.name}}</h6>
              <p class="mb-0 opacity-75">{{item.legal_name}}   توسط   {{item.owner}}</p>
            </div>
            <small class="opacity-50 text-nowrap">رایگان</small>
          </div>
        </div>
        <router-link to="/profile/new-business" v-if="contents.length === 0">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6>اولین کسب و کار خود را ایجاد کنید</h6>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "list",
  data: ()=>{ return {
    contents: [],
  }},
  methods:{
    runBid(id){
      localStorage.setItem('activeBid',id);
      axios.post('/api/year/list',{}, {
        headers: {
          activeBid: id
        }
      }).then((response)=>{
        response.data.forEach((item)=>{
          if(item.head == '1') {
            localStorage.setItem('activeYear',item.id);
          }
        });
        window.location.href="/acc/"
      })
    }
  },
  async beforeMount() {
    await axios.post('/api/business/list').then((response)=>{
      this.contents = response.data;
    });
  }
}
</script>

<style scoped>

</style>