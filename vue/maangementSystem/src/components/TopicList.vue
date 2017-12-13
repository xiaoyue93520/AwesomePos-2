<template>
  <div>
    <div class="panel">
      <div class="header">
        <span class="topic-tab" :class="{'current-tab' : (currentTab === 'all')}" @click="changeTab('all')">全部</span>
        <span class="topic-tab" :class="{'current-tab' : (currentTab === 'good')}" @click="changeTab('good')">精华</span>
        <span class="topic-tab" :class="{'current-tab' : (currentTab === 'share')}" @click="changeTab('share')">分享</span>
        <span class="topic-tab" :class="{'current-tab' : (currentTab === 'ask')}" @click="changeTab('ask')">问答</span>
        <span class="topic-tab" :class="{'current-tab' : (currentTab === 'job')}" @click="changeTab('job')">招聘</span>
      </div>

      <div class="inner">
        <div id="topic_list">
          <div class="cell" v-for="item in topicList">
            <router-link :to="'/user/' + item.author.loginname" href="" class="user-avator pull-left">
              <img :src="item.author.avatar_url" title="">
            </router-link>
            <span class="reply_count pull-left">
                    <span class="count_of_replies" title="回复数">{{item.reply_count}}</span>
                    <span class="count_seperator">/</span>
                    <span class="count_of_visits" title="点击数">{{item.visit_count}}</span>
                  </span>
            <a href="" class="last_time pull-right">
              <img src="" class="user_small_avatar" alt="">
              <span>{{getLastTime(item.last_reply_at)}}</span>
            </a>
            <div class="topic_title_wrapper">
              <span class="put_top" v-if="item.top">置顶</span>
              <router-link :to="'/topic/'+item.id" class="topic_title" :title="item.title">
                {{item.title}}
              </router-link >
            </div>
          </div>
          <div class="page-panel">
            <el-pagination
              :total="120"
              :page-size="20"
              layout="prev, pager, next"
              background
              @current-change="getTabList"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        topicList: [],
        currentTab: 'all'
      }
    },
    created:function() {
      this.getTabList(1, 'all')
    },
    methods: {
      changeTab: function(tab) {
        this.currentTab = tab
        this.getTabList(tab)
      },
      getTabList: function (page) {
        const tab = this.currentTab;
        this.$http.get("https://cnodejs.org/api/v1/topics",{
          params: {
            page: page,
            tab: tab,
            limit: 20,
          }
        }).then((res) => {
          this.topicList = res.data.data;
        })
      }
    }
  }
</script>
