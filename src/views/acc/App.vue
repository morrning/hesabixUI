<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import Swal from "sweetalert2";

import { getApiUrl, getSiteName } from "@/hesabixConfig"
import { ref } from 'vue';
import Profile_btn from '@/components/application/buttons/profile_btn.vue';
import Notifications_btn from '@/components/application/buttons/notifications_btn.vue';
import Year_cob from '@/components/application/combobox/year_cob.vue';
import Currency_cob from '@/components/application/combobox/currency_cob.vue';
import "/public/dashmix/dashmix.min.css"

export default {

  data() {
    return {
      drawer: ref(null),
      plugins: [],
      business: {
        id: '',
        name: ''
      },
      timeNow: '',
      apiUrl: '',
      permissions: {

      }
    }
  },
  watch: {

  },
  mounted() {
    //get active plugins
    axios.post('/api/plugin/get/actives',).then((response) => {
      this.plugins = response.data;
    });
    axios.post('/api/business/list/count')
      .then((response) => {
        this.business_count = response.data.count;
      });
    axios.post('/api/business/get/user/permissions').then((response) => {
      this.permissions = response.data;
    });
    axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
      this.business = response.data;
    });
    axios.post('/api/general/get/time').then((response) => {
      this.timeNow = response.data.timeNow;
    });
    this.apiUrl = getApiUrl();
  },
  created() {
    this.siteName = getSiteName();
  },
  methods: {
    deleteBusiness() {
      Swal.fire({
        text: 'آیا برای حذف این کسب‌و‌کار مطمئن هستید؟ بعد از تایید این عملیات کسب و کار شما به مدت یک ماه در پایگاه داده آرشیو و بعد از آن به صورت دائم حذف خواهد شد',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/delete').then((response) => {
            if (response.data.code == 0) {
              Swal.fire({
                text: 'کسب و کار با موفقیت حذف شد. به پروفایل کاربری باز می گردید.',
                icon: 'success',
                confirmButtonText: 'قبول'
              }).then((res) => {
                document.location = '/';
              });
            }
          })
        }
      })
    },
    exitBusiness() {
      Swal.fire({
        text: 'آیا برای خروج و ترک کسب‌و‌کار مطمئن هستید؟ ترک کسب و کار موجب قطع دسترسی شما خواهد شد و تنها از طریق مالک کسب‌و‌کار قابل بازیابی است.',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon: 'warning'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/removeuser/me').then((response) => {
            if (response.data.result == 1) {
              Swal.fire({
                text: 'عملیات با موفقیت انجام شد. به صفحه پروفایل کاربری باز می گردید.',
                icon: 'success',
                confirmButtonText: 'قبول'
              }).then((res) => {
                document.location = '/';
              });
            }
          })
        }
      })

    },
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
  },
  components: {
    Profile_btn: Profile_btn,
    Notifications_btn: Notifications_btn,
    Year_cob: Year_cob,
    Currency_cob: Currency_cob
  }
}
</script>

