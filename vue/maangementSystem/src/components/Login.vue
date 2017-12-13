<template>
  <div class="login">
    <div class="inner">
      <form action="">
        <h2 class="title">登录</h2>
        <div class="item">
          <input type="text" v-model="username" placeholder="用户名">
        </div>
        <div class="item">
          <input type="password"  v-model="password" placeholder="密码">
        </div>
        <div class="item">
          <button type="button" class="btn-login" @click="login">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created() {

  },
  methods: {
    login() {
      if( !(this.username && this.password) ){
        this.$alert('用户名或密码不能为空')
        return false
      }

      if ( this.username != 'admin' && this.password != 'admin') {
        this.$alert('用户名活密码错误')
      }

      let _this = this

      this.$http.get('../../test/login.json', {
        params: {
          username: _this.username,
          password: _this.password
        }
      }).then((res) => {
        if(res.data.ecode === "000000") {
          this.$store.commit('signIn')
          this.$router.push({path: '/'})
        }
      }).catch(function(res) {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  .inner {
    width: 400px;
    height: 350px;
    position: absolute;
    border: 1px solid #fff;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -175px;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    background-color: #fff;

    .title {
      font-size: 28px;
      line-height: 50px;
      color: #80bd01;
      margin-bottom: 20px;
    }
    .item {
      margin-bottom: 20px;
      input {
        width: 70%;
        height: 40px;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
      }
      .btn-login {
        width: 120px;
        height: 40px;
        color: #fff;
        background-color: #80bd01;
        font-size: 16px;
        outline: none;
      }
    }
  }
}
</style>
