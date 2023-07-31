<template>
    <InputBox height="300px" placeholder="paste your content here" v-model:content="content" @change="calculate"></InputBox>
    <div style="display: flex; justify-content: flex-end;">
        <button type="button" class="btn btn-dark" @click="clear">Clear</button>
    </div>
    <!-- <InputBox height="300px" :editable="false"></InputBox> -->
    The length of your string is: {{ length }}<br>
    <!-- The language is probably: {{ lang }} -->
</template>

<script lang="ts" setup>
import InputBox from './InputBox.vue';
import { ref } from 'vue'
const content = ref('')
const length = ref(0)
const lang = ref('')


function calculate() {
    // TOOD only chrome 87 up support it, need polyfill
    // length.value = [...content.value].length
    // @ts-ignore
    length.value = [...new (Intl as any).Segmenter().segment(content.value.trim())].length
    // @ts-ignore

}

function clear() {
    content.value = ''
    length.value = 0
}

</script>

<style lang="css" scoped>
.flex {
    display: flex;
}
</style>