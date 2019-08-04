<template>
  <div class="helplist">
    <div class="route-wrap">
      <router-link to="help">帮助中心</router-link>
      <span>></span>
      <span>{{cateTitle}}</span>
    </div>
    <div class="container">
      <h1>{{cateTitle}}</h1>
      <div class="list">
        <router-link class="item" v-for="(item,index) in list" :key="index" :to="{path:'helpdetail',query:{cate:cate,id:item.id,cateTitle:cateTitle}}">
          <span class="text">{{item.title}}</span>
          <img v-show="item.isTop==0" class="iconimg" src="../../assets/images/icon-top.png" alt="">
          <span class="time">
            {{item.createTime}}
          </span>
        </router-link>
      </div>
      <div class="page">
        <Page :total="total" :pageSize="pageSize" :current="pageNo" @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.helplist {
  width: 60%;
  margin: 0 auto;
  padding: 80px 0;
  .container {
    > h1 {
      text-align: center;
      margin: 30px 0 20px 0;
    }
  }
}
.list {
  font-size: 16px;
  .item {
    color: #fff;
    display: block;
    line-height: 40px;
    border-bottom: 1px solid #27313e;
    cursor: pointer;
    .iconimg {
      width: 14px;
      vertical-align: sub;
      margin-left: 20px;
    }
    .time {
      float: right;
      color: #999;
      font-size: 14px;
    }
  }
}
.route-wrap {
  font-size: 14px;
  a {
    color: #f1ab15;
  }
}
.page {
  margin-top: 20px;
  text-align: right;
}
</style>
<script>
export default {
  data() {
    return {
      cate: 0,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      list: []
    };
  },
  created() {
    this.$store.commit("navigate", "nav-uc");
    const { cate, cateTitle } = this.$route.query;
    this.cate = cate;
    this.cateTitle = cateTitle;
    this.getData();
  },
  watch: {
    $route(to, from) {
      const { cate, cateTitle } = to.query;
      this.cate = cate;
      this.cateTitle = cateTitle;
      this.getData();
    }
  },
  methods: {
    pageChange(data) {
      this.pageNo = data;
      this.getData();
    },
    getData() {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        cate: this.cate
      };
      this.$http
        .post(this.host + "/uc/ancillary/more/help/page", params)
        .then(res => {
          if (res.status == 200 && res.body.code == 0) {
            this.list = res.body.data.content;
            this.totle = res.body.data.totalElements;
          } else {
            this.$Message.error(res.body.message);
          }
        });
    }
  }
};
</script>


