<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">{{ content.title }}</h3>
    </div>
    <div class="block-content">
      <table class="table table-borderless">
        <tbody>
        <tr class="table-active">
          <td class="d-none d-sm-table-cell justify-content-end"></td>
          <td class="text-muted">
            <a href="be_pages_generic_profile.html">{{ content.submitter}}</a> حدود <span> {{ content.dateSubmit}} |
            <i class="fa fa-folder-tree"></i> {{ content.cat}}
          </span>
          </td>
        </tr>
        <tr>
          <td class="d-none d-sm-table-cell text-center" style="width: 140px;">
            <p>
              <a href="be_pages_generic_profile.html">
                <img :src="'http://www.gravatar.com/avatar/' + content.gravatar_hash" class="img-avatar" />
              </a>
            </p>
            <p class="fs-sm fw-medium">{{content.submitter}}</p>
          </td>
          <td>
            <p v-html="content.body"></p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "show-content",
  data:()=>{ return {
    content:{
      title: '',
      body: '',
      submitter: '',
      dateSubmit: '',
      gravatar_hash: '',
      cat: ''
    }
  }},
  async beforeMount(){
      let data = await axios.get('/api/stack/content/get/' + this.$route.params.id);
      this.content.title = data.data.title;
      this.content.body = data.data.body;
      this.content.submitter = data.data.submitter;
      this.content.dateSubmit = data.data.dateSubmit;
      this.content.gravatar_hash = data.data.submitter_gravatar_hash;
      this.content.cat = data.data.cat;
  },
  mounted() {
    //view increase
    axios.get('/api/stack/content/increase/view/' + this.$route.params.id);
  }
}
</script>

<style scoped>

</style>