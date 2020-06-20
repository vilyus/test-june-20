<template>
  <div id="app">
    <section class="container">
      <h1 class="title">Tabular Form</h1>
      <section class="user-tabular-forms">
        <div
          v-for="user in users"
          :key="user.id"
          class="tabular-row"
        >
          <UserTabularForm :user="user" />
        </div>
      </section>
    </section>

    <hr />

    <section class="container">
      <h1 class="title">Expanded UserForm</h1>
      <div class="columns">
        <div class="column">
          <h2 class="subtitle">User #1</h2>
          <UserForm :user="users[0]" class="column" />
        </div>
        <div class="column">
          <h2 class="subtitle">User #1 again</h2>
          <UserForm :user="users[0]" class="column" readonly />
        </div>
      </div>

      <hr />
      <h1 class="title">More forms</h1>

      <section class="columns">
        <div class="column">
          <h2 class="subtitle">User #2</h2>
          <UserForm :user="users[1]" />
        </div>
        <div class="column">
          <h2 class="subtitle">User #3</h2>
          <UserForm :user="users[2]" />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import UserTabularForm from './components/UserTabularForm'
import UserForm from './components/UserForm'

export default {
  name: 'App',

  components: {
    UserTabularForm,
    UserForm,
  },

  computed: {
    users() { return this.$store.getters['user/list'] },
  },
}
</script>

<style lang="scss" scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  .user-tabular-forms {
    min-width: 900px;

    .tabular-row {
      padding: 1em 0;
      border-top: 1px solid #e5e5e5;

      &:last-child {
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
</style>
