<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">
        درخواست‌های پشتیبانی
      </h3>
      <div class="block-options">
        <router-link to="/profile/support-new" class="btn btn-success">
          <i class="fa fa-plus"></i>
          جدید
        </router-link>
      </div>
    </div>
    <div class="block-content mt-0">
      <div class="row pb-sm-3 pb-md-5">
        <div class="col-sm-12 col-md-12">
          <div v-if="items.length != 0" class="table-responsive">
            <table class="table text-center table-striped">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">تاریخ</th>
                <th scope="col">عنوان درخواست</th>
                <th scope="col">وضعیت</th>
                <th scope="col">عملیات</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in items">
                <th scope="row">{{index + 1}}</th>
                <td>{{item.dateSubmit}}</td>
                <td>{{item.title}}</td>
                <td>{{item.state}}</td>
                <td>
                  <router-link :to="'/profile/support-view/' + item.id">
                    <i class="fa fa-eye"></i>
                  </router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="container">
            <h3 class="text-success">هیچ درخواست در حال پیگیری وجود ندارد.</h3>
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
  data(){return{
    items:[]
  }},
  mounted() {
    this.loadData();
  },
  methods:{
    loadData(){
      axios.post('/api/support/list').then((response)=>{
        this.items = response.data;
      });
    }
  }
}
</script>

<style scoped>

</style>