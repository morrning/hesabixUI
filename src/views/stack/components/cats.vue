<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">دسته‌بندی‌ها</h3>
    </div>
    <div class="block-content p-0">
      <div class="list-group m-0 p-0 rounded-0">
        <router-link :to="'/stack/home/' + item.id + '/1'" type="button" v-for="item in cats" class="list-group-item list-group-item-action">
          <i class="fa fa-dot-circle text-danger"></i>
          {{ item.name }}</router-link>
        <router-link to="/stack/home/non/1" type="button" class="list-group-item list-group-item-action">
          <i class="fa fa-dot-circle text-danger"></i>
          همه‌ی موضوعات</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cats",
  data: ()=>{return {
    cats : []
  }},
  async mounted() {
    let data = await axios.get('/api/stack/cats/get');
    this.cats = data.data
  }
}
</script>

<style scoped>

</style>