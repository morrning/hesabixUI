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
import archive_modal from './views/component/archive/archive_modal.vue';
import Loading from "vue-loading-overlay";
import smsPanel from "./views/component/smsPanel.vue";
import 'vue-loading-overlay/dist/css/index.css';
import {getSiteName} from "../hesabixConfig"
export default {

  data(){
    return {
      siteName:'',
      isLoading: false,
      userFullName: '',
      userEmail: '',
      isLogedIn: false,
      business_count: 0,
      permissions:{},
      plugins: {},
      business:{},
      ticket:{
        title:'',
        body:''
      },
      timeNow:''
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
          if(response.data.active != 1) {
            // jump user to active page
            Swal.fire({
              title: 'خطا',
              text: 'حساب کاربری شما فعال نیست.لطفا ابتدا حساب کاربری خود را تایید نمایید.',
              icon: 'error',
              confirmButtonText: 'انجام احراز هویت'
            }).then((result)=>{
              window.location.href = window.location.origin + '/user/active/' + this.permissions.id;
            });
          }
        });
        //get active plugins
        axios.post('/api/plugin/get/actives',).then((response)=>{
          this.plugins = response.data;
        });
      }
    })
  },
  created() {
    this.siteName = getSiteName();
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
    saveTicket(){
      if(this.ticket.title.trim() == '' || this.ticket.body.trim() == ''){
        Swal.fire({
          text: 'تکمیل موارد ستاره دار الزامی است.',
          confirmButtonText: 'قبول',
        })
      }
      else{
        this.isLoading = true;
        axios.post('/api/support/mod',this.ticket).then((response)=>{
          this.isLoading = false;
          Swal.fire({
            text: 'درخواست با موفقیت ثبت شد.',
            confirmButtonText: 'قبول',
          }).then((result)=>{
            this.ticket.title = '';
            this.ticket.body='';
            Dashmix.layout('side_overlay_close');
          })
        })
      }
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
    axios.post('/api/general/get/time').then((response) => {
      this.timeNow = response.data.timeNow;
    });
  },
  components:{
    Loading,
    Year: Year,
    notification: Icon,
    smsPanel:smsPanel,
    archive_modal:archive_modal
  }
}
</script>

