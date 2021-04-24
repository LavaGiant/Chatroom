<template>
  <div v-for="item in store.state.userList" :key="item.username">
    {{item.username}}
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent ({
  name: '',
  setup() {
    const store = useStore()
    return {
      store
    }
  }
})
</script>

<style lang='scss' scoped>

</style>