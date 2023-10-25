<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "NotFound"
})
</script>

<template>
  <!-- Hero -->
    <div class="bg-body-light">
        <div class="content content-full">
            <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                <h1 class="flex-grow-1 fs-3 fw-semibold my-2 my-sm-3">
                    <i class="fa fa-warning text-danger"></i>
                    صفحه مورد نظر یافت نشد!</h1>
            </div>
        </div>
    </div>
  <!-- END Hero -->

  <!-- Page Content -->
    <div class="content content-full justify-content-center text-center">
      <p class="">
          <h3>
              متاسفیم اما صفحه مورد نظر شما یافت نشد.
          </h3>
      </p>
    </div>
  <!-- END Page Content -->
</template>

<style scoped>

</style>