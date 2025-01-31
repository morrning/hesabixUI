<template>
    <v-toolbar color="toolbar" :title="$t('dialog.explore_accounts')">

    </v-toolbar>
    <v-container class="pa-0 ma-0">
        <v-card :loading="loading ? 'red' : null" :disabled="loading">
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-breadcrumbs :items="tree" class="m-0 p-0">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-family-tree" color="primary" class="me-3"></v-icon>
                            </template>
                            <template v-slot:title="{ item }">
                                <v-btn density="compact" @click="loadNode(item.id, 'calc', item.hasChild)"
                                    color="info">{{
                                        item.name
                                    }}</v-btn>
                            </template>
                        </v-breadcrumbs>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text class="mt-0 pt-0 px-0">
                <EasyDataTable table-class-name="customize-table ma-1 pa-1" :table-class-name="tableClassName"
                    multi-sort show-index alternating :headers="headers" :items="items" theme-color="#1d90ff"
                    header-text-direction="center" body-text-direction="center" rowsPerPageMessage="تعداد سطر"
                    emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از" :loading="loading">
                    <template #item-operation="{ id, type, isObject, upperID }">
                        <DetailsBtn :node="id" :nodeType="type" :isObject="isObject" :upperID="upperID"></DetailsBtn>
                    </template>
                    <template #item-account="{ hasChild, type, isObject, code, account, id }">
                        <v-btn color="primary"
                            :readonly="(hasChild == false && isObject == true) || (hasChild == false && type == 'calc')"
                            block variant="text" :text="account" @click="loadNode(id, type, hasChild)"></v-btn>
                    </template>
                    <template #item-bal_bd="{ bal_bd }">
                        {{ this.$filters.formatNumber(bal_bd) }}
                    </template>
                    <template #item-bal_bs="{ bal_bs }">
                        {{ this.$filters.formatNumber(bal_bs) }}
                    </template>
                    <template #item-his_bd="{ his_bd }">
                        {{ this.$filters.formatNumber(his_bd) }}
                    </template>
                    <template #item-his_bs="{ his_bs }">
                        {{ this.$filters.formatNumber(his_bs) }}
                    </template>
                </EasyDataTable>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
import DetailsBtn from '../component/reports/detailsBtn.vue';

export default {
    name: "explore_accounts",
    data() {
        return {
            loading: false,
            plugins: [],
            tree: [],
            itemsSelected: [],
            items: [],
            headers: [
                { text: "حساب", value: "account", sortable: true },
                { text: "گردش بدهکار", value: "his_bd", sortable: true, width: 100 },
                { text: "گردش بستانکار", value: "his_bs", sortable: true, width: 100 },
                { text: "تراز بدهکار", value: "bal_bd", sortable: true, width: 100 },
                { text: "تراز بستانکار", value: "bal_bs", sortable: true, width: 100 },
                { text: "عملیات", value: "operation", width: 100 },
            ]
        }
    },
    methods: {
        loadData() {
            //get active plugins
            axios.post('/api/plugin/get/actives',).then((response) => {
                this.plugins = response.data;
            });
            this.loadNode('root', 'calc', true);
        },
        isPluginActive(plugName) {
            return this.plugins[plugName] !== undefined;
        },
        loadNode(id, type, hasChild) {
            this.loading = true;
            axios.post('/api/report/acc/explore_accounts_det', {
                node: id,
                type: type,
                hasChild: hasChild
            }).then((response) => {
                this.items = response.data.itemData;
                this.tree = response.data.tree;
                this.loading = false;
            });
        },
    },
    components: {
        DetailsBtn: DetailsBtn
    },
    mounted() {
        this.loadData();
    }
}
</script>

<style scoped></style>