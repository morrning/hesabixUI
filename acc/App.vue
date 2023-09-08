<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import Swal from "sweetalert2";
import {inject} from "vue";
import NProgress from "nprogress/nprogress.js";
import "nprogress/nprogress.css"
import "/public/assets/css/dashmix.min.css"
import Year from "./views/component/Year.vue"
import Icon from "./views/component/notifications/icon.vue";
export default {
  data(){
    return {
      userFullName: '',
      userEmail: '',
      isLogedIn: false,
      business_count: 0,
      permissions:{},
      plugins: {},
      business:{}
    }
  },
  async beforeMount() {
    await axios.get('/api/user/check/login').then((response)=>{
      if(response.data.result == 1){
        axios.post('/api/business/get/user/permissions',
            {'bid':localStorage.getItem('activeBid'),
              'email': response.data.email
            }
        ).then((response)=>{
          this.permissions = response.data;
        });
        //get active plugins
        axios.post('/api/plugin/get/actives',).then((response)=>{
          this.plugins = response.data;
        });
      }
    })
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
    }
  },
  async mounted() {
    axios.post('/api/user/check/login')
        .then((response) => {
          this.isLogedIn = response.data.result;
          axios.post('/api/user/current/info')
              .then((res) => {
                this.userEmail = res.data.email;
                this.userFullName = res.data.fullname;
                this.$isLogedIn = true;
              });
        });

    axios.post('/api/business/list/count')
        .then((response) => {
          this.business_count = response.data.count;
        });
    axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
          this.business = response.data;
        });
  },
  components:{
    Year: Year,
    notification: Icon
  }
}
</script>

