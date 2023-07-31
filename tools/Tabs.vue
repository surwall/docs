<template>
    <div class="wrap">
        <ToolTab :tab-list="tabList" @change="handleChange"></ToolTab>
        <component :is="tabComponents[curTabIndex]"></component>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import type { TabItem } from './ToolTab.vue'
import ToolTab from './ToolTab.vue';

import CalculateTextLength from './CalculateTextLength.vue';
import SearchHub from './SearchHub.vue';



const tabList = ref<TabItem[]>([
    { title: 'search hub', active: true },
    { title: 'calculate text length', active: false },
    // TODO base64 transform
    // TODO BMI calculate
])

const tabComponents = [
    SearchHub,
    CalculateTextLength,
]

const curTabIndex = ref(0)

function handleChange(index: number) {
    tabList.value.forEach(item => item.active = false)
    tabList.value[index].active = true
    curTabIndex.value = index
}


</script>

<style lang="scss" scoped>
.wrap {
    padding: 0 100px;
}
</style>