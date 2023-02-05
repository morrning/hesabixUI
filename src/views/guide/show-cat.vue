<template>
  <h1>فهرست راهنما</h1>
  <ul>
    <li v-for="cat in cats">
      <router-link :to="'/guide/content/'+ cat.url">{{ cat.title }}</router-link>
    </li>
  </ul>

</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "show-cat",
  data: ()=>{return{
    cats:[],
  }},
 created() {
   this.$watch(
       () => this.$route.params,
       (toParams, previousParams) => {
         this.getList();
       }
   )
 },
  methods:{
    async getList(){
      try {
        const data = await axios.post( '/api/guide/get/list/' + this.$route.params.id )
        this.cats = data.data;
      }
      catch (error) {

      }
    }
  },
  beforeRouteEnter(to,from,next) {
    next(vm => {
      vm.getList(to.params.id);
    })
  }

}
</script>

<style scoped>

</style>