<template>
  <v-system-bar color="primaryLight2">
    <v-avatar image="/img/logo-blue.png" size="20" class="me-2 d-none d-sm-flex" />
    <span class="d-none d-sm-flex">{{ $t('hesabix.banner') }}</span>
    <v-avatar :image="apiUrl + '/front/avatar/file/get/' + business.id" size="20" class="me-2 d-flex d-sm-none" />
    <span class="d-flex d-sm-none">{{ business.name }}</span>
    <v-spacer />
  </v-system-bar>
  <v-navigation-drawer v-model="drawer" :width="280">
    <v-card height="64" rounded="0" prepend-icon="mdi-account">
      <template v-slot:title>
        {{ $t('app.name') }}
      </template>
      <template v-slot:prepend>
        <v-avatar class="d-none d-sm-flex" :image="apiUrl + '/front/avatar/file/get/' + business.id" />
        <v-avatar class="d-flex d-sm-none" image="/img/favw.png" />
      </template>
    </v-card>
    <v-list class="px-0 pt-0">
      <v-list-item to="/acc/dashboard">
        <template v-slot:prepend>
          <v-icon icon="mdi-view-dashboard"></v-icon>
        </template>
        <v-list-item-title v-text="$t('drawer.dashboard')" />
      </v-list-item>
      <v-list-subheader>{{ $t('drawer.basic_tools') }}</v-list-subheader>
      <v-list-group v-show="permissions.getpay || permissions.persons">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-account-multiple"
            :title="$t('drawer.persons')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.persons" to="/acc/persons/list" :title="$t('drawer.persons')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/persons/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.getpay" to="/acc/persons/receive/list" :title="$t('drawer.gets')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/persons/receive/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.getpay" to="/acc/persons/send/list" :title="$t('drawer.pays')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/persons/send/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.shareholder" to="/acc/shareholders/list" :title="$t('drawer.shareholders')">
        </v-list-item>
      </v-list-group>
      <v-list-group v-show="permissions.commodity">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-package-variant"
            :title="$t('drawer.commodity')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.commodity" to="/acc/commodity/list" :title="$t('drawer.commodity')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/commodity/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.commodity && this.isPluginActive('accpro')" to="/acc/commodity/pricelist/list"
          :title="$t('drawer.price_lists')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain"
                  to="/acc/commodity/pricelist/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.commodity" to="/acc/commodity/cat/list" :title="$t('drawer.cats')">
        </v-list-item>
        <v-list-item v-if="permissions.commodity" to="/acc/commodity/drop/list" :title="$t('drawer.drops_list')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/commodity/drop/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
      </v-list-group>
      <v-list-group
        v-show="permissions.bank || permissions.wallet || permissions.cashdesk || permissions.salary || permissions.cheque || permissions.bankTransfer">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-bank"
            :title="$t('drawer.bank_label')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.bank" to="/acc/banks/list" :title="$t('drawer.banks_accounts')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/banks/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.cashdesk" to="/acc/cashdesk/list" :title="$t('drawer.cashdesks')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/cashdesk/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.salary" to="/acc/salary/list" :title="$t('drawer.salarys')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/salary/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.cheque" to="/acc/cheque/list" :title="$t('drawer.cheques')">
        </v-list-item>
        <v-list-item v-if="permissions.bankTransfer" to="/acc/transfer/list" :title="$t('drawer.transfers')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/transfer/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.wallet" to="/acc/wallet/view" :title="$t('static.wallet')">
        </v-list-item>
      </v-list-group>
      <v-list-subheader>{{ $t('drawer.acc_store_tools') }}</v-list-subheader>
      <v-list-group v-show="permissions.store">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-store"
            :title="$t('drawer.storeroom_title')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.store" to="/acc/storeroom/list" :title="$t('drawer.storerooms')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/storeroom/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.store" to="/acc/storeroom/tickets/list" :title="$t('drawer.storeroom_ticket')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain"
                  to="/acc/storeroom/new/ticket/type" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.store" to="/acc/storeroom/commodity/check/exist"
          :title="$t('drawer.commodity_exist_count')" />
      </v-list-group>
      <v-list-group v-show="permissions.buy || permissions.cost || permissions.plugAccproRfbuy">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-cash-fast"
            :title="$t('drawer.buy_cost')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.buy" to="/acc/buy/list" :title="$t('drawer.buy_invoices')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/buy/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.plugAccproRfbuy && this.isPluginActive('accpro')" to="/acc/rfbuy/list"
          :title="$t('drawer.rfbuy_invoices')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/rfbuy/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.cost" to="/acc/costs/list" :title="$t('drawer.costs')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/costs/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
      </v-list-group>
      <v-list-group v-show="permissions.sell || permissions.income || permissions.plugAccproRfsell">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-cart-arrow-down"
            :title="$t('drawer.sell_income')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.sell" to="/acc/sell/fast-mod" :title="$t('drawer.fast_sell')">
        </v-list-item>
        <v-list-item v-if="permissions.sell" to="/acc/sell/list" :title="$t('drawer.sell_invoices')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/sell/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="this.isPluginActive('accpro') && permissions.sell" to="/acc/presell/list"
          :title="$t('drawer.presells')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/presell/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.plugAccproRfsell && this.isPluginActive('accpro')" to="/acc/rfsell/list"
          :title="$t('drawer.rfsell_invoices')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/rfsell/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item v-if="permissions.income" to="/acc/incomes/list" :title="$t('drawer.incomes')">
          <template v-slot:append="{ props }">
            <v-tooltip :text="$t('dialog.add_new')" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="sm" icon="mdi-plus-box" variant="plain" to="/acc/incomes/mod/" />
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
      </v-list-group>
      <v-list-group v-show="permissions.accounting || permissions.plugAccproCloseYear">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-file-document-multiple"
            :title="$t('drawer.accounting')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.accounting" to="/acc/accounting/list" :title="$t('drawer.accounting_docs')" />
        <v-list-item v-if="permissions.accounting" to="/acc/accounting/table" :title="$t('drawer.accounting_table')" />
        <v-list-item v-if="permissions.plugAccproCloseYear && this.isPluginActive('accpro')" to="/acc/accounting/close_year"
          :title="$t('drawer.close_year')">
        </v-list-item>
      </v-list-group>
      <v-list-item to="/acc/reports/list">
        <template v-slot:prepend>
          <v-icon icon="mdi-poll"></v-icon>
        </template>
        <v-list-item-title v-text="$t('drawer.reports')" />
      </v-list-item>
      <v-list-subheader>{{ $t('drawer.settings') }}</v-list-subheader>
      <v-list-group v-show="permissions.settings || permissions.log || permissions.permission">
        <template v-slot:activator="{ props }">
          <v-list-item class="text-dark" v-bind="props" prepend-icon="mdi-cogs"
            :title="$t('drawer.settings')"></v-list-item>
        </template>
        <v-list-item v-if="permissions.settings" to="/acc/business/settings" :title="$t('drawer.bid_settings')" />
        <v-list-item v-if="permissions.settings" to="/acc/business/printoptions" :title="$t('drawer.print_settings')" />
        <v-list-item  v-if="permissions.settings && this.isPluginActive('accpro')" to="/acc/business/avatar"
          :title="$t('drawer.avatar_settings')">
        </v-list-item>
        <v-list-item  v-if="permissions.permission" to="/acc/business/users"
          :title="$t('drawer.user_perms')">
        </v-list-item>
        <v-list-item  v-if="permissions.owner" to="/acc/business/apis"
          :title="$t('drawer.tokens')">
        </v-list-item>
        <v-list-item  v-if="permissions.settings && this.isPluginActive('accpro')" to="/acc/business/extramoneys"
          :title="$t('drawer.extra_moneys')">
        </v-list-item>
        <v-list-item  v-if="permissions.log" to="/acc/business/logs"
          :title="$t('drawer.history')">
        </v-list-item>
        <v-list-item class="text-danger"  v-if="permissions.owner" @click="deleteBusiness()"
          :title="$t('drawer.bid_delete')">
        </v-list-item>
      </v-list-group>
      <v-list-subheader>{{ $t('drawer.services') }}</v-list-subheader>

      <v-list-item class="text-dark" v-if="permissions.owner == 0" @click="exitBusiness()">
        <template v-slot:prepend>
          <v-icon color="danger" icon="mdi-logout"></v-icon>
        </template>
        <v-list-item-title class="text-danger" v-text="$t('drawer.exit_bus')" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar scroll-behavior="inverted elevate" scroll-threshold="0">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <span class="d-none d-sm-flex">{{ business.name }}</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-bottom-sheet inset>
      <template v-slot:activator="{ props }">
        <v-btn stacked v-bind="props">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-card :subtitle="$t('dialog.fiscal_settings_info')" prepend-icon="mdi-cog"
        :title="$t('dialog.fiscal_settings')">
        <v-card-text>
          <v-row class="text-center">
            <v-col cols="12" sm="12" md="6">
              <Year_cob />
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <Currency_cob />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <Notifications_btn />
    <Profile_btn />
  </v-app-bar>
  <v-main class="bg-surface-light">
    <div class="position-relative py-1 px-1">
      <RouterView />
    </div>
  </v-main>

</template>

<style global></style>
