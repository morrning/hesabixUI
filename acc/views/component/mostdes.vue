<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import Swal from "sweetalert2";
import { ref } from 'vue';

export default defineComponent({
  name: "mostdes",
  props: {
    submitData: Object,
    type: String
  },
  data: () => {
    return {
      loading: ref(false),
      items: [],
      des: '',
      selected: 0
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      axios.post('/api/mostdes/list', {
        type: this.$props.type
      }).then((response) => {
        this.items = response.data;
        this.loading = false;
      });
    },
    remove(id) {
      this.loading = true;
      axios.post('/api/mostdes/remove/' + id).then((response) => {
        this.loading = false;
        Swal.fire({
          text: ' با موفقیت حذف شد.',
          icon: 'success',
          confirmButtonText: 'قبول'
        }).then((result) => {
          this.loadData();
        });
      })
    },
    save() {
      if (this.des.trim() == '') {
        Swal.fire({
          text: 'شرح الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        })
      }
      else {
        this.loading = true;
        axios.post('/api/mostdes/add', {
          des: this.des,
          type: this.$props.type
        }).then((response) => {
          this.loading = false;
          Swal.fire({
            text: ' با موفقیت ثبت شد.',
            icon: 'success',
            confirmButtonText: 'قبول'
          }).then((result) => {
            this.loadData();
            this.des = '';
          });
        })
      }

    },
    selectItem(item) {
      this.selected = item;
      this.$props.submitData.id = item.id;
      this.$props.submitData.des = item.des;
      var genericModalEl = document.getElementById('mostDesModal');
      var modal = bootstrap.Modal.getInstance(genericModalEl);
      modal.hide();
    }
  },
  mounted() {
    this.loadData();
  }
})
</script>

<template>
  <!-- Modal -->
  <div class="modal modal-lg fade" id="mostDesModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="mostDesModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary-light text-white">
          <h1 class="modal-title fs-5" id="mostDesModalLabel">شرح‌های تکراری</h1>
          <div class="block-options">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <input v-model="des" type="text" class="form-control" placeholder="شرح" aria-label="افزودن شرح پرتکرار"
              aria-describedby="button-addon1">
            <button :disabled="this.loading" @click="save()" class="btn btn-outline-success" type="button"
              id="button-addon1">ثبت</button>

          </div>

          <ul :disabled="this.loading" class="list-group">
            <li v-for="item in items" class="list-group-item d-flex justify-content-between align-items-center">
              <a title="حذف" @click="remove(item.id)" class="text-danger rounded-pill float-start">
                <i class="fa fa-trash"></i>
              </a>
              <span class="">
                {{ item.des }}
              </span>
              <span @click="selectItem(item)" class="badge text-bg-primary rounded-pill float-start">
                <i class="fa fa-arrow-left"></i>
              </span>

            </li>
          </ul>
          <div v-if="items.length == 0">
            موردی یافت نشد
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>