<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { Money3 } from "v-money3";
import { defineComponent } from 'vue'
import Treeselect from 'vue3-treeselect'
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'
export default defineComponent({
    name: "quickAddCommodity",
    props: {
        code: String,
    },
    components: {
        Treeselect: Treeselect,
        Loading,
        Money3
    },
    data: () => {
        return {
            isLoading: false,
            units: '',
            data: {
                name: '',
                priceSell: 0,
                priceBuy: 0,
                des: '',
                unit: 'عدد',
                code: 0,
                khadamat: false,
                cat: null,
                orderPoint: 0,
                commodityCountCheck: false,
                minOrderCount: 1,
                dayLoading: 0,
                speedAccess: false
            },
            listCats: [],
            currencyConfig: {
                masked: false,
                prefix: '',
                suffix: 'ریال',
                thousands: ',',
                decimal: '.',
                precision: 0,
                disableNegative: false,
                disabled: false,
                min: 0,
                max: null,
                allowBlank: false,
                minimumNumberOfCharacters: 0,
                shouldRound: true,
                focusOnRight: false,
            },
        }
    },
    methods: {
        closeModal() {
            var genericModalEl = document.getElementById('addCommodityModal');
            var modal = bootstrap.Modal.getInstance(genericModalEl);
            if(modal){ modal.show(); }
            
            var genericModalE2 = document.getElementById('quickComodityAdd');
            var modal2 = bootstrap.Modal.getInstance(genericModalE2);
            modal2.hide();
        },
        loadData(id = '') {
            this.isLoading = true;
            axios.post('/api/commodity/units').then((response) => {
                this.units = response.data;
            });
            axios.post('/api/commodity/cat/get/line').then((response) => {
                this.listCats = response.data;
                this.data.cat = response.data[1]
            });
            this.isLoading = false;
        },
        save() {
            if (this.data.name.length === 0)
                Swal.fire({
                    text: 'نام کالا یا خدمات الزامی است.',
                    icon: 'error',
                    confirmButtonText: 'قبول'
                });
            else {
                this.isLoading = true;
                axios.post('/api/commodity/mod/' + this.data.code, this.data).then((response) => {
                    this.isLoading = false;
                    if (response.data.result == 2) {
                        Swal.fire({
                            text: 'قبلا ثبت شده است.',
                            icon: 'error',
                            confirmButtonText: 'قبول'
                        });
                    } else {
                        Swal.fire({
                            text: 'مشخصات کالا و خدمات ثبت شد.',
                            icon: 'success',
                            confirmButtonText: 'قبول'
                        }).then(() => {
                            this.closeModal();
                        });
                    }
                })
            }
        }
    },
    mounted() {
        this.loadData();
    },
})
</script>

<template>

    <!-- Modal -->
    <div class="modal modal-lg fade" id="quickComodityAdd" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="quickComodityAddLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary-light text-white">
                    <h1 class="modal-title fs-5" id="quickComodityAddLabel">
                        <i class="fa fa-box"></i>
                        افزودن کالا/خدمات جدید
                    </h1>
                    <div class="block-options">
                        <button @click="closeModal()" type="button" class="btn-close"></button>
                    </div>
                </div>
                <div class="modal-body">
                    <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false" />
                    <div class="container">
                        <div class="row py-3">
                            <div class="col-sm-12 col-md-12">
                                <div>
                                    <label class="me-4 text-primary">نوع کالا یا خدمات</label>
                                    <div class="form-check form-check-inline">
                                        <input v-model="this.data.khadamat" class="form-check-input" type="radio"
                                            value="true">
                                        <label class="form-check-label" for="inlineCheckbox1">خدمات</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input v-model="this.data.khadamat" class="form-check-input" type="radio"
                                            value="false">
                                        <label class="form-check-label" for="inlineCheckbox2">کالا و اقلام
                                            فیزیکی</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 mb-3">
                                <div class="space-y-2">
                                    <div class="form-check form-switch">
                                        <input v-model="this.data.speedAccess" class="form-check-input" type="checkbox">
                                        <label class="form-check-label">دسترسی سریع (در صدور فاکتور سریع فروش و سایر
                                            افزونه‌ها استفاده می شود)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-floating mb-4">
                                    <input v-model="data.name" class="form-control" type="text">
                                    <label class="form-label"><span class="text-danger">(لازم)</span> نام
                                        کالا/خدمات</label>
                                </div>
                                <div class="form-floating mb-4">
                                    <select v-model="data.unit" class="form-select">
                                        <option v-for="option in units" :key="option.name" :value="option.name">
                                            {{ option.name }}
                                        </option>
                                    </select>
                                    <label class="form-label">واحد شمارش</label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-floating mb-4">
                                    <money3 v-bind="currencyConfig" min=0 class="form-control"
                                        v-model="data.priceBuy" />
                                    <label class="form-label">قیمت خرید</label>
                                </div>
                                <div class="form-floating mb-4">
                                    <money3 v-bind="currencyConfig" min=0 class="form-control"
                                        v-model="data.priceSell" />
                                    <label class="form-label">قیمت فروش</label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 mb-4">
                                <small class="mb-2">دسته بندی</small>
                                <select class="form-select" aria-label="دسته‌بندی" v-model="this.data.cat">
                                    <option v-for="(item, index) in listCats" :value="item.id">{{ item.name }}</option>
                                </select>
                            </div>
                            <div class="col-sm-12 col-md-12">
                                <div class="form-floating mb-4">
                                    <input v-model="data.des" class="form-control" type="text">
                                    <label class="form-label">توضیحات</label>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12">
                                <b class="text-primary-dark me-3">موجودی کالا</b>
                                <label class="text-muted">تنظیمات بخش موجودی کالا تنها برای نوع کالا اعمال می‌شود و برای
                                    نوع خدمات نادیده گرفته می‌شود.</label>
                                <div class="space-y-2">
                                    <div class="form-check form-switch">
                                        <input v-model="data.commodityCountCheck" class="form-check-input"
                                            type="checkbox">
                                        <label class="form-check-label">کنترل موجودی</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-4 mt-2">
                                        <div class="form-floating mb-4">
                                            <input v-model="data.minOrderCount"
                                                @blur="(event) => { if (this.data.minOrderCount === '' || this.data.minOrderCount === 0) { this.data.minOrderCount = 1 } }"
                                                @keypress="this.$filters.onlyNumber($event)" class="form-control"
                                                type="number" min="1">
                                            <label class="form-label">حداقل سفارش</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-4 mt-2">
                                        <div class="form-floating mb-4">
                                            <input v-model="data.orderPoint"
                                                @keypress="this.$filters.onlyNumber($event)" class="form-control"
                                                type="number" min="1">
                                            <label class="form-label">نقطه سفارش</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-4 mt-2">
                                        <div class="form-floating mb-4">
                                            <input v-model="data.dayLoading"
                                                @keypress="this.$filters.onlyNumber($event)" class="form-control"
                                                type="number">
                                            <label class="form-label">زمان انتظار(روز)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="save()" type="button" class="btn btn-alt-primary">
                        <i class="fa fa-floppy-disk"></i>
                        ثبت</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>