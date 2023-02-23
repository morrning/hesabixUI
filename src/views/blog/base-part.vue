<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-sm-12 col-md-3">
        <insert v-if="superadmin"></insert>
        <div class="block block-rounded">
          <div class="block-header">
            <h3 class="block-title"> <i class="fa fa-eye"></i> <small> پربازدیدترین مطالب </small></h3>
          </div>
          <div class="block-content">
            <p>بلوک ساده</p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-9">
       <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import insert from "/src/views/blog/components/insert.vue"
import axios from "axios";
export default {
  name: "base-part",
  data: ()=>{return{
    superadmin: false
  }},
  components:{
    insert: insert
  }
  ,beforeMount() {
    axios.post('/api/user/is_superadmin').then((response) =>{
      if(response.data.result == 1){
        this.superadmin = true;
      }
    });
  }
}
</script>

<style scoped>

</style>