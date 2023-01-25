<template>
  <div class="row g-0 flex-md-grow-1">
    <div class="col-md-4 col-lg-5 col-xl-3 bg-light">
      <div class="content">
        <!-- Toggle Side Content -->
        <div class="d-md-none push">
          <!-- Class Toggle, functionality initialized in Helpers.dmToggleClass() -->
          <button class="btn w-100 btn-alt-primary" data-class="d-none" data-target="#side-content" data-toggle="class-toggle" type="button">محتوای جانبی</button>
        </div>
        <!-- END Toggle Side Content -->

        <!-- Side Content -->
        <div class="d-none d-md-block push" id="side-content">
          <div class="block block-rounded">
            <div class="block-content block-content-full bg-primary-darker text-center">
              <p class="text-white fs-3 fw-light mt-3 mb-0"> فهرست راهنما </p>
            </div>
            <div class="block-content block-content-full">
              <table class="table table-borderless table-striped table-hover">
                <tbody>
                <tr>
                  <td class="text-center" style="width: 40px;">01</td>
                  <td>
                    <strong>نیمه عمر 2</strong>
                  </td>
                  <td class="text-center" style="width: 40px;">
                    <strong class="text-success">9.6</strong>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- END Side Content -->
      </div>
    </div>
    <div class="col-md-8 col-lg-7 col-xl-9">
      <!-- Main Content -->
      <div class="content content-full">
        <div class="block block-rounded">
          <div class="block-content">
            <p>
              این راهنما است
              {{ $route.params.id}}
              <button class="btn btn-dark" @click="test">fffff</button>
            </p>
          </div>
        </div>
      </div>
      <!-- END Main Content -->
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "index",
  methods:{
    test(){
      Dashmix.helpers('jq-notify', {type: 'success', icon: 'fa fa-check me-1', message: 'Your message!'});
      alert();
    }
  },
  created() {

  },
  unmounted() {
    Dashmix.layout(('header_loader_off'))
  }

}
</script>

<style scoped>

</style>