<template>
    1. change ntp server and resync on windows machine <strong>Open Adminstrator Powershell</strong>
    <div class="flex">
        <input type="text" class="form-control input" v-model="ntpServer"> 
        <button class="btn btn-dark" @click="generateChangeNtp">generate</button>
    </div>

    2. disable Windows Update
    <div>
        <button class="btn btn-dark" @click="disableWindowsUpdateHandler">generate</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { genPowershellForChangeNtpServer } from './powershell/changeNtpServer'
import { disableWindowsUpdate } from './powershell/disableWindowsUpdate';

const ntpServer = ref('ntp.aliyun.com')
function generateChangeNtp() {
    if (!ntpServer.value) {
        alert('please enter your ntp server url')
    }
    copyToClipboard(genPowershellForChangeNtpServer(ntpServer.value))
}

// TOOD be able to custom output
function copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('copied to clipboard!');
        })
        .catch((error) => {
            console.error('Failed to copy to clipboard: ', error);
        });
}

function disableWindowsUpdateHandler() {
    copyToClipboard(disableWindowsUpdate())
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    margin-right: 500px;
}

.input {
    margin-right: 20px;
}
</style>