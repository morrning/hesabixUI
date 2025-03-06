<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>{{ $t('updateSoftware.title') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn :color="buttonColor" :loading="isUpdating" :disabled="isUpdating || status === 'running'"
                @click="startUpdate" class="">
                {{ buttonText }}
            </v-btn>
        </v-toolbar>

        <!-- کارت لاگ -->
        <v-card v-if="showOutput || output.trim() !== ''" class="mt-1">
            <v-toolbar flat color="white">
                <v-toolbar-title>{{ $t('updateSoftware.progressTitle') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="copyToClipboard">
                    <v-icon>mdi-content-copy</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <pre class="output-pre" ref="outputPre">{{ output }}</pre>
            </v-card-text>
        </v-card>

        <!-- کارت اطلاعات -->
        <v-card class="mt-1">
            <v-card-title>{{ $t('updateSoftware.infoTitle') }}</v-card-title>
            <v-card-text>
                <p>{{ $t('updateSoftware.infoDescription') }}</p>
                <p>{{ $t('updateSoftware.safetyTips') }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.currentCommit') }}:</span> {{
                    currentCommit }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.targetCommit') }}:</span> {{
                    targetCommit }}</p>
                <v-divider class="my-2"></v-divider>
                <p>{{ $t('updateSoftware.systemInfoTitle') }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.osName') }}:</span> {{
                    systemInfo.osName }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.osRelease') }}:</span> {{
                    systemInfo.osRelease }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.osVersion') }}:</span> {{
                    systemInfo.osVersion }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.osMachine') }}:</span> {{
                    systemInfo.osMachine }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.cpuInfo ') }}:</span> {{
                    systemInfo.cpuInfo }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.distroName') }}:</span> {{
                    systemInfo.distroName }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.distroVersion') }}:</span> {{
                    systemInfo.distroVersion }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.webServer') }}:</span> {{
                    systemInfo.webServer }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.dbName') }}:</span> {{
                    systemInfo.dbName }}</p>
                <p><span class="font-weight-bold primary--text">{{ $t('updateSoftware.dbVersion') }}:</span> {{
                    systemInfo.dbVersion }}</p>
            </v-card-text>
        </v-card>

        <!-- دیالوگ نتیجه -->
        <v-dialog v-model="showResultDialog" max-width="400">
            <v-card>
                <v-card-title :class="dialogColor + '--text'">
                    {{ dialogTitle }}
                </v-card-title>
                <v-card-text>
                    {{ dialogMessage }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="showResultDialog = false">
                        {{ $t('updateSoftware.closeDialog') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import axios from 'axios';

export default {
    name: 'UpdateSoftware',
    setup() {
        const isUpdating = ref(false);
        const showOutput = ref(false);
        const output = ref('');
        const buttonText = ref('');
        const buttonColor = ref('primary');
        const status = ref('idle');
        const updateUuid = ref(null);
        const outputPre = ref(null);
        const currentCommit = ref('unknown');
        const targetCommit = ref('unknown');
        const systemInfo = ref({
            osName: 'unknown',
            osRelease: 'unknown',
            osVersion: 'unknown',
            osMachine: 'unknown',
            cpuInfo: 'unknown',
            distroName: 'unknown',
            distroVersion: 'unknown',
            webServer: 'unknown',
            dbName: 'unknown',
            dbVersion: 'unknown',
        });
        const showResultDialog = ref(false);
        const dialogTitle = ref('');
        const dialogMessage = ref('');
        const dialogColor = ref('');
        let statusInterval = null;

        const fetchCommits = async () => {
            try {
                const response = await axios.get('/api/admin/updatecore/commits', {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                currentCommit.value = response.data.currentCommit || 'unknown';
                targetCommit.value = response.data.targetCommit || 'unknown';
            } catch (error) {
                console.error('Failed to fetch commits:', error);
                currentCommit.value = 'خطا در دریافت';
                targetCommit.value = 'خطا در دریافت';
            }
        };

        const fetchSystemInfo = async () => {
            try {
                const response = await axios.get('/api/admin/updatecore/system-info', {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                systemInfo.value = {
                    osName: response.data.osName || 'unknown',
                    osRelease: response.data.osRelease || 'unknown',
                    osVersion: response.data.osVersion || 'unknown',
                    osMachine: response.data.osMachine || 'unknown',
                    cpuInfo: response.data.cpuInfo || 'unknown',
                    distroName: response.data.distroName || 'unknown',
                    distroVersion: response.data.distroVersion || 'unknown',
                    webServer: response.data.webServer || 'unknown',
                    dbName: response.data.dbName || 'unknown',
                    dbVersion: response.data.dbVersion || 'unknown',
                };
            } catch (error) {
                console.error('Failed to fetch system info:', error);
                systemInfo.value = {
                    osName: 'خطا در دریافت',
                    osRelease: 'خطا در دریافت',
                    osVersion: 'خطا در دریافت',
                    osMachine: 'خطا در دریافت',
                    cpuInfo: 'خطا در دریافت',
                    distroName: 'خطا در دریافت',
                    distroVersion: 'خطا در دریافت',
                    webServer: 'خطا در دریافت',
                    dbName: 'خطا در دریافت',
                    dbVersion: 'خطا در دریافت',
                };
            }
        };

        return {
            isUpdating,
            showOutput,
            output,
            buttonText,
            buttonColor,
            status,
            updateUuid,
            outputPre,
            currentCommit,
            targetCommit,
            systemInfo,
            statusInterval,
            fetchCommits,
            fetchSystemInfo,
            showResultDialog,
            dialogTitle,
            dialogMessage,
            dialogColor,
        };
    },
    methods: {
        async startUpdate() {
            if (this.isUpdating || this.status === 'running') return;

            this.isUpdating = true;
            this.buttonText = this.$t('updateSoftware.updatingButton');
            this.buttonColor = 'primary';
            this.showOutput = true;
            this.output = this.$t('updateSoftware.startingMessage') + '\n';

            try {
                const response = await axios.post('/api/admin/updatecore/run', {}, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });

                console.log('Start response:', response.data);

                if (response.data.status === 'started') {
                    this.updateUuid = response.data.uuid;
                    this.output += this.$t('updateSoftware.startedMessage') + '\n';
                    this.checkStatus();
                } else if (response.data.status === 'error') {
                    this.output += '\n' + this.$t('updateSoftware.errorPrefix') + response.data.message;
                    this.buttonColor = 'error';
                    this.buttonText = this.$t('updateSoftware.failedButton');
                    this.isUpdating = false;
                    this.showResultDialog = true;
                    this.dialogTitle = this.$t('updateSoftware.dialogErrorTitle');
                    this.dialogMessage = this.$t('updateSoftware.dialogErrorSimpleMessage'); // پیام جدید
                    this.dialogColor = 'error';
                }
            } catch (error) {
                console.error('Start error:', error);
                this.output += '\n' + this.$t('updateSoftware.errorPrefix') + (error.response?.data?.message || error.message);
                this.buttonColor = 'error';
                this.buttonText = this.$t('updateSoftware.failedButton');
                this.isUpdating = false;
                this.showResultDialog = true;
                this.dialogTitle = this.$t('updateSoftware.dialogErrorTitle');
                this.dialogMessage = this.$t('updateSoftware.dialogErrorSimpleMessage'); // پیام جدید
                this.dialogColor = 'error';
            }
        },
        async checkStatus() {
            if (!this.updateUuid) return;

            try {
                const response = await axios.get('/api/admin/updatecore/status', {
                    params: { uuid: this.updateUuid },
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });

                console.log('Status response:', response.data);

                this.status = response.data.status;
                this.output = response.data.output || this.$t('updateSoftware.noOutputMessage') + '\n';

                await nextTick(() => {
                    if (this.$refs.outputPre) {
                        this.$refs.outputPre.scrollTop = this.$refs.outputPre.scrollHeight;
                    }
                });

                if (response.data.status === 'success') {
                    this.output += '\n' + this.$t('updateSoftware.successMessage');
                    this.buttonColor = 'success';
                    this.buttonText = this.$t('updateSoftware.completedButton');
                    this.isUpdating = false;
                    clearInterval(this.statusInterval);
                    this.showOutput = true;
                    this.showResultDialog = true;
                    this.dialogTitle = this.$t('updateSoftware.dialogSuccessTitle');
                    this.dialogMessage = this.$t('updateSoftware.successMessage');
                    this.dialogColor = 'success';
                } else if (response.data.status === 'error') {
                    this.output += '\n' + this.$t('updateSoftware.errorPrefix') + response.data.message;
                    this.buttonColor = 'error';
                    this.buttonText = this.$t('updateSoftware.failedButton');
                    this.isUpdating = false;
                    clearInterval(this.statusInterval);
                    this.showOutput = true;
                    this.showResultDialog = true;
                    this.dialogTitle = this.$t('updateSoftware.dialogErrorTitle');
                    this.dialogMessage = this.$t('updateSoftware.dialogErrorSimpleMessage'); // پیام جدید
                    this.dialogColor = 'error';
                } else if (response.data.status === 'running') {
                    this.isUpdating = true;
                    this.buttonText = this.$t('updateSoftware.updatingButton');
                    this.buttonColor = 'primary';
                    this.showOutput = true;
                }
            } catch (error) {
                console.error('Status error:', error);
                this.output += '\n' + this.$t('updateSoftware.errorPrefix') + error.message;
                this.buttonColor = 'error';
                this.buttonText = this.$t('updateSoftware.failedButton');
                this.isUpdating = false;
                clearInterval(this.statusInterval);
                this.showOutput = true;
                this.showResultDialog = true;
                this.dialogTitle = this.$t('updateSoftware.dialogErrorTitle');
                this.dialogMessage = this.$t('updateSoftware.dialogErrorSimpleMessage'); // پیام جدید
                this.dialogColor = 'error';
            }
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.output).then(() => {
                alert(this.$t('updateSoftware.copySuccess'));
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert(this.$t('updateSoftware.copyFailed'));
            });
        },
    },
    mounted() {
        console.log('Component mounted');
        this.fetchCommits();
        this.fetchSystemInfo();
        if (this.updateUuid) this.checkStatus();
        this.statusInterval = setInterval(this.checkStatus, 2000);
        this.buttonText = this.$t('updateSoftware.startButton');
    },
    beforeUnmount() {
        console.log('Component unmounted');
        clearInterval(this.statusInterval);
    },
};
</script>

<style scoped>
.output-pre {
    max-height: 400px;
    overflow-y: auto;
    white-space: pre-wrap;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
}
</style>