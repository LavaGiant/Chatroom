<template>
  <router-view v-slot="{Component}">
    <keep-alive include="Message">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/message" icon="chat-o"
      >消息</van-tabbar-item
    >
    <van-tabbar-item replace to="/friends" icon="friends-o"
      >用户</van-tabbar-item
    >
    <van-tabbar-item replace to="/profile" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang='ts'>
import { defineComponent, ref, inject } from "vue";
import { Socket } from "socket.io-client";
import { Button, Tabbar, TabbarItem, Notify } from "vant";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "",
  components: {
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    const active = ref<number>(0);
    const route = useRoute();
    const socket: Socket = inject("socket");
    socket.on("addUser", (data) => {
      Notify({ type: "success", message: `用户${data.username}进入聊天室` });
    });
    socket.on("delUser", username => {
      Notify({ type: "danger", message: `用户${username}离开聊天室` });
    });
    enum TabPath {
      message,
      friends,
      profile,
    }
    active.value = TabPath[route.path.substr(1)];
    return {
      active,
      route
    };
  },
});
</script>

<style lang='scss' scoped>
</style>