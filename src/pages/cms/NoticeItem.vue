<template>
  <div class="notice">
    <div class="banner">
    </div>
    <div class="content-wrap">
      <router-link class="link" to="../notice">
        <公告列表</router-link>
          <div class="header">
            <h2>{{data.info.title}}</h2>
            <span>{{data.info.createTime}}</span>
          </div>
          <div class="content">
            <span v-html="data.info.content"></span>
          </div>
          <div class="nav-bottom">
            <div class="left" v-if="data.back">
              <router-link class="link" :to="'../notice/index?id='+data.back.id">
                <上一篇 <p>{{data.back.title}}</p>
              </router-link>
            </div>
            <div class="right" v-if="data.next">
              <router-link class="link" :to="'../notice/index?id='+data.next.id">下一篇>
                <p>{{data.next.title}}</p>
              </router-link>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: { info: {} },
      queryId: "",
      title: "",
      time: "",
      content: "",
      initLang: this.$store.state.lang
    };
  },
  created: function() {
    this.initialize();
    var self = this;
    self.fetchData();
    this.$store.commit("navigate", "nav-service");
  },
  computed: {
    lang() {
      if (this.$store.state.lang != this.initLang) {
        this.$router.back();
      }
      return this.$store.state.lang;
    }
  },
  methods: {
    initialize() {
      this.loadNoticeInfo();
    },
    loadNoticeInfo() {
      let id = this.$route.query.id;
      if (id == null || id == "") {
        this.$router.push("/notice");
        return;
      }
      // this.$http.get(this.host + "/uc/announcement/" + id).then(response => {
      //   var result = response.body;
      //   if (result.code == 0) {
      //     this.title = result.data.title;
      //     this.time = result.data.createTime;
      //     this.content = result.data.content;
      //   }
      // });
      this.$http
        .post(this.host + "/uc/announcement/more", { id })
        .then(response => {
          var result = response.body;
          if (result.code == 0) {
            const data = result.data;
            this.data = data;
            // this.title = result.data.title;
            // this.time = result.data.createTime;
            // this.content = result.data.content;
          }
        });
    },
    fetchData() {
      let id = this.$route.query.id;
      this.loadNoticeInfo();
    }
  },
  watch: {
    $route: "fetchData"
  }
};
</script>

<style scoped>
.notice {
  /* background: #fff; */
  padding-bottom: 20px;
  overflow-x: hidden;
  min-height: 800px;
}
.content-wrap {
  width: 1200px;
  margin: 0 auto;
  /* background: #fff; */
}
.header {
  text-align: right;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #27313e;
}
.header h2 {
  text-align: center;
  margin-bottom: 10px;
}
.header span {
  padding: 0 10px;
  color: #999;
}
</style>
<style lang="scss">
.notice {
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
    background: linear-gradient(to right, #001a40, #000109);
    background-image: url("../../assets/images/notice_banner.png");
    background-size: 100% 100%;
    color: #fff;
    font-size: 40px;
  }
  .content-wrap {
    position: relative;
    width: 70%;
    min-height: 562px;
    margin: 0 auto;
    background-color: #192330;
    color: #fff;
    // box-shadow: 0 0 2px #ccc;
    margin-top: -50px;
    border-radius: 6px;
    padding: 50px 100px;
    margin-bottom: 50px;
    padding-bottom: 110px;
    .link {
      font-size: 14px;
      color: #f0a70a;
    }
    .header {
      margin-bottom: 40px;
      padding-bottom: 10px;
      h2 {
        font-size: 20px;
      }
    }
    .content {
      color: #ccc;
      span {
        .MsoNormal {
          font-weight: 100;
          line-height: 30px;
        }
        .p1 {
          .s1 {
            b {
              font-weight: 400;
              span {
                font-size: 18px !important;
              }
            }
          }
        }
        .p2 {
          span {
            font-size: 12pt !important;
            line-height: 30px;
          }
        }
        .p3 {
          span {
            font-size: 12pt !important;
            color: #fff !important;
            line-height: 30px;
          }
        }
      }
      .image-desc {
        .uploaded-img {
          width: 100%;
        }
        .image-caption {
          display: none !important;
        }
      }
    }
  }
  .nav-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px 100px 50px 100px;
    display: flex;
    justify-content: space-between;
    .link > p {
      color: #fff;
      line-height: 1;
      margin-top: 10px;
    }
    .left {
      text-align: left;
    }
    .right {
      text-align: right;
    }
  }
}
</style>
