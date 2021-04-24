<template>
  <div class="wrapper">
    <img src="@/assets/img/logo.jpg" alt="" />
    <span class="title">欢迎使用nochat聊天室</span>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="tips">
      <router-link to="/register"><span>前往注册</span></router-link>
      <router-link to="/forget"><span>忘记密码</span></router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  getCurrentInstance,
  inject,
  reactive,
  toRefs,
} from "vue";
import { Router, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import { Button, Field, Form } from "vant";
import { Socket } from "socket.io-client";
// @ts-ignore
import { UserInfo } from "@/types/user";

export default defineComponent({
  name: "Login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  setup() {
    const socket: Socket = inject("socket");
    const router: Router = useRouter();
    const store: Store<any> = useStore();
    const data = reactive({
      username: "",
      password: "",
    });
    const onSubmit = (form: UserInfo): void => {
      socket.emit("login", form);
      socket.on("loginSuccess", (res): void => {
        store.commit("setMyInfo", res.data);
        router.push({
          path: "/profile",
        });
      });
      socket.on("userList", (data) => {
        console.log(data);
        
        store.dispatch("asyncAddUser", data);
      });
    };
    return {
      ...toRefs(data),
      onSubmit,
    };
  },
});
</script>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100vh;
  padding: 5.25rem 0.625rem;
  img {
    width: 8rem;
    border-radius: 50%;
  }
  .title {
    font-size: 1.575rem;
    color: #609700;
    padding: 1.875rem;
  }
  .tips {
    display: flex;
    justify-content: space-around;
    width: 13rem;
    span {
      color: #999;
    }
  }
}
</style>