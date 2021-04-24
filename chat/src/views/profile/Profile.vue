<template>
  {{username}}
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent ({
  name: 'Profile',
  setup() {
    const store = useStore()
    // console.log(store.state.myInfo.username, 'ui')
    const username = ref<string>(store.state.myInfo.username)
    return {
      username
    }
  }
})
</script>

<style lang='scss' scoped>

</style>