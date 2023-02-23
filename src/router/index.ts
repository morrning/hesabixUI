import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from "axios";
var app_permissions = {
  isLogedIn: false
};

async function app_load_permissions(){
  axios.post( 'api/user/get/permissions')
      .then(function (response) {
        app_permissions.isLogedIn = true;
      })
      .catch(function (error) {
        app_permissions.isLogedIn=false;
      });
  return app_permissions;
}

app_load_permissions().then((app_permissions)=>{

})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        'title':'نرم‌افزار حسابداری آنلاین و ابری حسابیکس کاملا رایگان'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta:{
        'title':'درباره ما'
      }
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: () => import('../views/ConnectView.vue'),
      meta:{
        'title':'تماس با ما'
      }
    },
    {
      path: '/open-source',
      name: 'opensource',
      component: () => import('../views/opensource.vue'),
      meta:{
        'title':'متن‌باز چیست'
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/terms.vue'),
      meta:{
        'title':'قوانین ارائه خدمات'
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/privacy-policy.vue'),
      meta:{
        'title':'سیاست حفظ اطلاعات و محرمانگی اطلاعات کاربران'
      }
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FaqView.vue'),
      meta:{
        'title':'سوالات متداول'
      }
    },
    {
      path: '/login',
      name: 'user_login',
      component: () => import('../views/user/login.vue'),
      beforeEnter: (to, from,next) => {
        if(app_permissions.isLogedIn == false){ next(); } else { next({ name: 'home' }) }
      },
      meta:{
        'title':'ورود به حسابیکس'
      }
    },
    {
      path: '/register',
      name: 'user_register',
      component: () => import('../views/user/register.vue'),
      beforeEnter: (to, from,next) => {
        if(app_permissions.isLogedIn == false){ next(); } else { next({ name: 'home' }) }
      },
      meta:{
        'title':'عضویت در حسابیکس'
      }
    },
    {
      path: '/user/profile/',
      component: () => import('../views/user/profile/base.vue'),
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'dashboard',
          component: () => import('../views/user/profile/dashboard.vue'),
          meta:{
            'title':'پروفایل کاربری'
          }
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'change-password',
          component: () => import('../views/user/profile/change-password.vue'),
          meta:{
            'title':'تغییر کلمه عبور'
          }
        }
      ],
    },
    {
      path: '/business/list',
      name: 'business_list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/business/list.vue'),
      meta:{
        'title':'فهرست کسب و کارها'
      }
    },
    {
      path: '/business/new',
      name: 'business_new',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/business/insert.vue'),
      meta:{
        'title':'ایجاد کسب و کار جدید'
      }
    },
    {
      path: '/guide/',
      component: () => import('../views/guide/base-part.vue'),
      children: [
        {
          path: 'content/:id',
          name: 'guide_show_content',
          component: () => import('../views/guide/show-content.vue'),
          meta:{
            'title':'راهنما و خود آموزها'
          }
        },{
          path: 'cat/:id',
          name: 'guide_show_cat',
          component: () => import('../views/guide/show-cat.vue'),
          meta:{
            'title':'فهرست بخش راهنما و خود آموزها'
          }
        },{
          path: 'insert',
          component: () => import('../views/guide/insert.vue'),
          meta:{
            'title':'افزودن راهنما و خودآموز'
          }
        },{
          path: 'edit/:id',
          name: 'guide_edit',
          component: () => import('../views/guide/edit.vue'),
          meta:{
            'title':'ویرایش راهنما و خودآموز'
          }
        }
      ],
    },
    {
      path: '/stack/',
      component: () => import('../views/stack/base-part.vue'),
      children: [
        {
          path: 'home/:cat?/:id',
          name: 'stack_home',
          component: () => import('../views/stack/home.vue'),
          meta:{
            'title':'پرسش و پاسخ'
          }
        },{
          path: 'content/:id',
          name: 'stack_show_content',
          component: () => import('../views/stack/show-content.vue'),
          meta:{
            'title':'مشاهده پرسش'
          }
        },{
          path: 'edit/:id',
          name: 'stack_edit_content',
          component: () => import('../views/stack/components/edit.vue'),
          meta:{
            'title':'ویرایش محتوا'
          }
        },{
          path: 'editreplay/:id',
          name: 'stack_edit_replay',
          component: () => import('../views/stack/components/editReplay.vue'),
          meta:{
            'title':'ویرایش پاسخ'
          }
        },
        {
          path: 'insert',
          name: 'stack_insert',
          component: () => import('../views/stack/insert.vue'),
          meta:{
            'title':'موضوع جدید'
          }
        }
      ],
    },
    {
      path: '/blog/',
      component: () => import('../views/blog/base-part.vue'),
      children: [
        {
          path: 'home/:id',
          name: 'blog_home',
          component: () => import('../views/blog/home.vue'),
          meta:{
            'title':'وبلاگ حسابیکس'
          }
        },{
          path: 'post/:id',
          name: 'blog_post',
          component: () => import('../views/blog/post.vue'),
          meta:{
            'title':'مشاهده موضوع وبلاگ'
          }
        },
      ],
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = <string>to.meta.title;
  if(to.path.includes('/user/') && app_permissions.isLogedIn == false){
    next({ name: 'user_login' })
  }
  else {
    next()
  }
})
export default router
