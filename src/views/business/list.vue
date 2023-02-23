<template>
  <div class="mb-5">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-6">
          <div class="card">
            <div class="card-header bg-primary-dark border text-light">
              <i class="bi bi-list-task"></i>
              <span class="app-title">کسب و کار ها</span>
              <span class="text-start justify-content-start float-end">
                        <router-link class="btn btn-sm btn-link rounded-2 border text-light" to="/business/new">
                            <i class="fa fa-plus-square"></i>
                            راه اندازی کسب‌و‌کار جدید
                        </router-link>
                    </span>
            </div>
            <div class="card-body app-body">
              <div class="list-group">
                <a v-for="item in contents" :href="'/acc/'+item.id+'/dashboard'" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                  <img src="/img/icons/business.png" alt="twbs" class="rounded-circle flex-shrink-0" width="50" height="50">
                  <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6 class="mb-0">{{item.name}}</h6>
                      <p class="mb-0 opacity-75">{{item.legal_name}}   توسط   {{item.owner}}</p>
                    </div>
                    <small class="opacity-50 text-nowrap">رایگان</small>
                  </div>
                </a>
                <a href="/acc/" v-if="contents.length === 0">
                  <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6>اولین کسب و کار خود را ایجاد کنید</h6>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
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
  async beforeMount() {
    await axios.post('/api/business/list').then((response)=>{
      this.contents = response.data;
      console.log(response.data)
    });
  }
}
</script>

<style scoped>

</style>