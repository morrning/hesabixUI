<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark"> گزارشات </h3>
      <div class="block-options">

      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="container-fluid mt-2">
        <div class="row">
          <div class="col-sm-12 col-md-6 mb-2">
            <!-- Bold -->
            <div class="block block-rounded border border-secondary border-opacity-25">
              <div class="block-header block-header-default border border-bottom">
                <h3 class="block-title">
                  <i class="fa fa-user"></i>
                  اشخاص
                </h3>
              </div>
              <div class="block-content">
                <ul>
                  <li>
                    <router-link to="/acc/persons/card/view/">کارت حساب</router-link>
                  </li>
                  <li>
                    <router-link to="/acc/reports/persons/debtors">بدهکاران</router-link>
                  </li>
                  <li>
                    <router-link to="/acc/reports/persons/depositors">بستانکاران</router-link>
                  </li>
                  <li>
                    <router-link to="/acc/reports/persons/buysell">خرید و فروش های اشخاص</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <!-- END Bold -->
          </div>
          <div class="col-sm-12 col-md-6 mb-2">
            <!-- Bold -->
            <div class="block block-rounded border border-secondary border-opacity-25">
              <div class="block-header block-header-default border border-bottom">
                <h3 class="block-title">
                  <i class="fa fa-bank"></i>
                  بانکداری
                </h3>
              </div>
              <div class="block-content">
                <ul>
                  <li>
                    <router-link to="/acc/banks/card/view/">گردش حساب بانک</router-link>
                  </li>
                  <li>
                    <router-link to="/acc/cashdesk/card/view/">گردش حساب صندوق</router-link>
                  </li>
                  <li>
                    <router-link to="/acc/salary/card/view/">گردش حساب تنخواه گردان</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <!-- END Bold -->
          </div>
          <div class="col-sm-12 col-md-6 mb-2">
            <!-- Bold -->
            <div class="block block-rounded border border-secondary border-opacity-25">
              <div class="block-header block-header-default border border-bottom">
                <h3 class="block-title">
                  <i class="fa fa-cogs"></i>
                  گزارشات پایه
                </h3>
              </div>
              <div class="block-content">
                <ul>
                  <li>
                    <router-link to="/acc/business/logs">تاریخچه رویدادها</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <!-- END Bold -->
          </div>
          <div class="col-sm-12 col-md-6 mb-2">
            <!-- Bold -->
            <div class="block block-rounded border border-secondary border-opacity-25">
              <div class="block-header block-header-default border border-bottom">
                <h3 class="block-title">
                  <i class="fa fa-box"></i>
                  کالا و خدمات
                </h3>
              </div>
              <div class="block-content">
                <ul>
                  <li>
                    <router-link to="/acc/reports/commodity/buysell">خرید و فروش به تفکیک کالا</router-link>
                  </li>

                </ul>
              </div>
            </div>
            <!-- END Bold -->
          </div>
          <div v-if="this.isPluginActive('accpro')" class="col-sm-12 col-md-6 mb-2">
            <!-- Bold -->
            <div class="block block-rounded border border-secondary border-opacity-25">
              <div class="block-header block-header-default border border-bottom">
                <h3 class="block-title">
                  <i class="fa fa-list"></i>
                  حسابداری
                </h3>
              </div>
              <div class="block-content">
                <ul>
                  <li>
                    <router-link to="/acc/reports/acc/balance_sheet">ترازنامه</router-link>
                  </li>
                  <li>
                    <router-link to="/acc/reports/acc/explore_accounts">{{  $t('dialog.explore_accounts') }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <!-- END Bold -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "reports",
  data(){
    return {
      plugins: [],
    }
  },
  methods: {
    loadData() {
      //get active plugins
      axios.post('/api/plugin/get/actives',).then((response) => {
        this.plugins = response.data;
      });
    },
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
  },
  mounted(){
    this.loadData();
  }
}
</script>

<style scoped></style>