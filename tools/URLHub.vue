<template>
    <div v-for="item in urlList" :key="item.url">
        <a :href="item.url" :target="item.newTab ? '_blank' : ''">{{ item.title }}</a>
    </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'

const urlList = ref<{url:string, title: string, newTab: boolean}[]>([
    {url: 'https://www.processon.com/view/link/64f9e47becb97a19be6aecfd', title: '书签集合', newTab: true},
    {url: 'https://www.processon.com/view/link/64f9ebba6b1da260c480fdb8', title: '在线剪贴板', newTab: true},
    {url: 'https://www.processon.com/mindmap/64f9eb728bf2a52ff12e9cb5', title: '在线剪贴板Edit', newTab: true},
])


</script>


<style lang="scss" scoped>

a {
    text-decoration: underline;
    color: blue;
}

a:visited {
    color: purple;
}

</style>