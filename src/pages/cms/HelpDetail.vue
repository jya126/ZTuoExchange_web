<template>
  <div class="helpdetail">
    <div class="route-wrap">
      <router-link to="help">帮助中心</router-link>
      <span>></span>
      <router-link :to="{path:'helplist',query:{cate:cate,cateTitle:cateTitle}}">{{cateTitle}}</router-link>
    </div>
    <div class="main">
      <div class="menu">
        <p>此组别内的文章</p>
        <div class="titles">
          <div class="route" v-for="item in topList" @click="clickTitle(item.id)" :class="{active:item.id==article.id}">
            <span>{{item.title}}</span>
          </div>
        </div>
        <router-link :to="{path:'helplist',query:{cate:cate,cateTitle:cateTitle}}">查看更多>></router-link>
      </div>
      <div class="content-wrap" >
        <h3 class="title">{{article.title}}</h3>
        <p class="time">{{article.createTime}}</p>
        <div class="content">
          <div v-html="article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topList: [], //置顶文章列表
      article: {} //文章详情
    };
  },
  created() {
    const { cate, id, cateTitle } = this.$route.query;
    this.cate = cate;
    this.id = id;
    this.cateTitle = cateTitle;
    this.init();
    this.$store.commit("navigate", "nav-uc");
  },
  methods: {
    clickTitle(id) {
      this.getData(id);
    },
    getTop() {
      return this.$http.post(this.host + "/uc/ancillary/more/help/page/top", {
        cate: this.cate
      });
    },
    getArticle() {
      return this.$http.post(this.host + "/uc/ancillary/more/help/detail", {
        id: this.id
      });
    },
    init() {
      Promise.all([this.getTop(), this.getArticle()]).then(arr => {
        if (
          arr[0].status == 200 &&
          arr[0].body.code == 0 &&
          arr[1].status == 200 &&
          arr[1].body.code == 0
        ) {
          let returnTop = arr[0].body.data,
            returnArticle = arr[1].body.data,
            hsaInTop = false;
          returnTop.forEach(v => {
            if (v.id == returnArticle.id) {
              hsaInTop = true;
            }
          });
          hsaInTop ? "" : returnTop.unshift(returnArticle);
          this.topList = returnTop;
          this.article = returnArticle;
        } else {
          this.$message.error("网络错误");
        }
      });
    },
    getTopList() {
      this.$http
        .post(this.host + "/uc/ancillary/more/help/page/top", {
          cate: this.cate
        })
        .then(res => {
          if (res.status == 200 && res.body.code == 0) {
            this.topList = res.body.data;
          } else {
            this.$Message.error(res.body.message);
          }
        });
    },
    getData(id) {
      this.$http
        .post(this.host + "/uc/ancillary/more/help/detail", {
          id
        })
        .then(res => {
          if (res.status == 200 && res.body.code == 0) {
            this.article = res.body.data;
          } else {
            this.$Message.error(res.body.message);
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.helpdetail {
  background: #0b1520;
  color: #fff;
  width: 70%;
  margin: 0 auto;
  padding: 80px 0;
  font-size: 14px;
}
.main {
  display: flex;
  .menu {
    flex: 0 0 200px;
    width: 200px;
    > p {
      line-height: 1;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .titles {
      margin-bottom: 20px;
    }
    > a {
      padding: 10px;
      color: #f1ab15;
    }
    .route {
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 10px;
      border-radius: 6px;
      line-height: 1.5;
      color: #fff;
      cursor: pointer;
      > span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      &.active {
        background-color: #f1ab15;
        color: #fff;
      }
    }
  }
  .content-wrap {
    flex: 1 1 100%;
    width: 100%;
    margin-left: 35px;
    .title {
      font-size: 28px;
      line-height: 1;
      margin-bottom: 20px;
    }
    .time {
      color: #999;
      line-height: 1;
      margin-bottom: 20px;
    }
    .content {
      border-top: 1px solid #27313e;
      padding: 40px 0;
      color:#ccc;
    }
  }
}

.route-wrap {
  font-size: 14px;
  color: #f1ab15;
  margin-bottom: 40px;
  a {
    color: #f1ab15;
  }
}
</style>
<style lang="scss">
.main .content-wrap .content {
  .uploaded-img {
    width: 100% !important;
  }
}
</style>



