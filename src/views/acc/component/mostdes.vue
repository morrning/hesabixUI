<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import Swal from "sweetalert2";
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default defineComponent({
  name: "mostdes",
  components: {
    Loading
  },
  props: {
    submitData: Object,
    type: String
  },
  watch: {
    search: {
      handler: function (val, oldVal) {
        if (val == '') {
          this.items = this.orgItems;
        }
        else {
          const temp = [];
          this.orgItems.forEach((item) => {
            if (item.des.includes(val)) {
              temp.push(item);
            }
          });
          this.items = temp.slice();
        }
      },
      deep: false
    },
  },
  data: () => {
    return {
      loading: ref(false),
      items: [],
      orgItems: [],
      des: '',
      selected: 0,
      search: ''
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      axios.post('/api/mostdes/list', {
        type: this.$props.type
      }).then((response) => {
        this.items = response.data.slice();
        this.orgItems = response.data.slice();
        this.search = '';
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
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary-light text-white">
          <h1 class="modal-title fs-5" id="mostDesModalLabel">شرح‌های تکراری</h1>
          <div class="block-options">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <Loading color="blue" loader="dots" v-model:active="loading" :is-full-page="false" />
          <div class="input-group mb-1" v-if="orgItems.length > 6">
            <span class="input-group-text">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="text" v-model="search" class="form-control" placeholder="جست و جو">
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
          <div v-if="items.length == 0 && loading == false">
            منتیجه‌ای یافت نشد
          </div>
        </div>
        <div class="modal-footer">
          <div class="input-group mb-1">
            <input v-model="des" type="text" class="form-control" placeholder="افزودن شرح پرتکرار جدید" aria-label="افزودن شرح پرتکرار"
              aria-describedby="button-addon1">
            <button :disabled="this.loading" @click="save()" class="btn btn-outline-success" type="button"
              id="button-addon1">افزودن</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>