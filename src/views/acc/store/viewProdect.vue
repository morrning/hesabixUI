<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "viewProdect",
  data: () => {
    return {
      item: {
        id: '',
        name: '',
        price: 0,
        timelabel: 0,
      },
    }
  },
  created() {
    axios.post('/api/plugin/get/info/' + this.$route.params.id).then((response) => {
      this.item = response.data;
    });
  },
  methods: {
    insert() {
      axios.post('/api/plugin/insert/' + this.item.id).then((response) => {
        if (response.data.Success == true) {
          window.location.href = response.data.targetURL;
        }
      }).catch(error => {
        Swal.fire({
          text: 'متاسفانه مشکلی در پردازش درخواست پیش آمد . لطفا مجددا درخواست خود را تکرار نمایید.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      });
    }
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <a @click.prevent="$router.back()" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </a>

        <i class="mx-2 fa fa-plug-circle-check"></i>
        جزئیات خرید افزونه
      </h3>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 p-3 bg-primary-lighter">
          <a class="block block-rounded block-link-shadow" href="javascript:void(0)">
            <div class="block-content block-content-full ribbon ribbon-dark ribbon-modern ribbon-primary">
              <div class="ribbon-box">{{ Intl.NumberFormat('en-US').format(item.price) }} تومان</div>
              <div class="py-3 text-center">
                <i class="fa fa-plug-circle-plus fa-4x text-gray"></i>
                <p class="fs-lg text-dark mt-3 mb-0">{{ item.name }}</p>
                <p class="text-muted mb-3"> مدت اعتبار افزونه :
                  <i class="text-primary">{{ item.timelabel }}</i>
                </p>
                <p class="fs-sm fw-bold text-muted mb-0"> مبلغ قابل پرداخت: (با احتساب مالیات بر ارزش افزوده)
                <h3 class="text-success">{{ Intl.NumberFormat('en-US').format((item.price * 109) / 100) }} تومان</h3>
                </p>
                <div class="text-center">
                  <a class="btn btn-primary" @click.prevent="insert()">پرداخت آنلاین از طریق زرین پال</a>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>