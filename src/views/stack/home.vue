<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">پرسش‌و‌پاسخ</h3>
    </div>
    <div class="block-content p-0 pb-1">
      <!-- Topics -->
      <table class="table table-striped table-borderless table-vcenter">
        <thead>
        <tr class="bg-body-dark">
          <th colspan="2">موضوع</th>
          <th class="d-none d-md-table-cell text-center" style="width: 100px;">پاسخ ها</th>
          <th class="d-none d-md-table-cell text-center" style="width: 100px;">بازدیدها</th>
          <th class="d-none d-md-table-cell" style="width: 200px;">آخرین پست</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="content in contents">
          <td colspan="2">
            <router-link class="fw-semibold" :to="'/stack/content/' + content.url">{{ content.title}}</router-link>
            <div class="fs-sm text-muted mt-1">
              <router-link to="/">{{ content.submitter}}</router-link> حدود <span> {{ content.dateSubmit}} </span>
            </div>
          </td>
          <td class="d-none d-md-table-cell text-center">
            <router-link class="fw-semibold" :to="'/stack/content/' + content.url"> {{ content.replaysCount }}</router-link>
          </td>
          <td class="d-none d-md-table-cell text-center">
            <router-link class="fw-semibold" :to="'/stack/content/' + content.url">{{ content.views}}</router-link>
          </td>
          <td class="d-none d-md-table-cell ">
            <span v-if="content.replaysCount != 0" class="fs-sm"> توسط <a href="be_pages_generic_profile.html">{{ content.lastReplayPerson}}</a><br> در <span> {{ content.lastReplayDate}}</span></span>
            <span v-else class="fs-sm"> --- </span>
          </td>
        </tr>

        </tbody>
      </table>
      <!-- END Topics -->

      <!-- Pagination -->
      <nav aria-label="Topics navigation">
        <ul class="pagination justify-content-end my-2 mx-4">
          <li class="page-item" v-if="hasPrevPage">
            <router-link aria-label="Previous" class="page-link" :to="'/stack/home/' + (this.$route.params.id - 1)">
                      <span aria-hidden="true">
                        <i class="fa fa-angle-right"></i>
                      </span>
              <span class="visually-hidden">قبلی</span>
            </router-link>
          </li>
          <li class="page-item active">
            <a class="page-link" href="javascript:void(0)">1</a>
          </li>
          <li class="page-item" v-if="hasNextPage">
            <router-link aria-label="Next" class="page-link" :to="'/stack/home/' + (parseInt(this.$route.params.id)  + 1)">
                      <span aria-hidden="true">
                        <i class="fa fa-angle-left"></i>
                      </span>
              <span class="visually-hidden">بعد</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- END Pagination -->
    </div>
  </div>
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
      let data = await axios.post('/api/stack/contents/search',{
        page: pageNum
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