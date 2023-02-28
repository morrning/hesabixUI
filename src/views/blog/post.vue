<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="bg-image" :style="{ backgroundImage: `url(${content.img})` }">
          <div class="bg-black-75">
            <div class="content content-top content-full text-center">
              <h1 class="fw-bold text-white mt-5 mb-3"> {{ content.title}} </h1>
              <p>
                <span class="badge rounded-pill bg-primary fs-base px-3 py-2 me-2 m-1">
                  <i class="fa fa-user-circle me-1"></i> {{ content.submitter}} </span>
                <span class="badge rounded-pill bg-primary fs-base px-3 py-2 m-1">
                  <i class="fa fa-clock me-1"></i> {{ content.dateSubmit }} </span>
              </p>
            </div>
          </div>
        </div>
        <div class="content content-full">
          <div class="row justify-content-center">
            <div class="col-sm-8 py-5">
              <!-- Story -->
              <!-- Magnific Popup (.js-gallery class is initialized in Helpers.jqMagnific()) -->
              <!-- For more info and examples you can check out http://dimsemenov.com/plugins/magnific-popup/ -->
              <article class="js-gallery story js-gallery-enabled">
                <span class="text-muted">
                  دسته‌بندی:
                  <span class="text-primary">{{ content.cat }}</span>
                </span>
                <p v-html="content.body"></p>
              </article>
              <!-- END Story -->

              <!-- Actions -->
              <div class="d-flex justify-content-end text-end">
                <router-link to="/blog/home/1" class="btn btn-alt-primary">
                  <i class="fa fa-undo"></i>
                  بازگشت
                </router-link>
              </div>
              <!-- END Actions -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "post",
  data: ()=>{return{
    content:{},
  }},
  methods:{
    getData(){
      axios.post('/api/blog/post/get/' + this.$route.params.id).then((response) =>{
        this.content = response.data;
      });
    }
  },
  beforeMount() {
    this.getData();
  }
}
</script>

<style scoped>

</style>