<template>
  <div class="navbar">
      <div class="container">
         <div class="brand">
            <a href="/"><img src="../assets/cnodejs_light.svg" alt=""></a>
         </div>
         <form action="" class="search-form">
             <input type="text" class="serach-input">
         </form>
         <ul class="nav">
             <li><a href="/">首页</a></li>
             <li><router-link to="/unreadMessages">未读消息</router-link></li>
             <li><router-link to="/new-user">新手入门</router-link></li>
             <li><a href="">API</a></li>
             <li><a href="">关于</a></li>
             <li><a href="">设置</a></li>
             <li v-if="this.$store.state.LoginState == 1">
                 <a href="javascript:;"
                    @click="DoSignOut">退出</a>
            </li>
              <template v-if="this.$store.state.LoginState != 1">
                <li><a href="">注册 {{LoginState}}</a></li>
                <li><router-link to="/login">登录</router-link></li>
              </template>
         </ul>
      </div>

  </div>
</template>

<script>
  export default {
    computed: {
      LoginState () {
        return this.$store.LoginState
      }
    },
    methods: {
      DoSignOut: function () {
        this.$store.commit('signOut')
      }
    },
    beforeMount() {
        this.$store.commit('getState')
    }
  }
</script>


<style lang="scss" scope>
@import '../assets/scss/common';
.navbar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #444;
   .brand {
       width: 160px;
       padding: 0 20px;
       height: 50px;
       float: left;
       img {
           width: 100%;
           height: auto;
           margin-top: 8px;
       }
   }
   .search-form {
       float: left;
       .serach-input {
           background: url("../assets/search.hashed.png") no-repeat 4px 4px  #888;
           padding: 5px 5px 5px 22px;
           border-radius: 15px;
           outline: none;
           width: 230px;
           border: none;
       }
   }
   .nav {
       float: right;
       list-style: none;
       li {
           float: left;
           a {
               color: #ccc;
               text-decoration: none;
               padding: 0 10px;
           }
           a:hover {
               color: #fff;
           }
       }
   }
}
</style>