<template>

  <aside id="side-overlay" data-simplebar="init"><div class="simplebar-wrapper" style="margin: 0px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="left: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: 100%; overflow: hidden scroll;"><div class="simplebar-content" style="padding: 0px;">
    <!-- Side Header -->
    <div class="bg-image" style="background-image: url('/img/bg_side_overlay_header.jpg');">
      <div class="bg-primary-op">
        <div class="content-header">
          <!-- User Avatar -->
          <a class="img-link me-1" href="https://my.hesabix.ir/profile/dashboard">
            <vue-gravatar class="img-avatar img-avatar32 img-avatar-thumb" :email="this.userEmail" :size="32" />
          </a>
          <!-- END User Avatar -->

          <!-- User Info -->
          <div class="ms-2">
            <a class="text-white fw-semibold" href="https://my.hesabix.ir/profile/dashboard">{{userFullName}}</a>
            <div class="text-white-75 fs-sm">{{userEmail}}</div>
          </div>
          <!-- END User Info -->

          <!-- Close Side Overlay -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
          <a class="ms-auto text-white" data-action="side_overlay_close" data-toggle="layout" href="javascript:void(0)">
            <i class="fa fa-times-circle"></i>
          </a>
          <!-- END Close Side Overlay -->
        </div>
      </div>
    </div>
    <!-- END Side Header -->

    <!-- Side Content -->
    <div class="content-side">
      <!-- Side Overlay Tabs -->
      <div class="block block-transparent pull-x pull-t mb-0">
        <ul class="nav nav-tabs nav-tabs-block nav-justified" role="tablist">
          <li class="nav-item" role="presentation">
            <button aria-controls="so-profile" aria-selected="true" class="nav-link active" data-bs-target="#so-profile" data-bs-toggle="tab" id="so-profile-tab" role="tab">
              <i class="fa fa-ticket"></i>
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button aria-controls="so-settings" aria-selected="false" class="nav-link" data-bs-target="#so-settings" data-bs-toggle="tab" id="so-settings-tab" role="tab" tabindex="-1">
              <i class="fa fa-fw fa-cog"></i>
            </button>
          </li>
        </ul>
        <div class="block-content tab-content overflow-hidden pt-1">
          <!-- Settings Tab -->
          <div aria-labelledby="so-settings-tab" class="tab-pane pull-x fade fade-up" id="so-settings" role="tabpanel" tabindex="0">
            <div class="block mb-0">
              <!-- Sidebar -->
              <div class="block-content block-content-sm block-content-full bg-body">
                <span class="text-uppercase fs-sm fw-bold">نوار کناری</span>
              </div>
              <div class="block-content block-content-full">
                <div class="row g-sm text-center">
                  <div class="col-6 mb-1">
                    <a class="d-block py-3 bg-body-dark fw-semibold text-dark" data-action="sidebar_style_dark" data-toggle="layout" href="javascript:void(0)"> تاریک </a>
                  </div>
                  <div class="col-6 mb-1">
                    <a class="d-block py-3 bg-body-dark fw-semibold text-dark" data-action="sidebar_style_light" data-toggle="layout" href="javascript:void(0)">روشن</a>
                  </div>
                </div>
              </div>
              <!-- END Sidebar -->

              <!-- Header -->
              <div class="block-content block-content-sm block-content-full bg-body">
                <span class="text-uppercase fs-sm fw-bold">هدر</span>
              </div>
              <div class="block-content block-content-full">
                <div class="row g-sm text-center mb-2">
                  <div class="col-6 mb-1">
                    <a class="d-block py-3 bg-body-dark fw-semibold text-dark" data-action="header_style_dark" data-toggle="layout" href="javascript:void(0)"> تاریک </a>
                  </div>
                  <div class="col-6 mb-1">
                    <a class="d-block py-3 bg-body-dark fw-semibold text-dark" data-action="header_style_light" data-toggle="layout" href="javascript:void(0)">روشن</a>
                  </div>
                </div>
              </div>
              <!-- END Header -->
            </div>
          </div>
          <!-- END Settings Tab -->

          <!-- Profile -->
          <div aria-labelledby="so-profile-tab" class="tab-pane pull-x fade fade-up show active" id="so-profile" role="tabpanel" tabindex="0">
            <form @submit.prevent="saveTicket()">
              <div class="block mb-0 px-1">
                <label class="mb-2 text-primary">درخواست پشتیبانی</label>
                <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>

                <div class="form-floating mb-4">
                  <input v-model="this.ticket.title" class="form-control" type="text">
                  <label class="form-label"><span class="text-danger">  *  </span> عنوان درخواست </label>
                </div>
                <div class="form-floating mb-4">
                  <textarea v-model="this.ticket.body" class="form-control" type="text" />
                  <label class="form-label"><span class="text-danger">  *  </span>متن درخواست</label>
                </div>
                <button :disabled="isLoading" type="submit" class="btn btn-sm btn-alt-primary mb-4">
                  <i class="fa fa-save"></i>
                  ثبت درخواست
                </button>
              </div>
            </form>
          </div>
          <!-- END Profile -->
        </div>
      </div>
      <!-- END Side Overlay Tabs -->
    </div>
    <!-- END Side Content -->
  </div></div></div></div><div class="simplebar-placeholder" style="width: auto; height: 1090px;"></div></div><div class="simplebar-track simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="width: 0px; display: none;"></div></div><div class="simplebar-track simplebar-vertical" style="visibility: visible;"><div class="simplebar-scrollbar" style="height: 33px; transform: translate3d(0px, 0px, 0px); display: block;"></div></div></aside>
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
      <div class="content-header">
        <!-- Logo -->
        <router-link class="fw-semibold text-white tracking-wide" to="/">
              <span class="smini-visible"> Hesab<span class="opacity-75">ix</span>
              </span>
          <span class="smini-hidden"><span class="text-light">
            <img alt="hesabix" style="max-height:25px" src="/assets/media/favicons/favw.png"/>
            {{ siteName }}
          </span>
              </span>
        </router-link>
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
              <li v-if="permissions.shareholder" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/shareholders/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-circle-dot"></i>
                    سهامداران
                  </span>
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
                  <span class="nav-main-link-name">
                    <i class="fa fa-boxes"></i>
                    فهرست کالاها</span>
                  <router-link to="/acc/commodity/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/commodity/cat/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-tree"></i>
                    دسته‌بندی‌ها</span>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/commodity/drop/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-droplet"></i>
                    ویژگی‌های کالا</span>
                  <router-link to="/acc/commodity/drop/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
              </li>
            </ul>
          </li>
          <li v-show="permissions.bank || permissions.cashdesk || permissions.salary || permissions.bankTransfer" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-bank"></i>
              <span class="nav-main-link-name">بانکداری</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.bank" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/banks/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-bank"></i>
                    حساب‌های بانکی</span>
                  <router-link to="/acc/banks/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
              <li v-if="permissions.cashdesk" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/cashdesk/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-money-bill-wheat"></i>
                    صندوق‌ها</span>
                  <router-link to="/acc/cashdesk/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
              <li v-if="permissions.salary" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/salary/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-circle-dot"></i>
                    تنخواه‌گردان‌ها</span>
                  <router-link to="/acc/salary/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </RouterLink>
              </li>
              <li v-if="permissions.cheque" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/cheque/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-money-check-dollar"></i>
                    مدیریت چک‌ها</span>
                </RouterLink>
              </li>
              <li v-if="permissions.wallet" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/wallet/view">
                  <span class="nav-main-link-name">
                    <i class="fa fa-wallet"></i>
                    کیف پول</span>
                </RouterLink>
              </li>
              <li v-if="permissions.bankTransfer" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/transfer/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-circle-dot"></i>
                    انتقال
                  </span>
                  <RouterLink to="/acc/transfer/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li v-show="permissions.store" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-boxes-stacked"></i>
              <span class="nav-main-link-name">انبارداری</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/storeroom/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-boxes"></i>
                    انبارها</span>
                  <router-link to="/acc/storeroom/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/storeroom/tickets/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-file-export"></i>
                    حواله انبار</span>
                  <router-link to="/acc/storeroom/new/ticket/type" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
              </li>
              <li class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/storeroom/commodity/check/exist">
                  <span class="nav-main-link-name">
                    <i class="fa fa-box-tissue"></i>
                    موجودی کالا</span>
                </router-link>
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
                <!-- <router-link class="nav-main-link" to="/acc/buy/rfb/list/">
                  <span class="nav-main-link-name"> فاکتورهای برگشت از خرید</span>
                  <router-link to="/acc/buy/rfb/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link> -->
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
                <router-link class="nav-main-link" to="/acc/sell/fast-mod/">
                  <i class="fa fa-car nav-main-link-icon"></i>
                  <span class="nav-main-link-name"> فاکتور سریع</span>
                </router-link>
              </li>
              <li v-if="permissions.sell" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/sell/list/">
                  <span class="nav-main-link-name"> فاکتورهای فروش</span>
                  <router-link to="/acc/sell/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
                </router-link>
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
                  <router-link to="/acc/sell/mod/" class="nav-main-link-badge badge rounded-pill bg-primary">+</router-link>
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
              <li v-if="permissions.getpay" class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/persons/send/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-circle-dot"></i>
                    بستن سال مالی
                  </span>
                </RouterLink>
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
          <li class="nav-main-heading">سرویس‌ها</li>
          <li class="nav-main-item">
            <li v-if="permissions.owner" class="nav-main-link-name">
              <router-link class="nav-main-link" to="/acc/sms/panel">
                <i class="nav-main-link-icon fa fa-message"></i>
                <span class="nav-main-link-name">
                    سرویس پیامک
                  </span>
              </router-link>
            </li>
          </li>
          <li v-show="permissions.owner || permissions.archiveUpload || permissions.archiveMod || permissions.archiveDelete" class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-folder-tree"></i>
              <span class="nav-main-link-name">فضای ذخیره‌سازی</span>
            </a>
            <ul class="nav-main-submenu">
              <li v-if="permissions.archiveUpload || permissions.archiveMod || permissions.archiveDelete" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/archive/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-folder-tree"></i>
                    آرشیو فایل‌ها </span>
                </router-link>
              </li>
              <li v-if="permissions.owner" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/archive/order/new">
                  <span class="nav-main-link-name">
                    <i class="fa fa-shopping-bag"></i>
                    سفارش  </span>
                </router-link>
              </li>
              <li v-if="permissions.owner" class="nav-main-item">
                <router-link class="nav-main-link" to="/acc/archive/order/list">
                  <span class="nav-main-link-name">
                    <i class="fa fa-list-dots"></i>
                    سوابق خرید
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
    <div class="content-header bg-header-dark text-white">
      <!-- Left Section -->
      <div>
        <!-- Toggle Sidebar -->
        <!-- Layout API, functionality initialized in Template._uiApiLayout()-->
        <button class="btn-sm btn btn-alt-info me-1" data-action="sidebar_toggle" data-toggle="layout" type="button">
          <i class="fa fa-fw fa-bars"></i>
        </button>
        <!-- END Toggle Sidebar -->
        <b class="ms-3 text-light">
          <i class="fa fa-shop"></i>
          {{this.business.name}}
        </b>
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div>
        <notification />

        <div class="dropdown d-inline-block">
          <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm me-1 btn-alt-secondary" data-bs-toggle="dropdown" id="page-header-service-dropdown" type="button">
            <i class="fa fa-fw fa-cogs mx-1"></i>
            <span class="d-none d-sm-inline-block">سرویس‌ها</span>
            <i class="fa fa-fw fa-angle-down opacity-50 ms-1 d-none d-sm-inline-block"></i>
          </button>
          <div aria-labelledby="page-header-service-dropdown" class="dropdown-menu dropdown-menu-end p-0" style="width:20rem">
            <div class="bg-primary-dark rounded-top fw-semibold text-white text-center p-3"> سرویس‌ها </div>
            <div class="row p-1">
              <div class="col-12">
                <archive_modal />
              </div>
              <div class="col-12">
                <hr>
                <smsPanel />
              </div>
            </div>
          </div>
        </div>
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
                <i class="far fa-fw fa-arrow-alt-circle-left me-1"></i> خروج از حساب </button>
            </div>
          </div>
        </div>
        <!-- END User Dropdown -->
        <button class="btn btn-sm btn-alt-secondary" data-action="side_overlay_toggle" data-toggle="layout" type="button">
          <i class="far fa-fw fa-list-alt"></i>
        </button>
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

  .node-wrapper{
    border-radius: 12px;
  }

  .content-header{
    height:2.8rem;
  }
  #page-container.page-header-fixed #main-container {
    padding-top: 2.6rem;
  }

  .vpd-addon-list-item[disabled="false"]{
    opacity: 1!important;;
  }

  .vpd-day[disabled] .vpd-day-text{
    opacity: 1!important;
    color:rgb(12, 26, 10) !important;
  }
</style>
