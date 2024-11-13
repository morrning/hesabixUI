<template>
  <div class="block block-rounded mb-5">
    <div class="block-header block-header-default">
      <h3 class="block-title">کسب و کار ها</h3>
      <span class="block-options">
        
      </span>
    </div>
    <div class="block-content pb-2">
      <div v-for="item in contents" class="row border p-2 rounded-0 mb-1" aria-current="true">
        <div class="col-sm-12 col-md-1 text-center p-2">
          <img :src="apiurl + '/front/avatar/file/get/' + item.id" :alt="item.name"
            class="rounded-circle border flex-shrink-0" width="50" height="50">
        </div>
        <div class="col-sm-12 col-md-8 text-center p-2">
          <h6 class="mb-0">{{ item.name }}</h6>
          <p class="mb-0 opacity-75">{{ item.owner }}</p>
        </div>
        <div class="col-sm-12 col-md-3 text-center p-2">
          <div class="input-group">
            <select v-model="item.selectedMoney" class="form-select" aria-label="انتخاب واحد پولی">
              <option v-for="money in item.moneys" :value="money">{{ money.label }}</option>
            </select>
            <button @click="runBid(item.id)" type="button" class="btn btn-primary" title="ورود به کسب و کار">
              ورود
            </button>
          </div>
        </div>
      </div>
      <router-link to="/profile/new-business" v-if="contents.length === 0">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div class="p-2 m-2">
            <h6>اولین کسب و کار خود را ایجاد کنید</h6>
          </div>
        </div>
      </router-link>
    </div>
    <div class="justify-content-center text-center">
      <loading color="blue" loader="dots" v-model:active="loading" :is-full-page="false" />
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { getApiUrl } from "/hesabixConfig";
import { ref } from "vue";
import Loading from "vue-loading-overlay";

export default {
  name: "list",
  components: { Loading },
  data: () => {
    return {
      loading: ref(true),
      contents: [],
      apiurl: '',
      selectedMoney: {
        name: '',
        label: ''
      }
    }
  },
  methods: {
    loadData() {
      this.apiurl = getApiUrl();
      axios.post('/api/business/list').then((response) => {
        this.contents = response.data;
        this.contents.forEach((bid) => {
          bid.selectedMoney = bid.arzmain;
        })
        this.loading = false;
      });
    },
    async runBid(id) {
      localStorage.setItem('activeBid', id);
      this.contents.forEach((item) => {
        if (item.id == id) {
          localStorage.setItem('activeMoney', item.selectedMoney.name);
          localStorage.setItem('activeMoneySymbol', item.selectedMoney.symbol);
          localStorage.setItem('activeMoneyShortName', item.selectedMoney.shortName);
          localStorage.setItem('activeMoneyLabel', item.selectedMoney.label);
        }
      })
      await axios.post('/api/year/list', {}, {
        headers: {
          activeBid: id
        }
      }).then((response) => {
        response.data.forEach((item) => {
          if (item.head == '1') {
            localStorage.setItem('activeYear', item.id);
          }
        });
        this.$router.push({name:'acc_home'});
      })
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped></style>