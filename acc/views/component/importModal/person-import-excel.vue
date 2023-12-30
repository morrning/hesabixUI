<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "person-import-excel",
  props:{
    
  },
  methods:{
    submit(){
      alert()
    }
  }
})
</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="ms-2 btn btn-sm btn-primary" title="وارد کردن از اکسل" data-bs-toggle="modal" data-bs-target="#importexcel" >
    <i class="fa fa-file-import"></i>
  </button>

  <!-- Modal -->
  <div class="modal modal-lg fade" id="importexcel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="importexcelLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary-light text-white">
          <h1 class="modal-title fs-5" id="importexcelLabel">وارد کردن از اکسل</h1>
          <div class="block-options">
            <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
            <ul>
                <li>برای وارد کردن لیست فراد در اکسل ابتدا فایل نمونه را دریافت نمایید سپس مطابق الگو اطلاعات را تکمیل کنید در مرحله بعدی با انتخاب فایل نسبت به ورود از لیست اقدام کنید</li>
                <li>
                    <a href="https://hesabix.ir" target="_blank">دریافت فایل نمونه</a>
                </li>
            </ul>
            <form @submit.prevent="submit()">
              <div class="mb-3">
                  <label for="formFileSm" class="form-label">انتخاب فایل</label>
                  <input class="custom-file-input form-control" id="formFileSm" type="file" accept="application/vnd.ms-excel,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
              </div>
              <div class="mb-3">
                  <button type="submit" class="btn btn-primary">
                      وارد کردن
                  </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .custom-file-input:lang(en)~.custom-file-label::after {
        content: "انتخاب فایل";
    }
</style>