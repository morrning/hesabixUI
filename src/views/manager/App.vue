<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
export default {

  data(){
    return {
      ROLE_ADMIN:true,
      userInfo:{
        fullName:'',
        email:''
      }
    }
  },
  beforeMount() {

  },
  created() {

  },
  methods:{
    logout(){
      axios.post( '/api/user/logout')
          .then((response) =>{
            localStorage.removeItem('X-AUTH-TOKEN');
            window.location.href = "/";
            delete  axios.defaults.headers.common['X-AUTH-TOKEN'];
          });
    },

  },
  async mounted() {
    axios.post('/api/admin/has/role/' + 'ROLE_ADMIN').then((response)=>{
      this.ROLE_ADMIN = response.data.result;
      if(this.ROLE_ADMIN == false){
        this.$router.push('/404');
      }else{
        axios.post('/api/user/current/info').then((res) => {this.userInfo = res.data;});
      }
    });
  },
  components:{

  }
}
</script>

<template>
  
</template>

<style>

</style>
