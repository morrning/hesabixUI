<template>
  <div class="block block-content-full">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <i class="fa fa-print"></i>
        چاپ اسناد
      </h3>
      <div class="block-options">
        <button @click="submit()" type="submit" class="btn btn-sm btn-success mx-2">
          <i class="fa fa-save me-2"></i>
          ذخیره تنظیمات
        </button>
      </div>
    </div>
    <div class="block-content pb-3">
      <Loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false" />
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="submit">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                  role="tab" aria-controls="home" aria-selected="true"> فروش</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button"
                  role="tab" aria-controls="home" aria-selected="true"> خرید</button>
              </li>
              <li v-if="isPluginActive('accpro')" class="nav-item" role="presentation">
                <button class="nav-link" id="rfbuy-tab" data-bs-toggle="tab" data-bs-target="#rfbuy" type="button"
                  role="tab" aria-controls="home" aria-selected="true">برگشت از خرید</button>
              </li>
              <li v-if="isPluginActive('accpro')" class="nav-item" role="presentation">
                <button class="nav-link" id="rfsell-tab" data-bs-toggle="tab" data-bs-target="#rfsell" type="button"
                  role="tab" aria-controls="home" aria-selected="true"> برگشت از فروش</button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="p-md-4">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.sell.bidInfo" type="checkbox">
                        <label class="form-check-label">اطلاعات کسب‌وکار</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.sell.pays" type="checkbox">
                        <label class="form-check-label">نمایش پرداخت‌های فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.sell.note" type="checkbox">
                        <label class="form-check-label">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.sell.taxInfo" type="checkbox">
                        <label class="form-check-label">مالیات به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.sell.discountInfo" type="checkbox">
                        <label class="form-check-label">تخفیف به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-12 mb-2">
                      <div class="form-floating">
                        <textarea v-model="settings.sell.noteString" class="form-control"
                          placeholder="این نوشته در پایین فاکتور‌ها چاپ خواهد شد" style="height: 100px"></textarea>
                        <label for="floatingTextarea2">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="buy" role="tabpanel" aria-labelledby="buy-tab">
                <div class="p-md-4">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.buy.bidInfo" type="checkbox">
                        <label class="form-check-label">اطلاعات کسب‌وکار</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.buy.pays" type="checkbox">
                        <label class="form-check-label">نمایش پرداخت‌های فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.buy.note" type="checkbox">
                        <label class="form-check-label">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.buy.taxInfo" type="checkbox">
                        <label class="form-check-label">مالیات به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.buy.discountInfo" type="checkbox">
                        <label class="form-check-label">تخفیف به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-12 mb-2">
                      <div class="form-floating">
                        <textarea v-model="settings.buy.noteString" class="form-control"
                          placeholder="این نوشته در پایین فاکتور‌ها چاپ خواهد شد" style="height: 100px"></textarea>
                        <label for="floatingTextarea2">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="rfbuy" role="tabpanel" aria-labelledby="rfbuy-tab">
                <div class="p-md-4">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfbuy.bidInfo" type="checkbox">
                        <label class="form-check-label">اطلاعات کسب‌وکار</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfbuy.pays" type="checkbox">
                        <label class="form-check-label">نمایش پرداخت‌های فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfbuy.note" type="checkbox">
                        <label class="form-check-label">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfbuy.taxInfo" type="checkbox">
                        <label class="form-check-label">مالیات به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfbuy.discountInfo" type="checkbox">
                        <label class="form-check-label">تخفیف به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-12 mb-2">
                      <div class="form-floating">
                        <textarea v-model="settings.rfbuy.noteString" class="form-control"
                          placeholder="این نوشته در پایین فاکتور‌ها چاپ خواهد شد" style="height: 100px"></textarea>
                        <label for="floatingTextarea2">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="rfsell" role="tabpanel" aria-labelledby="rfsell-tab">
                <div class="p-md-4">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfsell.bidInfo" type="checkbox">
                        <label class="form-check-label">اطلاعات کسب‌وکار</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfsell.pays" type="checkbox">
                        <label class="form-check-label">نمایش پرداخت‌های فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfsell.note" type="checkbox">
                        <label class="form-check-label">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfsell.taxInfo" type="checkbox">
                        <label class="form-check-label">مالیات به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="form-check form-switch">
                        <input class="form-check-input" v-model="settings.rfsell.discountInfo" type="checkbox">
                        <label class="form-check-label">تخفیف به تفکیک اقلام</label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-12 mb-2">
                      <div class="form-floating">
                        <textarea v-model="settings.rfsell.noteString" class="form-control"
                          placeholder="این نوشته در پایین فاکتور‌ها چاپ خواهد شد" style="height: 100px"></textarea>
                        <label for="floatingTextarea2">یاداشت پایین فاکتور</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {
  name: "bussiness",
  components: {
    Loading
  },
  data: () => {
    return {
      isLoading: ref(false),
      plugins: [],
      settings: {
        sell: {
          pays: true,
          note: true,
          noteString: '',
          bidInfo: true,
          taxInfo: true,
          discountInfo: true
        },
        buy: {
          pays: true,
          note: true,
          noteString: '',
          bidInfo: true,
          taxInfo: true,
          discountInfo: true
        },
        rfbuy: {
          pays: true,
          note: true,
          noteString: '',
          bidInfo: true,
          taxInfo: true,
          discountInfo: true
        },
        rfsell: {
          pays: true,
          note: true,
          noteString: '',
          bidInfo: true,
          taxInfo: true,
          discountInfo: true
        }
      }
    }
  },
  methods: {
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
    submit() {
      this.isLoading = true;
      axios.post('/api/printers/options/save', this.settings).then((response) => {
        if (response.data.code == 0) {
          Swal.fire({
            text: 'با موفقیت ثبت شد.',
            icon: 'success',
            confirmButtonText: 'قبول',
          })
        }
        this.isLoading = false;
      })
    }
  },
  async beforeMount() {
    this.isLoading = true;
    axios.get("/api/printers/options/info").then((response) => {
      this.isLoading = false;
      this.settings = response.data;
    });
    //get active plugins
    axios.post('/api/plugin/get/actives',).then((response) => {
      this.plugins = response.data;
    });
  }
}
</script>

<style scoped></style>