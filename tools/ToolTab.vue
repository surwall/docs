<template>
    <ul class="nav nav-tabs">
        <li class="nav-item" v-for="(item, index) in tabList" :key="index">
            <a class="nav-link" @click="change(index)" :class="{ active: item.active, disabled: item.disabled }" aria-current="page"
                href="#">{{ item.title }}</a>
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
}
</style>