<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-sm-12 col-md-3">
        <div class="block block-rounded mb-2">
          <div class="block-header">
            <h3 class="block-title"> <i class="fa fa-folder-tree"></i> <small> دسته‌بندی مطالب </small></h3>
          </div>
          <div class="block-content">
            <p>بلوک ساده</p>
          </div>
        </div>
        <div class="block block-rounded">
          <div class="block-header">
            <h3 class="block-title"> <i class="fa fa-eye"></i> <small> پربازدیدترین مطالب </small></h3>
          </div>
          <div class="block-content">
            <p>بلوک ساده</p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-9">
       <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-part"
}
</script>

<style scoped>

</style>