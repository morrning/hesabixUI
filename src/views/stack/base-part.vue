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
          <a class="block block-rounded block-transparent block-link-pop bg-gd-sea h-100 mb-0" href="javascript:void(0)">
            <div class="block-content block-content-full d-flex align-items-center justify-content-between">
              <div>
                <p class="fs-lg fw-semibold mb-0 text-white">آمار و اطلاعات </p>
                <p class="text-white-75 mb-0"> ۲۹۱۲۵ پاسخ

                |
                  ۱۲۵۰ پرسش
                </p>
              </div>
              <div class="ms-3 item">
                <i class="fa fa-2x fa-vector-square text-white-50"></i>
              </div>
            </div>
          </a>
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
export default {
  name: "base-part",
  components:{
    cats:catComponent,
  }
}
</script>

<style scoped>

</style>