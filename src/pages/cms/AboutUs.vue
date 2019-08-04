<style lang="scss" scoped>
.about_us_container {
  // background-color: #eee;
  padding: 60px 0 20px 0;
  .wrapper {
    margin: 30px 12%;
    background-color: #192330;
    padding: 0 40px;
    h2 {
      font-weight: 400;
      height: 50px;
      font-size: 20px;
      border-bottom: 1px solid #27313e;
      line-height: 50px;
    }
    .wrapper_logo ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;
      border-bottom: 1px solid #27313e;
      height: 240px;
      li {
        width: 33.3%;

        list-style-type: none;
        border-right: 1px solid #27313e;
        text-align: center;
        h5 {
          line-height: 50px;
          font-size: 20px;
        }
        span {
          color: #999;
          font-size: 14px;
        }
      }
    }
    .content_wrapper {
      padding: 20px 0;
      .content1 {
        border-bottom: 1px solid #27313e;
        padding-bottom: 20px;
        margin-bottom: 20px;
        h5 {
          font-size: 18px;
          line-height: 40px;
          font-weight: 500;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          color: #8f8f90;
          margin-bottom: 10px;
          // margin-bottom: 14px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="about_us_container">
    <div class="wrapper">
      <h2 class="title">关于我们</h2>
      <div class="wrapper_logo">
        <ul>
          <li>
            <img src="../../assets/images/feature_safe.png" alt="">
            <h5>{{$t('description.title1')}}</h5>
            <span>{{$t('description.message1')}}</span>
          </li>
          <li>
            <img src="../../assets/images/feature_fast.png" alt="">
            <h5>{{$t('description.title2')}}</h5>
            <span>{{$t('description.message2')}}</span>
          </li>
          <li style="border:none;">
            <img src="../../assets/images/feature_experience.png" alt="">
            <h5>{{$t('description.title3')}}</h5>
            <span>{{$t('description.message3')}}</span>
          </li>
        </ul>
      </div>
      <div class="content_wrapper">
        <div class="content1">
          <h5>系统介绍</h5>
          <p>ZTuo数字资产交易平台（以下简称“ZTuo”）是ZTuo团队历经了多个数字资产交易系统开发之后，通过不断的优化精简，首家开源的Java语言开发的数字货币交易所平台，支持当前多种主流的数字货币交易（测试环境受限于服务器的成本，目前支持USDT、ETH、BTC等主流货币，或根据实际情况开放一定测试币种）。
          </p>
          <p>ZTuo平台采用前后端分离的开发模式，后端负责业务实现，前端负责数据展示，同时包含有对应的APP。</p>
          <p>ZTuo团队遵循“技术共享”的理念，决定开源ZTuo平台，以供大家参考和学习（如用于商业化项目，对此所带来的法律和经济问题，ZTuo团队概不负责）。团队小伙伴的能力有限，不足之处也在所难免，这也是团队希望开源的最终目的，希望借助开源社区的程序猿/媛们的力量，对ZTuo平台提出更多的意见和想法，提出更好的改进方案和策略，在业务和技术上共同进步，共同提高！</p>
          <p>再次声明，ZTuo平台仅用于学习实验，如有用于商业化项目，请自行咨询法律政策，技术无罪，但请遵纪守法！同时，一切用于商业化项目所带来的法律和经济问题，ZTuo团队概不负责！</p>
          <p>为方便大家交流和学习，请各位小伙伴扫码加入。</p>
          <img width="160px" src="../../assets/images/app_ios.png" alt="" srcset="">
        </div>
        <div class="content1">
          <h5>使用的技术</h5>
          <p>1.后端：Spring、SpringMVC、SpringData、SpringCloud、SpringBoot</p>
          <p>2.数据库：Mysql、Mongodb</p>
          <p>3.其他：redis、kafka、阿里云OSS、腾讯防水校验</p>
          <p>4.前端：Vue、iView、less</p>
          <p>5.同时提供IOS和Android版本。</p>
        </div>
        <!-- <div class="content1" style="border:none;">
          <h5>ZTuo目标</h5>
          <p>ZTuo的目标是建立一个相对去中心化的交易平台。平台的运营环境安全、公平而良性的发展，有创新、可迭代，符合社会进步和发展的趋势。</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  created() {},
  computed: {
    lang() {
      return this.$store.state.lang;
    }
  },
  methods: {}
};
</script>
<style scoped>
.container {
  background: #fff;
  overflow-x: hidden;
}

.content-wrap {
  padding-top: 20px;
  position: relative;
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  min-height: 600px;
}

.leftmenu {
  border: 1px solid #efefef;
}

.leftmenu .divider {
  font-size: 20px;
  padding: 5px;
  background: #efefef;
}

.leftmenu li {
  font-size: 14px;
  line-height: 30px;
  padding: 5px;
}

.leftmenu li a {
  color: #444;
}

.leftmenu li a:hover {
  color: #f0a70a;
}

.leftmenu li.cur a {
  color: #f0a70a;
}
.content {
  padding-top: 20px;
  /*padding-left: 200px;*/
  padding-bottom: 20px;
  text-align: left;
  padding-left: 20px;
}

.content .ivu-col {
  text-align: left;
}

.content p {
  text-indent: 2em;
  margin-bottom: 10px;
  font-size: 16px;
}
.content > div {
  padding-bottom: 20px;
}
.content h3 {
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 20px;
}
.content h5 {
  font-size: 14px;
}
.WordSection1 span {
  color: black;
}
</style>
