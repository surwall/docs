<template>
    <div class="wrap">

    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

interface Props {
    width: string
    height: string
}

const props = withDefaults(defineProps<Props>(), {
    
})

</script>


<style lang="css" scoped>
.wrap {
    border-radius: 8px;
    background-color: #212529;
    
}
</style>