<template>

  <!-- Sidebar -->
  <!--
    Sidebar Mini Mode - Display Helper classes

    Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
    Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
      If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

    Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
    Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
    Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
  -->
  <nav aria-label="Main Navigation" id="sidebar">
    <!-- Side Header -->
    <div class="bg-header-dark">
      <div class="content-header bg-white-5">
        <!-- Logo -->
        <a class="fw-semibold text-white tracking-wide" href="/">
              <span class="smini-visible"> Hesab<span class="opacity-75">ix</span>
              </span>
          <span class="smini-hidden"><span class="text-light">
            <img style="max-height:25px" src="/assets/media/favicons/favw.png"/>
            حسابیکس
          </span>
              </span>
        </a>
        <!-- END Logo -->

        <!-- Options -->
        <div>
          <!-- Close Sidebar, Visible only on mobile screens -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
          <button class="me-1 btn btn-sm btn-alt-secondary d-lg-none" data-action="sidebar_close" data-toggle="layout" type="button">
            <i class="fa fa-times-circle"></i>
          </button>
          <!-- END Close Sidebar -->
        </div>
        <!-- END Options -->
      </div>
    </div>
    <!-- END Side Header -->

    <!-- Sidebar Scrolling -->
    <div class="js-sidebar-scroll">
      <!-- Side Navigation -->
      <div class="content-side">
        <ul class="nav-main">
          <li class="nav-main-item">
            <RouterLink class="nav-main-link" to="/">
              <i class="nav-main-link-icon fa fa-rocket"></i>
              <span class="nav-main-link-name"> پیشخوان </span>
            </RouterLink>
          </li>
          <li v-show="this.plugins.length !== 0" class="nav-main-heading">افزونه‌ها</li>
          <li v-show="(permissions.plugNoghreSell || permissions.plugNoghreAdmin) && (plugins.noghre !== undefined)" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-star-half-stroke"></i>
              <span class="nav-main-link-name">کارگاه نقره سازی</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/plugin/noghre/order/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list"></i>
                    سفارشات
                  </span>
                  <RouterLink to="/acc/plugin/noghre/order/mod/0" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
                <RouterLink class="nav-main-link" to="/acc/plugin/noghre/employees/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list"></i>
                    کارکنان
                  </span>
                  <RouterLink to="/acc/plugin/noghre/employees/mod" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li v-show="permissions.plugRestamap" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-bowl-food"></i>
              <span class="nav-main-link-name">رستوران و فست‌فود</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.persons" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/persons/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list"></i>
                    فهرست اشخاص
                  </span>
                  <RouterLink to="/acc/persons/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li v-show="permissions.plugCC" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-group-arrows-rotate"></i>
              <span class="nav-main-link-name">باشگاه مشتریان</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.persons" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/persons/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list"></i>
                    فهرست اشخاص
                  </span>
                  <RouterLink to="/acc/persons/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-main-heading">حسابداری</li>
          <li v-show="permissions.getpay || permissions.persons" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-person"></i>
              <span class="nav-main-link-name">اشخاص</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.persons" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/persons/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list"></i>
                    فهرست اشخاص
                  </span>
                  <RouterLink to="/acc/persons/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
              <li v-if="permissions.getpay" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/persons/receive/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-arrow-alt-circle-down"></i>
                    دریافت‌ها
                  </span>
                  <RouterLink to="/acc/persons/receive/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
              <li v-if="permissions.getpay" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/persons/send/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-arrow-alt-circle-up"></i>
                    پرداخت‌ها
                  </span>
                  <router-link to="/acc/persons/send/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li v-show="permissions.commodity" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-box-open"></i>
              <span class="nav-main-link-name">کالا و خدمات</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/commodity/list">
                  <span class="nav-main-link-name">فهرست کالاها</span>
                  <router-link to="/acc/commodity/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
              </li>
            </ul>
          </li>
          <li v-show="permissions.banks || permissions.cashdesk || permissions.salary || permissions.bankTransfer" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-bank"></i>
              <span class="nav-main-link-name">بانکداری</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.banks" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/banks/list">
                  <span class="nav-main-link-name"> حساب‌های بانکی</span>
                  <router-link to="/acc/banks/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
              <li v-if="permissions.cashdesk" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/cashdesk/list">
                  <span class="nav-main-link-name"> صندوق‌ها</span>
                  <router-link to="/acc/cashdesk/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
              <li v-if="permissions.salary" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/salary/list">
                  <span class="nav-main-link-name"> تنخواه‌گردان‌ها</span>
                  <router-link to="/acc/salary/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
              <li v-if="permissions.bankTransfer" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/transfer/list">
                  <span class="nav-main-link-name"> انتقال </span>
                  <RouterLink to="/acc/transfer/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li v-show="permissions.buy || permissions.cost" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-money-bill"></i>
              <span class="nav-main-link-name">خرید و هزینه</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.buy" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/buy/list/">
                  <span class="nav-main-link-name"> فاکتورهای خرید</span>
                  <router-link to="/acc/buy/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
              </li>
              <li v-if="permissions.cost" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/costs/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-money-bill-wheat"></i>
                    هزینه‌ها</span>
                  <router-link to="/acc/costs/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
              </li>
            </ul>
          </li>
          <li v-show="permissions.sell || permissions.income" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-basket-shopping"></i>
              <span class="nav-main-link-name">فروش و درآمد</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.sell" class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name"> فاکتورهای فروش </span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
              <li v-if="permissions.income" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/incomes/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-cash-register"></i>
                    فهرست درآمدها </span>
                  <router-link to="/acc/incomes/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li v-show="permissions.accounting" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-book-open-reader"></i>
              <span class="nav-main-link-name">حسابداری</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/accounting/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-book-open"></i>
                    اسناد حسابداری
                  </span>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/accounting/table">
                  <span class="nav-main-link-name">
                    <i class="fa fa-table"></i>
                    جدول حساب‌ها
                  </span>
                </router-link>
              </li>
            </ul>
          </li>
          <li v-if="permissions.report" class="nav-main-item">
            <RouterLink class="nav-main-link" to="/acc/reports/list">
              <i class="nav-main-link-icon fa fa-chart-simple"></i>
              <span class="nav-main-link-name">گزارشات</span>
            </RouterLink>
          </li>
          <li v-show="permissions.settings || permissions.log || permissions.permission" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-cogs"></i>
              <span class="nav-main-link-name">تنظیمات</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.settings" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/business/settings">
                  <span class="nav-main-link-name">
                    <i class="fa fa-cog"></i>
                    اطلاعات کسب‌و‌کار </span>
                </router-link>
              </li>
              <li v-if="permissions.log" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/business/logs">
                  <span class="nav-main-link-name">
                    <i class="fa fa-history"></i>
                    تاریخچه رویدادها  </span>
                </router-link>
              </li>
              <li v-if="permissions.permission" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/business/users">
                  <span class="nav-main-link-name">
                    <i class="fa fa-users-gear"></i>
                    کاربران و دسترسی‌ها
                  </span>
                </router-link>
              </li>
              <li v-if="permissions.owner" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/business/apis">
                  <span class="nav-main-link-name">
                    <i class="fa fa-plug-circle-xmark"></i>
                    دسترسی توسعه دهندگان
                  </span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-main-item" v-show="permissions.owner">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu bg-success text-white" data-toggle="submenu" href="#">
              <i class="text-white nav-main-link-icon fa fa-shopping-cart"></i>
              <span class="nav-main-link-name">بازار</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/plugin-center/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list-alt"></i>
                    فهرست افزونه‌ها </span>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/plugin-center/my">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list-check"></i>
                    افزونه‌های من </span>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/plugin-center/invoice">
                  <span class="nav-main-link-name">
                    <i class="fa fa-ticket"></i>
                    صورت حساب‌ها </span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-main-item" v-show="permissions.owner">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu bg-success text-white" data-toggle="submenu" href="#">
              <i class="text-white nav-main-link-icon fa fa-shopping-cart"></i>
              <span class="nav-main-link-name">بازار</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/plugin-center/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list-alt"></i>
                    فهرست افزونه‌ها </span>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/plugin-center/my">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list-check"></i>
                    افزونه‌های من </span>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/plugin-center/invoice">
                  <span class="nav-main-link-name">
                    <i class="fa fa-ticket"></i>
                    صورت حساب‌ها </span>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-main-item border rounded-3 border-white p-2 mt-4">
            <Year></Year>
          </li>
        </ul>
      </div>
      <!-- END Side Navigation -->
    </div>
    <!-- END Sidebar Scrolling -->
  </nav>
  <!-- END Sidebar -->

  <!-- Header -->
  <header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div>
        <!-- Toggle Sidebar -->
        <!-- Layout API, functionality initialized in Template._uiApiLayout()-->
        <button class="btn-sm btn btn-alt-secondary me-1" data-action="sidebar_toggle" data-toggle="layout" type="button">
          <i class="fa fa-fw fa-bars"></i>
        </button>
        <!-- END Toggle Sidebar -->
        <b class="ms-3 text-primary-darker">
          <i class="fa fa-shop"></i>
          {{this.business.name}}
        </b>
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div>
        <notification />

        <!-- User Dropdown -->
        <div class="dropdown d-inline-block">
          <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm me-1 btn-alt-secondary" data-bs-toggle="dropdown" id="page-header-user-dropdown" type="button">
            <i class="fa fa-fw fa-user d-sm-none"></i>
            <span class="d-none d-sm-inline-block">{{ userFullName }}</span>
            <i class="fa fa-fw fa-angle-down opacity-50 ms-1 d-none d-sm-inline-block"></i>
          </button>
          <div aria-labelledby="page-header-user-dropdown" class="dropdown-menu dropdown-menu-end p-0">
            <div class="bg-primary-dark rounded-top fw-semibold text-white text-center p-3"> گزینه های کاربر </div>
            <div class="p-2">
              <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
              <a class="dropdown-item" data-action="side_overlay_toggle" data-toggle="layout" href="/profile/dashboard">
                <i class="far fa-fw fa-building me-1"></i> پروفایل کاربر </a>
              <!-- END Side Overlay -->

              <div class="dropdown-divider" role="separator"></div>
              <button class="dropdown-item" @click="this.logout">
                <i class="far fa-fw fa-arrow-alt-circle-left me-1"></i> خروج از حسابیکس </button>
            </div>
          </div>
        </div>
        <!-- END User Dropdown -->
      </div>
      <!-- END Right Section -->
    </div>
    <!-- END Header Content -->

    <!-- Header Loader -->
    <!-- Please check out the Loaders page under Components category to see examples of showing/hiding it -->
    <div class="overlay-header bg-primary-darker" id="page-header-loader">
      <div class="content-header">
        <div class="w-100 text-center">
          <i class="fa fa-fw fa-2x fa-sun fa-spin text-white"></i>
        </div>
      </div>
    </div>
    <!-- END Header Loader -->
  </header>
  <!-- END Header -->

  <!-- Main Container -->
  <main id="main-container">
    <!-- Page Content -->
    <div class="content p-0 m-0">
      <RouterView />
    </div>
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>

<style>

.customize-table {
  --easy-table-header-font-color: #e1e1e1;
  --easy-table-header-background-color: #055bbb;
}
.form-control ,.form-select{
  font-family: 'vazir', sans-serif;
}
input[type=input]{
  direction:ltr;
}
</style>
