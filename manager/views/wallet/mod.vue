<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "mod"
})
</script>

<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-wallet px-2"></i>
        ثبت واریز به حساب </h3>
      <div class="block-options">
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>