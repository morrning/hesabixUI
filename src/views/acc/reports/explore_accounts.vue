<template>
    <v-toolbar color="toolbar" :title="$t('dialog.explore_accounts')">

    </v-toolbar>
    <v-container class="pa-0 ma-0">
        <v-card :loading="loading ? 'red' : null" :disabled="loading">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-date-input prepend-icon="" prepend-inner-icon="$calendar" v-model="repData.dateStart"
                            hide-details="auto" :label="$t('dialog.date_start')"></v-date-input>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-date-input prepend-icon="" prepend-inner-icon="$calendar" v-model="repData.dateEnd"
                            hide-details="auto" :label="$t('dialog.date_end')"></v-date-input>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <EasyDataTable table-class-name="customize-table ma-1 pa-1" :table-class-name="tableClassName"
            v-model:items-selected="itemsSelected" multi-sort show-index alternating
            :headers="headers" :items="items" theme-color="#1d90ff" header-text-direction="center"
            body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
            rowsOfPageSeparatorMessage="از" :loading="loading">
            <template #item-operation="{ code }">
                <v-btn color="primary" size="xs" variant="plain" icon="mdi-magnify"></v-btn>
            </template>
            <template #item-account="{ hasChild, code, account ,id}">
                <v-btn color="primary" :readonly="hasChild == false" block variant="text" :text="account" @click="repData.node = id"></v-btn>
            </template>
        </EasyDataTable>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: "explore_accounts",
    data() {
        return {
            loading: false,
            plugins: [],
            repData: {
                dateStart: null,
                dateEnd: null,
                node: 'root',
                subnode: 'root',
            },
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
            axios.post('/api/report/acc/explore_accounts', this.repData).then((response) => {
                this.items = response.data;
                console.log(this.items);
            });
        },
        isPluginActive(plugName) {
            return this.plugins[plugName] !== undefined;
        },
        loadNode() {
            this.loading = true;
            axios.post('/api/report/acc/explore_accounts', this.repData).then((response) => {
                this.items = response.data;
                this.loading = false;
            });
        },
    },
    watch: {
        repData: {
            handler: function (val, oldVal) {
                this.loadNode();
            },
            deep: true
        },
    },
    mounted() {
        this.loadData();
    }
}
</script>

<style scoped></style>