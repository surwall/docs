<template>
    <ul class="nav nav-tabs">
        <li class="nav-item" v-for="(item, index) in tabList" :key="index">
            <a class="nav-link" @click="change(index)" :class="{ active: item.active, disabled: item.disabled }" aria-current="page"
                href="#">{{ item.title }} <span class="index">{{ index+1 }}</span></a>
        </li>
    </ul>
</template>


<script lang="ts" setup>
import { ref } from 'vue'

export interface TabItem {
    title: string;
    active?: boolean;
    disabled?: boolean
}

interface Props {
    tabList: TabItem[]
}
const props = withDefaults(defineProps<Props>(), {
    tabList: () => ([])
})

const emit = defineEmits<{
    (e: 'change', index: number): void
}>()

function change(index: number) {
    emit('change', index)
}
</script>

<style lang="scss" scoped>
.nav {
    margin-bottom: 20px;
    display: flex;
}

.nav-item {
    margin-right: 20px;
    border: 1px solid black;

    a {
        height: 100%;
        display: flex;
    }
}

.index {
    color: green;
    font-size: 20px;
    font-weight: 600;
}


.active {
    color: red;
    background-color: pink;
}
</style>