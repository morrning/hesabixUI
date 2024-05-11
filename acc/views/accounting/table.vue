<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <i class="mx-2 fa fa-table"></i>
        جدول حساب‌ها </h3>
    </div>
    <div class="block-content pt-1 pb-3 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>

      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <Tree :nodes="tree" :config="config"></Tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";
import axios from "axios";
import Loading from 'vue-loading-overlay';

export default {
  name: "table",
  components:{
    Tree : treeview,
    Loading
  },
  data: ()=>{return {
    isLoading: true,
    config: {
      roots: ["1"],
      opened: true,
      openedIcon: {
        type: "shape",
        stroke: "black",
        strokeWidth: 3,
        viewBox: "0 0 24 24",
        draw: "M 2 12 L 22 12",
      },
      closedIcon: {
        type: "shape",
        stroke: "black",
        strokeWidth: 3,
        viewBox: "0 0 24 24",
        draw: `M 12 2 L 12 22 M 2 12 L 22 12`,
      },
    },
    tree: [],

  }},
  mounted() {
    this.loadData();
  },
  methods:{
    loadData(){
      axios.post('/api/accounting/table/get').then((response)=>{
        this.tree = response.data;
        this.isLoading =false;
      })
    }
  }

}
</script>

<style scoped>

</style>