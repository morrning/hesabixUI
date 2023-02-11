<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-sm btn-alt-primary me-1" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop_'">
    <i class="fa fa-edit"></i>
    ویرایش
  </button>

  <!-- Modal -->
  <div class="modal fade" :id="'#staticBackdrop_'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ this.$props.body }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';
import Swal from "sweetalert2";
import axios from "axios";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: "editReplay",
  data:()=>{return{
    replayBody: '',
    id: ''
  }},
  props:{
    id:12,
    body: ''
  }
}
</script>

<style scoped>

</style>