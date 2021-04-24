import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import io, { Socket } from 'socket.io-client'
import {Icon} from 'vant'
const socket:Socket = io('http://localhost:3100')

createApp(App).provide('socket', socket).use(router).use(store).use(Icon).mount('#app')
