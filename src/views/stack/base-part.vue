<template>
<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-4">
        <router-link to="/stack/insert" class="btn btn-primary mb-3 d-flex text-center justify-content-center">
          <i class="fa fa-question-circle"></i>
          موضوع جدید
        </router-link>
      <cats></cats>
      <div class="row mb-3">
        <div class="col">
          <stat></stat>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-8 px-0">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
import catComponent from "/src/views/stack/components/cats.vue";
import stat from "/src/views/stack/components/stat.vue";
export default {
  name: "base-part",
  components:{
    cats:catComponent,
    stat: stat
  }
}
</script>

<style scoped>

</style>