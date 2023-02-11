<template>
  <a class="block block-rounded block-transparent block-link-pop bg-gd-sea h-100 mb-0" href="javascript:void(0)">
    <div class="block-content block-content-full d-flex align-items-center justify-content-between">
      <div>
        <p class="fs-lg fw-semibold mb-0 text-white">آمار و اطلاعات </p>
        <p class="text-white-75 mb-0"> {{ stat.replayCount }} پاسخ

          |
          {{ stat.questionCount }} پرسش
        </p>
      </div>
      <div class="ms-3 item">
        <i class="fa fa-2x fa-vector-square text-white-50"></i>
      </div>
    </div>
  </a>
</template>

<script>
import axios from "axios";

export default {
  name: "stat",
  data: ()=>{return {
    stat:{
      replayCount: 0,
      questionCount: 0
    }
  }},
  async beforeMount() {
    let data = await axios.get('/api/stack/stat/get');
    this.stat.questionCount = data.data.questionCount;
    this.stat.replayCount = data.data.replayCount;
  }
}
</script>

<style scoped>

</style>