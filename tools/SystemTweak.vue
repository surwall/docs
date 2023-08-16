<template>
    1. change ntp server and resync on windows machine <strong>Open Adminstrator Powershell</strong>
    <div class="flex">
        <input type="text" class="form-control input input-box" v-model="ntpServer"> 
        <button class="btn btn-dark" @click="generateChangeNtp">generate</button>
    </div>

    2. disable Windows Update
    <div>
        <button class="btn btn-dark" @click="disableWindowsUpdateHandler">generate</button>
    </div>

    3. generate shims for windows
    <div class="flex">
        <input type="text" class="input-box" placeholder="E:\apps\Code.exe" v-model="path">
        <input type="text" class="input-box" placeholder="code.exe" v-model="binName">
        <button @click="downloadShim">download shim</button>

    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { genPowershellForChangeNtpServer } from './powershell/changeNtpServer'
import { disableWindowsUpdate } from './powershell/disableWindowsUpdate';

const ntpServer = ref('ntp.aliyun.com')
const path = ref('')
const binName = ref('')
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

function downloadShim() {
    // read the binary data from shim.exe
    if (path.value.trim()) {
        if (!binName.value.endsWith('.exe')) {
            return alert('binName should end with .exe')
        }
        // let fileName = path.value + '.exe'
        let fileNameWithExtension = path.value.split('\\').pop();
        let link = document.createElement('a')
        link.href = 'https://oss.xuchaoyin.com/programs/shim.exe'
        link.download = binName.value
        link.click()

        // download file
        link.href = generateTextFileURL(path.value)
        link.download = binName.value.split('.exe').shift() + '.shim'
        link.click()

        path.value = ''
        binName.value = ''
    } else {
        alert('please provide a name')
    }
}

/**
 * 
 * @param content 
 * @param filename 
 * @returns object url
 */
function generateTextFileURL(content: string) {
    let textBlob = new Blob(["Path = " + content], { type: 'text/plain' });
    return URL.createObjectURL(textBlob)
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

.input-box {
    border: 1px solid black;
    margin-right: 20px;
}
</style>