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
    <div class="block-content p-0">
      <div class="list-group m-0 p-0" v-show="!loading">
        <div v-for="item in contents" @click="runBid(item.id)" class="list-group-item list-group-item-action d-flex gap-3 rounded-0" aria-current="true">
          <img src="/img/icons/business.png" alt="twbs" class="rounded-circle flex-shrink-0" width="50" height="50">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-0">{{item.name}}</h6>
              <p class="mb-0 opacity-75">{{item.legal_name}}   توسط   {{item.owner}}</p>
            </div>
            <small class="text-nowrap">
              <button type="button" class="btn btn-sm btn-primary" title="ورود به کسب و کار">
                <i class="fa fa-door-open pe-2"></i>
                ورود
              </button>
            </small>
          </div>
        </div>
        <router-link to="/profile/new-business" v-if="contents.length === 0">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div class="p-2 m-2">
              <h6>اولین کسب و کار خود را ایجاد کنید</h6>
            </div>
          </div>
        </router-link>
      </div>
      <div class="justify-content-center text-center">
        <loading color="blue" loader="dots" v-model:active="loading" :is-full-page="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from "vue";
import Loading from "vue-loading-overlay";

export default {
  name: "list",
  components: {Loading},
  data: ()=>{ return {
    loading: ref(true),
    contents: [],
  }},
  methods:{
    loadData(){
      axios.post('/api/business/list').then((response)=>{
        this.contents = response.data;
        this.loading = false;
      });
    },
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
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>