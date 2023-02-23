<template>
  <div class="row mx-2">
    <div class="col-12" v-for="item in contents">
      <div class="block block-rounded">
        <div class="block-content p-0 overflow-hidden">
          <div class="row g-0">
            <div class="col-md-4 col-lg-5 overflow-hidden d-flex align-items-center">
              <router-link :to="'/blog/post/' + item.url">
                <img alt="" class="img-fluid img-link" :src="item.img">
              </router-link>
            </div>
            <div class="col-md-8 col-lg-7 d-flex align-items-center">
              <div class="px-4 py-3">
                <h4 class="mb-1">
                  <router-link class="text-dark" :to="'/blog/post/' + item.url"> {{ item.title }} </router-link>
                </h4>
                <div class="fs-sm mb-2">
                  <router-link :to="'/blog/post/' + item.url">{{item.submitter}}</router-link> {{item.dateSubmit}} ·
                </div>
                <p class="mb-0"> {{ item.intero }} <router-link :to="'/blog/post/' + item.url">ادامه مطلب</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Pagination -->
  <nav aria-label="Topics navigation">
    <ul class="pagination justify-content-end my-2 mx-4">
      <li class="page-item" v-if="hasPrevPage">
        <router-link aria-label="Previous" class="page-link" :to="'/blog/home/' + (this.$route.params.id - 1)">
                      <span aria-hidden="true">
                        <i class="fa fa-angle-right"></i>
                      </span>
          <span class="visually-hidden">قبلی</span>
        </router-link>
      </li>
      <li class="page-item active">
        <a class="page-link" href="javascript:void(0)">{{  this.$route.params.id  }}</a>
      </li>
      <li class="page-item" v-if="hasNextPage">
        <router-link aria-label="Next" class="page-link" :to="'/blog/home/' + (parseInt(this.$route.params.id)  + 1)">
                      <span aria-hidden="true">
                        <i class="fa fa-angle-left"></i>
                      </span>
          <span class="visually-hidden">بعد</span>
        </router-link>
      </li>
    </ul>
  </nav>
  <!-- END Pagination -->
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data: ()=>{ return {
    contents: [],
    hasPrevPage: false,
    hasNextPage: true
  }},
  methods:{
    async getData(pageNum){
      if(pageNum > 1){
        this.hasPrevPage = true;
      }
      else{
        this.hasPrevPage = false;
      }
      let data = await axios.post('/api/blog/contents/search',{
        page: pageNum,
        count: 9
      });
      this.contents = data.data.data;
      this.hasNextPage = data.data.nextPage;
    }
  },
  async beforeMount(){
    await this.getData(this.$route.params.id);
  },
  beforeRouteUpdate(to,from,next){
    this.getData(to.params.id);
    next();
  }
}
</script>

<style scoped>

</style>