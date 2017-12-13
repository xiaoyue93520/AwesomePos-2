<template>
    <div>
      <div class="panel">
        <div class="header">
          <ol class="breadcrumb">
            <li>
              <router-link to="/">主页</router-link>
              <span class="divider">/</span>
            </li>
            <li class="active">发布话题</li>
          </ol>
        </div>
        <div class="inner">
          <div class="errorText" v-if="errors">{{errorText}}</div>
          <div class="tab-selector">
            <span>选择板块：</span>
            <select v-model="tab">
              <option value="dev">客户端测试</option>
            </select>
          </div>
          <div class="tab-title">
            <input type="text" v-model="title" placeholder="标题数10字以上">
          </div>
          <div class="tab-content">
            <textarea v-model="content"></textarea>
          </div>
          <div class="tab-submit">
            <button class="btn-submit" @click="createTopics">提交</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default  {
    data() {
      return {
        title: '',
        content: '',
        tab: 'dev',
        errors: false,
        errorText: ''
      }
    },
    methods: {
      createTopics: function () {
        if(this.title.length < 10) {
          this.errors = true
          this.errorText = '标题不能少于10个字'
          return
        } else if(this.content.length === 0) {
          this.errors = true
          this.errorText = '内容不能为空'
          return
        }

        this.$http.post('https://cnodejs.org/api/v1/topics', {
          accesstoken: _this.$store.state.AccessToken,
          title: _this.title,
          tab: _this.tab,
          content: _this.content
        }).then(data => {
          this.$router.push('/topic/'+ data.data.topic_id)
        })

      }
    },
    beforeMount () {
      this.$store.commit('getState')
    }
  }
</script>

<style lang="scss">
.errorText {
  padding: 10px;
  color: #b94a48;
  background-color: #f2dede;
  border: 1px solid #eed3d7;
  margin: 0 10px;
}
.tab-selector {
  padding: 10px;
  select {
    height: 30px;
  }
}
.tab-title {
  padding: 10px;
  input {
    width: 100%;
    height: 30px;
    padding-left: 10px;
    border-radius: 5px;
    border-width: 1px;
    outline: none;
  }
}
.tab-content {
  padding: 10px;
  textarea {
    width: 100%;
    height: 100%;
    min-height: 350px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    padding: 10px;
  }
}
.tab-submit {
  padding: 10px;
  border-top: 1px solid #eee;
  .btn-submit {
    width: 120px;
    height: 40px;
    line-height: 40px;
    background-color: #08c;
    font-size: 16px;
    color: #fff;
  }
}
</style>
