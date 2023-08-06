<template>
    <div class="wrap">
        <ToolTab :tab-list="tabList" @change="handleChange"></ToolTab>
        <component :is="tabComponents[curTabIndex]"></component>
    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import type { TabItem } from './ToolTab.vue'
import ToolTab from './ToolTab.vue';

import CalculateTextLength from './CalculateTextLength.vue';
import SearchHub from './SearchHub.vue';
import SystemTweak from './SystemTweak.vue';



const tabList = ref<TabItem[]>([
    { title: 'search hub', active: true },
    { title: 'calculate text length', active: false },
    { title: 'System Tweak', active: false },
    // TODO base64 transform
    // TODO BMI calculate
])

const tabComponents = [
    SearchHub,
    CalculateTextLength,
    SystemTweak
]

onMounted(() => {
    document.addEventListener('keydown', handleSwitchTabKey)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleSwitchTabKey)
})

function handleSwitchTabKey(event: KeyboardEvent) {
    console.log(event)
    if (event.altKey) {
        event.preventDefault()
        console.log(event.key)
        if (['1','2','3','4','5','6','7','8','9'].includes(event.key)) {
            const targetIndex = Number(event.key)-1
            if (targetIndex <= tabComponents.length - 1) {
                handleChange(targetIndex)
            }
        }
    }
}

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