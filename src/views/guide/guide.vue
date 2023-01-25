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
            <div class="block-header block-header-default">
              <h3 class="block-title">فهرست خودآموزها</h3>
            </div>
            <div class="block-content block-content-full">
              <div class="js-nestable-icons dd">
                <ol class="dd-list">
                  <li class="dd-item" data-id="1"><button class="dd-collapse" data-action="collapse" type="button">Collapse</button><button class="dd-expand" data-action="expand" type="button">Expand</button>
                    <div class="dd-handle">
                      <i class="fa fa-bold text-muted me-1"></i> بوت استرپ </div>
                    <ol class="dd-list">
                      <li class="dd-item" data-id="2">
                        <div class="dd-handle">
                          <i class="fa fa-brush text-muted me-1"></i>تم ها</div>
                      </li>
                      <li class="dd-item" data-id="3">
                        <div class="dd-handle">
                          <i class="fa fa-file text-muted me-1"></i> مستندات </div>
                      </li>
                    </ol>
                  </li>
                  <li class="dd-item" data-id="4"><button class="dd-collapse" data-action="collapse" type="button">Collapse</button><button class="dd-expand" data-action="expand" type="button">Expand</button>
                    <div class="dd-handle">
                      <i class="fa fa-graduation-cap text-muted me-1"></i>یادگیری</div>
                    <ol class="dd-list">
                      <li class="dd-item" data-id="5">
                        <div class="dd-handle">
                          <i class="fa fa-code text-muted me-1"></i>کد</div>
                      </li>
                      <li class="dd-item" data-id="6">
                        <div class="dd-handle">
                          <i class="fa fa-pencil-alt text-muted me-1"></i> آموزش ها </div>
                      </li>
                      <li class="dd-item" data-id="7">
                        <div class="dd-handle">
                          <i class="fa fa-file-alt text-muted me-1"></i>مقاله</div>
                      </li>
                    </ol>
                  </li>
                  <li class="dd-item" data-id="8">
                    <div class="dd-handle">
                      <i class="fa fa-bezier-curve text-muted me-1"></i>طرح</div>
                  </li>
                  <li class="dd-item" data-id="9">
                    <div class="dd-handle">
                      <i class="fa fa-terminal text-muted me-1"></i> کد نویسی </div>
                  </li>
                  <li class="dd-item" data-id="10">
                    <div class="dd-handle">
                      <i class="fa fa-burn text-muted me-1"></i>بازاریابی</div>
                  </li>
                </ol>
              </div>
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
              <button class="btn btn-primary" @click="test">fffff</button>
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
      Dashmix.helpers('jq-notify', {type: 'danger', icon: 'fa fa-check me-1', message: 'عملیات با موفقیت انجام شد.'});
      alert();
    }
  },
  created() {

  },
  unmounted() {

  }

}
</script>

<style scoped>

</style>