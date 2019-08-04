<template>
  <div class="help">
    <img class="bannerimg" src="../../assets/images/help_banner.png">
    <div class="help_container">
      <h1>帮助中心</h1>
      <div class="main">
        <div class="section" v-for="section in helpData">
          <h3>{{section.title}}</h3>
          <div class="list-wrap">
            <router-link class="item" :title="item.title" v-for="(item, index) in section.content" :to="{path:'helpdetail',query:{cate:section.cate,id:item.id,cateTitle:section.title}}" :key="index">
              <span class="text">{{item.title}}</span>
              <img v-show="item.isTop==0" class="iconimg" src="../../assets/images/icon-top.png" alt="">
            </router-link>
          </div>
          <div class="route-wrap">
            <router-link :to="{path:'helplist',query:{cate:section.cate,cateTitle:section.title}}">更多>></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.help {
  background: #0b1520;
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
  padding-top: 60px;
  color: #fff;
}
.help .bannerimg {
  display: block;
  width: 100%;
}
.help_container {
  padding: 0 12%;
  text-align: center;
  height: 100%;
  > h1 {
    font-size: 32px;
    line-height: 1;
    padding: 50px 0;
  }
}
.help .main {
  display: flex;
  justify-content: space-around;
  .section {
    flex: 0 0 40%;
    width: 40%;
    font-size: 16px;
    text-align: left;
    margin: 0 20px;
    position: relative;
    padding-bottom: 30px;
    > h3 {
      font-size: 24px;
      line-height: 1;
      padding: 30px 0;
      color:#ccc;
    }
    .item {
      display: block;
      position: relative;
      padding: 16px 0;
      line-height: 1;
      color: #fff;
      border-bottom: 1px solid #27313e;
      .text {
        display: inline-block;
        max-width: calc(100% - 25px);
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .iconimg {
      display: inline-block;
      width: 14px;
      margin-left: 6px;
    }
  }
  .route-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 14px;
    a {
      color: #f1ab15;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      helpData: []
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.post(this.host + "/uc/ancillary/more/help").then(res => {
        if (res.status == 200 && res.body.code == 0) {
          this.helpData = res.body.data;
        } else {
          this.$Message.error(res.body.message);
        }
      });
    }
  }
};
</script>
