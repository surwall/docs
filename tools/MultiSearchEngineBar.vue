<template>
    <div class="wrap" :class="{active: props.active}">
        <input @keydown.enter="search" v-model="searchContent" 
        ref="inputRef"
        class="form-control" type="search" placeholder="Search"
            aria-label="Search">
        <select class="form-select" aria-label="Default select example">
            <option v-for="item in options">{{ item }}</option>
        </select>
        <button type="button" class="btn btn-dark" @click="search">🔍</button>
    </div>
</template>

<script  lang="ts" setup>
import { ref, watch, nextTick, onMounted} from 'vue'

export type engine = 'google' | 'baidu' | 'douban-books' | 'douban-movies' | 'youtube' | 'v2ex' | 'zhihu' |
'bing' | 'zlib' | 'libgen' | 'bilibili'

interface Props {
    active: boolean;
    options?: string[];
    engineList?: engine[]
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
    options: () => ([]),
    engineList: () => ([])
})

const searchContent = ref('')
const inputRef = ref<HTMLInputElement>()

onMounted(() => {
    if (props.active) {
        inputRef.value?.focus()
    }
})


watch(props, (newValue, oldValue) => {
    if (newValue.active) {
        inputRef.value?.focus()
        nextTick(() => {
            inputRef.value?.setSelectionRange(inputRef.value.value.length, inputRef.value.value.length)
        })
    }
})




function search() {
    props.engineList.forEach(item => {
        const query = encodeURIComponent(searchContent.value)
        const link = generateSearchLink(query, item)
        openLink(link)
    })
    searchContent.value = ''
    
}

function generateSearchLink(query: string, engine: engine) {
    const engineMatchObj: Record<engine, string> = {
        baidu: `https://www.baidu.com/s?wd=${query}`,
        bing: `https://www.bing.com/search?q=${query}`,
        google: `https://www.google.com/search?q=${query}`,
        libgen: `https://libgen.is/search.php?req=${query}&open=0&res=25&view=simple&phrase=0&column=def`,
        youtube: `https://www.youtube.com/results?search_query=${query}`,
        v2ex: `https://www.google.com/search?q=site:v2ex.com/t+${query}`,
        zhihu: `https://www.zhihu.com/search?q=${query}&type=content`,
        bilibili: `https://search.bilibili.com/all?keyword=${query}`,
        "douban-books": `https://www.douban.com/search?cat=1001&q=${query}`,
        "douban-movies": `https://www.douban.com/search?cat=1002&q=${query}`,
        zlib: `https://lib-hurkqiyciqybndjbrbeuxte4.booksc.eu/s/${query}?`,
    }
    return engineMatchObj[engine]
}


function openLink(link) {
    window.open(link, '_blank')
}


</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 30px;
}

.active {
    background: rgba(0, 0, 0, 0.3);
}

.form-select {
    margin: 0 10px;
    width: min-content;
}
</style>