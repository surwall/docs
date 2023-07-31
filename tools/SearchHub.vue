<template>
    <div class="strange">
        <MultiSearchEngineBar v-for="(item, index) in configs" :active="item.active" :options="item.options"
            :engineList="item.engineList" :key="index">
        </MultiSearchEngineBar>
    </div>
</template>


<script lang="ts" setup>
import MultiSearchEngineBar from './MultiSearchEngineBar.vue';
import { onMounted, watchEffect, ref, onUnmounted } from 'vue'
import type { engine } from './MultiSearchEngineBar.vue'

const configs = ref<{ options: string[], active: boolean, engineList: engine[] }[]>([
    { engineList: ['google', 'bing'], active: true, options: ['google'] },
    { engineList: ['zhihu'], active: false, options: ['zhihu'] },
    { engineList: ['youtube'], active: false, options: ['youtube'] },
    { engineList: ['douban-books'], active: false, options: ['douban-books'] },
    { engineList: ['douban-movies'], active: false, options: ['douban-movies'] },
    { engineList: ['bilibili'], active: false, options: ['bilibili'] },
    { engineList: ['v2ex'], active: false, options: ['v2ex'] },
    { engineList: ['libgen'], active: false, options: ['libgen'] },
    { engineList: ['zlib'], active: false, options: ['zlib'] },

])

const activeSearchIndex = ref(0);


onMounted(() => {
    document.addEventListener('keydown', handler)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handler)
})


function handler(event: KeyboardEvent) {
    switch (event.key) {
        case 'ArrowDown':
            changeIndexDetail('down')
            break;
        case 'ArrowUp':
            changeIndexDetail('up')
            break;
        case 'ArrowLeft':
            changeIndexDetail('left')
            break;
        case 'ArrowRight':
            changeIndexDetail('right')
            break;
        default:
            break;
    }
}

function changeIndexDetail(direction: 'up' | 'down' | 'left' | 'right') {
    configs.value[activeSearchIndex.value].active = false
    if (direction === 'up') {
        console.log('up', activeSearchIndex.value)
        if (activeSearchIndex.value >= 3) {
            activeSearchIndex.value -= 3
        }
    } else if (direction === 'down') {
        if (activeSearchIndex.value < configs.value.length - 1 - 2) {
            activeSearchIndex.value += 3
        }
    } else if (direction === 'left') {
        if (activeSearchIndex.value > 0) activeSearchIndex.value--
    } else if (direction === 'right') {
        if (activeSearchIndex.value < configs.value.length - 1) activeSearchIndex.value++
    }
    configs.value[activeSearchIndex.value].active = true
}


</script>


<style lang="scss" scoped>
.strange {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(33.33% - 10px), 1fr));
    /* Set each column to take up 1/3 of the container width minus some margin */
    grid-gap: 5px;
}
</style>