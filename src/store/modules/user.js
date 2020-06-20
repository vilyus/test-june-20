import Vue from 'vue'

const DEMO_USER1 = {
  id: 101,
  login: 'Login_#1',
  password: 'pwd_#1',
  email: 'one@example.com',
  registered: '20200101',
  expired: '20211231',
  custom_string: 'example string of user',
  bool_field: '1',
  bool_field2: 'false',
  limit_number: 123,
  double_field: 234.56,
  big_string: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae consequat nibh, non fermentum orci. Sed tincidunt, nibh sed efficitur tincidunt, quam est hendrerit urna, eget convallis sapien mauris at urna. Nulla eu lacus dignissim, sagittis mauris et, pellentesque elit. Etiam consectetur arcu eros, et efficitur nulla malesuada ac. Nunc condimentum consectetur leo in fringilla. Curabitur efficitur fringilla lacinia. Quisque convallis velit nec velit cursus, ut sagittis arcu tincidunt. Quisque tempor risus at ligula tristique, ac posuere arcu auctor. Maecenas vel fermentum odio, a efficitur ipsum. Aenean vestibulum nunc ligula, sed pretium felis feugiat et. Donec at elit diam. Aenean interdum nisl dolor, a egestas justo mattis a. ',
}
const DEMO_USER2 = {
  id: 102,
  login: 'Login_#2',
  password: 'pwd_#2',
  email: 'two@example.com',
  registered: '20200202',
  expired: '20211010',
  custom_string: 'I eat vegetables every day',
  bool_field: '1',
  bool_field2: 'false',
  limit_number: 21,
  double_field: 865.56,
  big_string: 'Suspendisse feugiat mauris vitae justo porttitor sollicitudin. Nulla tincidunt lectus non molestie venenatis. In mattis pharetra mollis. Proin a neque ac est consequat efficitur. Nam non libero quis tellus posuere dignissim. Duis efficitur feugiat mauris eget dapibus. Pellentesque mattis risus at turpis suscipit, ut dignissim diam tincidunt. ',
}
const DEMO_USER3 = {
  id: 103,
  login: 'Login_#3',
  password: 'pwd_#3',
  email: 'three@example.com',
  registered: '20200303',
  expired: '20211129',
  custom_string: 'Трудно найти, невозможно потерять',
  bool_field: '1',
  bool_field2: 'true',
  limit_number: 42,
  double_field: -42.42,
  big_string: 'Nam non iaculis mi, ut iaculis arcu. Maecenas eu orci rutrum, ullamcorper mauris non, dictum nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer ullamcorper, sem ut posuere molestie, diam arcu posuere massa, ullamcorper congue odio ligula ut nunc. Vivamus aliquam, mauris at bibendum dapibus, velit elit venenatis velit, at auctor arcu erat sed urna. Cras dignissim erat vitae tempus hendrerit. Vivamus dapibus in velit vitae consequat. Sed mollis tincidunt nisl vitae facilisis. Quisque laoreet nulla ullamcorper egestas commodo. Donec hendrerit sapien id consequat cursus. Praesent eu elit laoreet, laoreet ligula non, eleifend leo. Morbi eget lacus eget lacus consectetur condimentum sed laoreet sem. ',
}

export default {
  namespaced: true,

  state: () => ({
    users: {
      101: DEMO_USER1,
      102: DEMO_USER2,
      103: DEMO_USER3,
    },
    order: [101, 102, 103],
  }),

  getters: {
    list: state => state.order.map(id => state.users[id]),
  },

  mutations: {
    setOne: (state, { user }) => {
      Vue.set(state.users, user.id, user)
    },
  },
}
