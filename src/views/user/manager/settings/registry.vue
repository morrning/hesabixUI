<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "registry",
  data: () => ({
    loading: true,
    settings: {
      canRegister: true,
      canFreeAccounting: false,
      smsPrice: '0',
      cloudPricePerGb: '0',
      unlimitedPrice: '0',
      accountingDocPrice: '0',
      giftCredit: '0', // فیلد جدید برای اعتبار هدیه
      unlimitedDuration: [] as string[],
      smsAlertEnabled: false,
      smsAlertMobile: ''
    }
  }),
  methods: {
    loadData() {
      this.loading = true;
      axios.post('/api/admin/registry/settings/load')
        .then((response) => {
          if (response.data.result === 1) {
            const data = response.data.data;
            this.settings = {
              ...this.settings,
              canRegister: data.canRegister,
              canFreeAccounting: data.canFreeAccounting,
              smsPrice: this.formatNumber(data.smsPrice),
              cloudPricePerGb: this.formatNumber(data.cloudPricePerGb),
              unlimitedPrice: this.formatNumber(data.unlimitedPrice),
              accountingDocPrice: this.formatNumber(data.accountingDocPrice),
              giftCredit: this.formatNumber(data.giftCredit), // اضافه کردن به لود
              unlimitedDuration: data.unlimitedDuration,
              smsAlertEnabled: data.smsAlertEnabled,
              smsAlertMobile: data.smsAlertMobile
            };
            this.checkFreeAccounting();
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    submit() {
      if (!this.settings.canFreeAccounting) {
        const accountingDocPrice = this.parseNumber(this.settings.accountingDocPrice);
        const unlimitedPrice = this.parseNumber(this.settings.unlimitedPrice);

        if (accountingDocPrice <= 0) {
          Swal.fire({
            text: 'وقتی ثبت رایگان سند حسابداری غیرفعال است، قیمت هر سند حسابداری باید بزرگ‌تر از صفر باشد.',
            icon: 'error',
            confirmButtonText: 'قبول'
          });
          return;
        }

        if (unlimitedPrice <= 0) {
          Swal.fire({
            text: 'وقتی ثبت رایگان سند حسابداری غیرفعال است، قیمت هر ماه استفاده نامحدود باید بزرگ‌تر از صفر باشد.',
            icon: 'error',
            confirmButtonText: 'قبول'
          });
          return;
        }

        if (this.settings.unlimitedDuration.length === 0) {
          Swal.fire({
            text: 'وقتی ثبت رایگان سند حسابداری غیرفعال است، حداقل یکی از مدت زمان‌های بسته نامحدود باید انتخاب شود.',
            icon: 'error',
            confirmButtonText: 'قبول'
          });
          return;
        }
      }

      this.loading = true;
      const submitData = {
        ...this.settings,
        smsPrice: this.parseNumber(this.settings.smsPrice),
        cloudPricePerGb: this.parseNumber(this.settings.cloudPricePerGb),
        unlimitedPrice: this.parseNumber(this.settings.unlimitedPrice),
        accountingDocPrice: this.parseNumber(this.settings.accountingDocPrice),
        giftCredit: this.parseNumber(this.settings.giftCredit) // اضافه کردن به دیتای ارسالی
      };

      axios.post('/api/admin/registry/settings/save', submitData)
        .then((resp) => {
          this.loading = false;
          if (resp.data.result === 1) {
            Swal.fire({
              text: 'تنظیمات با موفقیت ذخیره شد.',
              icon: 'success',
              confirmButtonText: 'قبول',
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    formatNumber(value: number | string): string {
      const cleanValue = value.toString().replace(/[^0-9]/g, '');
      return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '0';
    },
    parseNumber(value: string): number {
      return Number(value.replace(/,/g, '')) || 0;
    },
    handleInput(field: keyof typeof this.settings, value: string) {
      this.settings[field] = this.formatNumber(value);
    },
    checkFreeAccounting() {
      if (this.settings.canFreeAccounting) {
        this.settings.accountingDocPrice = '0';
        this.settings.unlimitedPrice = '0';
        this.settings.unlimitedDuration = [];
      }
    }
  },
  watch: {
    'settings.canFreeAccounting'(newValue) {
      this.checkFreeAccounting();
    }
  },
  beforeMount() {
    this.loadData();
  }
});
</script>

<template>
  <v-toolbar color="toolbar" :title="$t('pages.manager.system_settings_registry')">
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-container class="pa-0">
    <v-card :loading="loading ? 'red' : undefined" :disabled="loading">
      <v-card-text>
        <v-row class="mb-2">
          <v-col cols="12" sm="6">
            <v-switch v-model="settings.canRegister" label="فعال بودن ثبت‌نام کاربران جدید" color="primary"></v-switch>
          </v-col>
          <v-col cols="12" sm="6">
            <v-switch v-model="settings.canFreeAccounting" label="فعال بودن ثبت رایگان سند حسابداری"
              color="primary"></v-switch>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field v-model="settings.smsPrice" label="قیمت هر پیامک (ریال)" type="text"
              @input="handleInput('smsPrice', $event.target.value)" prefix="₽"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field v-model="settings.cloudPricePerGb" label="قیمت هر گیگ/ماه فضای ابری (ریال)" type="text"
              @input="handleInput('cloudPricePerGb', $event.target.value)" prefix="₽"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="settings.unlimitedPrice"
              label="قیمت هر ماه استفاده نامحدود (ریال)"
              type="text"
              @input="handleInput('unlimitedPrice', $event.target.value)"
              prefix="₽"
              :disabled="settings.canFreeAccounting"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="settings.accountingDocPrice"
              label="قیمت ثبت هر سند حسابداری (ریال)"
              type="text"
              @input="handleInput('accountingDocPrice', $event.target.value)"
              prefix="₽"
              :disabled="settings.canFreeAccounting"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="settings.giftCredit"
              label="اعتبار هدیه به کاربران جدید (ریال)"
              type="text"
              @input="handleInput('giftCredit', $event.target.value)"
              prefix="₽"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-card flat :disabled="settings.canFreeAccounting">
              <v-card-title>مدت زمان بسته‌های نامحدود</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-checkbox
                      v-model="settings.unlimitedDuration"
                      label="۱ ماه"
                      value="1"
                      :disabled="settings.canFreeAccounting"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-checkbox
                      v-model="settings.unlimitedDuration"
                      label="۳ ماه"
                      value="3"
                      :disabled="settings.canFreeAccounting"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-checkbox
                      v-model="settings.unlimitedDuration"
                      label="۶ ماه"
                      value="6"
                      :disabled="settings.canFreeAccounting"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-checkbox
                      v-model="settings.unlimitedDuration"
                      label="۱ سال"
                      value="12"
                      :disabled="settings.canFreeAccounting"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-row align="center">
              <v-col cols="4">
                <v-switch v-model="settings.smsAlertEnabled" label="هشدار پیامکی" color="primary"></v-switch>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="settings.smsAlertMobile"
                  label="شماره موبایل پشتیبانی"
                  :disabled="!settings.smsAlertEnabled"
                  type="tel"
                  placeholder="09180000000"
                  ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-btn type="submit" @click="submit()" color="primary" prepend-icon="mdi-content-save" :loading="loading">
              {{ $t('dialog.save') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-text-field {
  margin-bottom: 16px;
}
</style>