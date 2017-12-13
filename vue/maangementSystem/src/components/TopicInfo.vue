<template>
  <div>
    <div class="panel">
      <div class="header topic_header">
                        <span class="topic_full_title">
                            <span class="put_top">置顶</span>
                            {{data.title}}
                        </span>
        <div class="changes">
          <span>sss</span>
          <span>{{data.visit_count}}次浏览</span>
          <span>sss</span>
          <span>sss</span>
          <input type="submit" class="span-common span-success pull-right" value="收藏" action="collect">
        </div>
        <div class="manage_topic"></div>
      </div>
      <div class="inner topic">
        <div class="topic_content">
          <div class="markdown-text" v-html="data.content"></div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="header">
        <span>{{data.replies ? data.replies.length : 0}} 回复</span>
      </div>
      <div class="cell" v-for="(item,index) in data.replies">
        <div class="author_content">
          <a href="" class="user-avator">
            <img :src="item.author.avatar_url" alt="" title="">
          </a>
        </div>
        <div class="user_info">
          <a href="" class="dark reply_author">{{item.author.loginname}}</a>
          <a href="" class="reply_time">1楼·</a>
        </div>
        <div class="user_action">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BarHeader from "./BarHeader";
  import BarFooter from "./BarFooter";
  import SideBar from './SideBar'

  export default {
    data() {
      return {
        data: ''
      }
    },
    created() {
      this.$http.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id).then((res) => {
        this.data = res.data.data
      })
    },
    components: {
      BarHeader,
      BarFooter,
      SideBar
    }
  }
</script>

<style lang="scss" scope>
  @import '../assets/scss/common';
  @import '../assets/scss/main';

  #main {
    img {
      max-width: 100%;
    }
    .panel {
      .topic_header {
        background-color: #fff;
      }
      .topic_full_title {
        font-size: 22px;
        font-weight: 700;
        margin: 8px 0;
        display: inline-block;
        vertical-align: bottom;
        width: 75%;
        line-height: 130%;
      }
      .topic_content {
        h1 {
          font-size: 32px;
        }
        p, li {
          font-size: 15px;
          line-height: 25px;
          overflow: auto;
          word-break: break-all;
          margin: 15px;
        }
        ul, ol {
          list-style: disc;
        }
        h1, h2, h3, h4, h5, h6 {
          margin: 30px 0 15px;
          border-bottom: 1px solid #eee;
          line-height: 40px;
        }
      }
    }
    .put_top {
      background: #80bd01;
      padding: 2px 4px;
      border-radius: 3px;
      color: #fff;
      font-size: 12px;
    }
    .changes {
      font-size: 12px;
      color: #838383;
      overflow: hidden;
      span:before {
        content: "•";
      }
    }
    .span-success {
      border-radius: 3px;
      background-color: #80bd01;
      display: inline-block;
      padding: 3px 10px;
      font-size: 14px;
      color: #fff;
      line-height: 28px;
    }
    .topic {
      padding: 10px;
      border-top: 1px solid #e5e5e5;
    }
    .markdown-text {
      padding: 10px;
    }
  }
</style>

