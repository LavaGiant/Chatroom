import { createStore } from 'vuex'



const store = createStore({
  state: {
    myInfo: {},
    userList: [] as any[]
  },
  mutations: {
    setMyInfo(state, payload) {
      state.myInfo = payload
    }
  },
  actions: {
    asyncAddUser({ state }, payload) {
      state.userList = payload
    }
  }
})

export default store