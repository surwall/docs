<template>
    <textarea class="form-control box" :placeholder="placeholder" id="floatingTextarea2"
        :value="props.content" @input="handleEmit"></textarea>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
interface Props {
    editable?: boolean,
    /**
     * default to 70vh
     */
    height?: string,
    content?: string,
    placeholder?: string,
}
const props = withDefaults(defineProps<Props>(), {
    editable: true,
    height: '70vh',
    content: '',
})

const emit = defineEmits<{
    (e: 'update:content', content: string): void
    (e: 'change', content: string): void
}>()

const textAreaContent = ref('')



function handleEmit(event: Event) {
    // emit('update:content', textAreaContent.value)
    const value = (event as any).target.value
    emit('update:content', value)
    emit('change', value)
}

</script>

<style lang="css" scoped>
.box {
    /* height: v-bind('props.height'); */
    /* border: 1px solid black; */
    margin-bottom: 25px;
    height: v-bind('props.height');
}
</style>

