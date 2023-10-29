<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>

       مشاهده درخواست‌ پشتیبانی
      </h3>
      <div class="block-options">
      </div>
    </div>
    <div class="block-content mt-0">
      <div class="row pb-sm-3 pb-md-5">
        <div class="col-sm-12 col-md-12">
          <div class="block block-rounded">
            <!-- Chat #1 Header -->
            <div class="block-content block-content-full bg-primary">
              <div class="fs-lg fw-semibold text-white text-start"> موضوع: <b>{{this.item.title}}</b> </div>
              <div class="text-start mt-2 text-white">وضعیت درخواست:
                <div class="badge bg-white text-danger">{{item.state}}</div>
              </div>
            </div>
            <!-- END Chat #1 Header -->

            <!-- Chat #1 Messages -->
            <div class="js-chat-messages block-content block-content-full text-break overflow-y-auto" data-chat-id="1" style="height: 300px;"><div class="me-4">
              <div class="fs-sm text-muted animated fadeIn my-2">
                {{item.dateSubmit}}
              </div>
              <div class="me-4" >
                <div class="fs-sm d-inline-block fw-medium animated fadeIn bg-body-light border-3 px-3 py-2 mb-2 shadow-sm mw-100 border-start border-dark rounded-end">
                  {{item.body}}
                </div>
              </div>
            </div>
              <div class="me-4" v-bind:class = "(replay.state == 1)?'':'justify-content-end text-end'" v-for="replay in replays">
                <div class="fs-sm text-muted animated fadeIn my-2">
                  {{replay.dateSubmit}}
                  توسط
                  {{replay.title}}
                </div>
                <div class="fs-sm d-inline-block fw-medium animated fadeIn bg-body-light border-3 px-3 py-2 mb-2 shadow-sm mw-100 border-dark" v-bind:class = "(replay.state == 1)?'border-start rounded-end':'border-end rounded-start'">
                  {{replay.body}}
                </div>
              </div>
            </div>
            <!-- Chat #1 Input -->
            <div class="js-chat-form block-content p-2 bg-body-dark">
              <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>
              <div class="input-group mb-3">
                <input v-model="this.replay" type="text" class="form-control" placeholder="پاسخ خود را ارسال کنید." >
                <button :disabled="isLoading" @click="save()" class="btn btn-outline-secondary" type="button" id="button-addon1">ارسال</button>
              </div>
            </div>
            <!-- END Chat #1 Input -->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import 'vue-loading-overlay/dist/css/index.css';
export default {
  name: "show",
  components:{
    Loading
  },
  data(){return {
    item: '',
    replays:[],
    replay:'',
    isLoading: false,
  }},
  methods:{
    loadData(){
      axios.post('/api/admin/support/view/' + this.$route.params.id).then((response)=>{
        this.item = response.data.item;
        this.replays = response.data.replays;
      })
    },
    save(){
      if(this.replay.trim() == ''){
        Swal.fire({
          icon:'warning',
          text: 'متن پاسخ وارد نشده است.',
          confirmButtonText: 'قبول',
        })
      }
      else{
        this.isLoading = true;
        axios.post('/api/admin/support/mod/' + this.item.id,{
          'body':this.replay
        }).then((response)=>{
          this.isLoading = false;
          if(response.data.error==0){
            Swal.fire({
              text: 'پاسخ ثبت شد .',
              icon: 'success',
              confirmButtonText: 'قبول',
            }).then((res)=>{
              this.replays.push({
                id:0,
                body:this.replay,
                state: 1,
                title:'شما',
                dateSubmit:'هم اکنون'
              });
              this.replay = '';
              this.item.state = 'پاسخ داده شده'
            })
          }
        })
      }
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>