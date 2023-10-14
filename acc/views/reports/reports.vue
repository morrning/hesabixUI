<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reports"
}
</script>

<style scoped>

</style>