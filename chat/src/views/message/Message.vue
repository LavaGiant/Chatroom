<template>
  <div class="message-list" :ref="domHandler">
    <div class="list-item" v-for="(item, index) in messageList" :key="index">
      <div :class="[item.type ? 'left' : 'right']">
         <span v-if="item.type">{{item.name}}:</span>{{item.value}}
      </div>
    </div>
  </div>
  <div class="message-input">
    <van-field
      v-model="message"
      rows="5"
      type="textarea"
      placeholder="请输入"
      autofocus
    >
      <template #button>
        <van-button type="success" class="btn" @click="btnHandler"
          >发送</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject, reactive, ref } from "vue";
import { Field, Button, Toast } from "vant";
import { Socket } from "socket.io-client";
import { Store, useStore } from "vuex";
export default defineComponent({
  name: "Message",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
  },
  setup() {
    const store: Store<any> = useStore();
    const socket: Socket = inject("socket");
    const message = ref<string>("");
    const messageList = reactive<any[]>([]);
    const domHandler = el => {
      el.scrollTop = el.scrollHeight
    }
    const btnHandler = () => {
      if (message.value.trim() !== "") {
        socket.emit("sendMsg", {
          msg: message.value,
          username: store.state.myInfo.username,
        });
        message.value = "";
      } else {
        Toast("请输入文字");
      }
    };
    socket.on("monitorMsg", (data) => {
      if (data.username === store.state.myInfo.username) {
        messageList.push({ value: data.msg as string, type: 0 as number, name: data.username as string });
      } else {
        messageList.push({ value: data.msg as string, type: 1 as number, name: data.username as string });
      }
    });
    return {
      message,
      btnHandler,
      messageList,
      domHandler
    };
  },
});
</script>

<style lang='scss' scoped>
.message-list {
  background-color: rgba(211, 206, 206, 0.281);
  height: 70vh;
  padding: .625rem;
  overflow: scroll;
  .list-item{
    width: 100%;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    .left{
      width: 50%;
      align-self: flex-start;
    }
    .right{
      max-width: 40%;
      align-self: flex-end;
    }
  }
}
.message-input {
  // height: 30vh;
  position: relative;
  .btn {
    margin-top: 4.875rem;
  }
}
</style>