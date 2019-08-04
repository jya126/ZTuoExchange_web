<template>
  <div :class="pageView">
    <div class="page-content">
      <div class="time_download">
        <div class="leftwrapper">
          <!-- <img src="../src/assets/images/clock.png" alt="" class="clock"> -->
          <Icon type="ios-clock-outline" class="clock"></Icon>
          <span>{{time|dateFormat}}&#160;&#160;{{utc}}</span>
        </div>
        <div class="rightwrapper">
          <poptip placement="bottom" width="270" class="appdownload">
            <a href="javascript:;" style="font-size:12px;">{{$t("header.appdownlaod")}}
              <Icon type="md-arrow-dropdown" size="16" />
            </a>
            <div class="api" slot="content">
              <div class="ios">
                <img src="../src/assets/images/app_ios.png" alt="">
                <div class="tips">
                  <img src="../src/assets/images/ios.png" alt="">
                  <span>IOS</span>
                </div>
              </div>
              <div class="andrio">
                <img src="../src/assets/images/app_andraio.png" alt="">
                <div class="tips">
                  <img src="../src/assets/images/andraio.png" alt="">
                  <span>Android</span>
                </div>
              </div>
            </div>
          </poptip>
          <!-- <div class="changelanguage">
            <div class="languagelogo"><img src="./assets/images/change_language.png" alt=""></div>
            <Dropdown @on-click="changelanguage">
              <a href="javascript:void(0)" style="font-size:12px;">
                {{languageValue}}
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list" id="change_language_theme">
                <DropdownItem v-if="languageValue=='简体中文'" name="en">English</DropdownItem>
                <DropdownItem v-else name="cn">简体中文</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div> -->
        </div>
      </div>
      <div class="layout">
        <div class="layout-ceiling">
          <router-link to="/">
            <div class="layout-logo"></div>
          </router-link>
          <div class="layout-ceiling-main">
            <!-- 导航条 -->
            <div class="header_nav">
              <Menu :active-name="activeNav" width="auto" :open-names="['1']">
                <Submenu name="1">
                  <router-link to="/">
                    <MenuItem name="nav-index">{{$t("header.index")}}</MenuItem>
                  </router-link>
                  <router-link to="/exchange">
                    <MenuItem name="nav-exchange">{{$t("header.exchange")}}</MenuItem>
                  </router-link>
                  <router-link to="/otc/trade/usdt">
                    <MenuItem name="nav-otc">{{$t("header.otc")}}</MenuItem>
                  </router-link>
                  <router-link to="/help">
                    <MenuItem name="nav-uc">帮助</MenuItem>
                  </router-link>
                  <router-link to="/notice">
                    <MenuItem name="nav-service">{{$t("header.service")}}</MenuItem>
                  </router-link>
                </Submenu>
              </Menu>
            </div>
            <div class="rr">
              <!-- 判断是否登录 -->
              <!-- 登录 -->
              <div class="login_register isLogin" v-if="isLogin">
                <div class="mymsg">
                  <router-link to="/uc/safe">个人中心</router-link>
                </div>
                <Dropdown>
                  <a href="javascript:void(0)">
                    <!-- <Icon type="person"></Icon> -->
                    <Icon type="md-person" size="20" />
                    <span>{{strpo(member.username)}}</span>
                    <Icon type="md-arrow-dropdown" size="16" />
                  </a>
                  <DropdownMenu slot="list">
                    <div @click="logout">
                      <DropdownItem>
                        <img src="./assets/images/logout1.png"> {{$t("common.logout")}}
                      </DropdownItem>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <!-- 未登录 -->
              <div class="login_register" v-else>
                <Menu active-name11="1-1" width="auto" :open-names="['2']">
                  <Submenu name="2" id="login_register_theme">
                    <router-link to="/login" id="login">
                      <MenuItem name="1-1" style="color:#fff">{{$t("common.login")}}</MenuItem>
                    </router-link>
                    <router-link to="/register" id="register">
                      <MenuItem name="1-2">{{$t("common.register")}}</MenuItem>
                    </router-link>
                  </Submenu>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div :class="container_test"> -->
      <router-view></router-view>
      <!-- </div> -->
    </div>
    <div class="footer">
      <div class="footer_content">
        <div class="footer_left">
          <img src="./assets/images/small_logo.png" style="margin:0"></img>
          <!-- <h3>Caymanex.Pro</h3> -->
          <p>{{$t("footer.gsmc")}}</p>
          <p>Copyright © 2017 - 2018&nbsp;&nbsp;</p>
        </div>
        <div class="footer_right">
          <ul>
            <li class="footer_title">
              <span>{{$t("footer.gsjj")}}</span>
            </li>
            <li>
              <router-link to="/about-us">{{$t("footer.gywm")}}</router-link>
            </li>
          </ul>
          <ul>
            <li class="footer_title">
              <span>{{$t("footer.bzzx")}}</span>
            </li>
            <li>
              <router-link to="/helplist?cate=0&cateTitle=新手指南">{{$t("footer.xszn")}}</router-link>
            </li>
            <li>
              <router-link to="/helplist?cate=1&cateTitle=常见问题">{{$t("footer.cjwt")}}</router-link>
            </li>
          </ul>
          <!-- <ul>
            <li class="footer_title">
              <span>{{$t("footer.ptsm")}}</span>
            </li>
            <li>
              <router-link to="/about-rule">{{$t("footer.fysm")}}</router-link>
            </li>
            <li>
              <router-link to="/about-protocol">{{$t("footer.fwtk")}}</router-link>
            </li>
            <li>
              <router-link to="/about-fee">{{$t("footer.fltk")}}</router-link>
            </li>
          </ul> -->
          <ul>
            <li class="footer_title">
              <span>{{$t("footer.lxwm")}}</span>
            </li>
            <li class="wechatclick">
              <poptip width="200">
                <a href="javascript:;" class="wechat">客服邮箱</a>
                <div slot="content">
                  <p style="text-align:center;">service@xxx.com</p>
                </div>
              </poptip>
            </li>
            <!-- <li>
              <a href="https://0.plus/bihuoguanfang" target="_blank">{{$t('footer.biyong')}}</a>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {
      // container_test:"container_test",
      pageView: "page-view",
      utc: null,
      time: null,
      content: " ",
      wechat: this.$t("footer.wechat")
    };
  },
  watch: {
    activeNav: function() {
      switch (this.activeNav) {
        case "nav-exchange":
          break;
        default:
          window.document.title = "ZTuo国际数字加密资产交易平台";
          break;
      }
    },
    $route(to, from) {
      if (to.path === "/") {
        this.pageView = "page-view";
        // this.container_test = "";
      } else {
        if (to.path.indexOf("exchange") > 0 && this.exchangeSkin == "night") {
          this.pageView = "page-view";
        } else {
          this.pageView = "page-view2";
        }
        // this.container_test = "container_test";
      }
    },
    exchangeSkin() {
      if (this.exchangeSkin === "day") {
        this.pageView = "page-view2";
      } else {
        this.pageView = "page-view";
      }
    }
  },
  computed: {
    activeNav: function() {
      return this.$store.state.activeNav;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
    languageValue: function() {
      var curlang = this.$store.getters.lang;
      if (curlang == "English") this.$i18n.locale = "en";
      return curlang;
    },
    lang() {
      return this.$store.state.lang;
    },
    exchangeSkin() {
      return this.$store.state.exchangeSkin;
    }
  },
  created: function() {
    this.initialize();
    var d = new Date(),
      gmtHours = d.getTimezoneOffset() / 60;
    this.utc = "GMT " + (gmtHours > 0 ? "-" : "+") + " " + String(gmtHours)[1];
    setInterval(() => {
      this.time = new Date().getTime();
    }, 1000);
    if (this.$route.path === "/") {
      this.pageView = "page-view";
    } else {
      this.pageView = "page-view2";
    }
  },
  methods: {
    strpo(str) {
      if (str.length > 4) {
        str = str.slice(0, 4) + "···";
      } else {
        str = str;
      }
      return str;
    },
    initialize() {
      this.$store.commit("navigate", "nav-index");
      this.$store.commit("recoveryMember");
      this.$store.commit("initLang");
      this.checkLogin();
    },
    logout() {
      this.$http.post(this.host + "/uc/loginout", {}).then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.$Message.success(resp.message);
          this.$store.commit("setMember", null);
          setTimeout(() => {
            location.href = "/";
          }, 1500);
        } else {
          this.$Message.error(resp.message);
        }
      });
    },
    checkLogin() {
      this.$http.post(this.host + "/uc/check/login", {}).then(response => {
        var result = response.body;
        if (result.code == 0 && result.data == false) {
          this.$store.commit("setMember", null);
        }
      });
    },
    changelanguage: function(name) {
      if (name == "en") {
        this.$store.commit("setlang", "English");
        this.$i18n.locale = "en";
      }
      if (name == "cn") {
        this.$store.commit("setlang", "简体中文");
        this.$i18n.locale = "zh";
      }
    }
  }
};
</script>


<style scoped lang="scss">
.page-view2 .nav-pdf {
  color: #333;
  font-size: 14px;
}
.nav-pdf {
  font-size: 14px;
  color: #fff;
}
.page-view {
  height: 100%;
  .page-content {
    .time_download {
      padding: 0 80px;
      height: 35px;
      background-color: #000;
      line-height: 35px;
      overflow: hidden;
      .leftwrapper {
        float: left;
        .clock {
          display: inline-block;
          vertical-align: middle;
          color: #fff;
        }
        span {
          color: #fff;
          line-height: 35px;
          font-size: 12px;
        }
      }
      .rightwrapper {
        float: right;
        .appdownload {
          float: left;
          // padding: 0 20px;
          padding-right: 30px;
          .ivu-poptip-rel {
            a {
              color: #fff;
            }
            i.ivu-icon.ivu-icon-arrow-down-b {
              margin-left: 5px;
            }
          }
        }
        .ios,
        .andrio {
          float: left;
          text-align: center;
          img {
            width: 106px;
            height: 106px;
            margin: 0 auto;
          }
          .tips {
            height: 30px;
            img {
              width: 14px;
              height: 14px;
              margin-top: 5px;
              margin-right: 5px;
            }
            span {
              font-size: 14px;
              // color: #000;
            }
          }
        }
        .andrio {
          float: right;
        }
        .ivu-dropdown-rel a {
          color: #fff;
        }
        .ivu-select-dropdown {
          z-index: 901;
          #change_language_theme {
            li {
              background: #fff;
              color: #333;
            }
          }
        }
        .changelanguage {
          float: left;
          .languagelogo {
            float: left;
            padding-top: 5px;
            height: 45px;
            padding-left: 15px;
            margin-right: 12px;
          }
        }
      }
    }
    .layout {
      width: 100%;
      position: absolute;
      z-index: 10;
      .layout-ceiling {
        padding: 5px 80px;
        .layout-logo {
          width: 132px;
          height: 38px;
          background: url(./assets/images/logo.png) no-repeat;
          background-size: 100% 100%;
          float: left;
          position: absolute;
          z-index: 10;
        }
        .layout-ceiling-main {
          height: 50px;
          line-height: 50px;
          margin-left: 128px;
          .header_nav {
            li.ivu-menu-submenu.ivu-menu-item-active.ivu-menu-opened.ivu-menu-child-item-active {
              background: none;
              .ivu-menu {
                a {
                  &:hover {
                    li {
                      background: none;
                      color: #f0a70a;
                    }
                  }
                  li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
                    color: #f0a70a;
                  }
                }
                .router-link-exact-active.router-link-active {
                  li {
                    color: #f0a70a;
                  }
                }
              }
            }
            .ivu-menu-vertical.ivu-menu-light {
              background: none;
              &:after {
                width: 0;
              }
            }
          }
        }
        .rr {
          position: absolute;
          z-index: 10;
          right: 80px;
          .mymsg {
            float: left;
            padding-right: 20px;
            a {
              color: #fff;
              display: inline;
              padding-right: 20px;
              border-right: 1px solid #fff;
            }
          }
          .login_register {
            float: left;
            .ivu-menu {
              background: transparent;
              #login,
              #register {
                display: inline-block;
                width: 80px;
                height: 100%;
                text-align: center;
                background: #f0a70a;
                line-height: 25px;
                border-radius: 25px;
                margin-left: 20px;
                box-sizing: border-box;
                li {
                  height: 100%;
                }
                &:hover {
                  li {
                    color: #fff;
                    background: none;
                  }
                }
              }
              #register {
                background: none;
                border: 1px solid #fff;
              }
              #login .ivu-menu-item-active:not(.ivu-menu-submenu) {
                color: #fff;
              }
            }
          }
          .isLogin {
            .ivu-dropdown {
              display: block;
              float: left;
              .ivu-dropdown-rel {
                a {
                  margin-left: 0;
                }
              }
              .ivu-select-dropdown {
                position: absolute;
              }
            }
          }
        }
      }
    }
  }
}
.page-view2 {
  .page-content {
    .time_download {
      padding: 0 80px;
      height: 35px;
      background-color: #000;
      line-height: 35px;
      overflow: hidden;
      .leftwrapper {
        float: left;
        .clock {
          display: inline-block;
          vertical-align: middle;
          color: #fff;
        }
        span {
          color: #fff;
          line-height: 35px;
          font-size: 12px;
        }
      }
      .rightwrapper {
        float: right;
        .appdownload {
          float: left;
          // padding: 0 20px;
          padding-right: 30px;
          .ivu-poptip-rel {
            a {
              color: #fff;
              font-size: 12px;
            }
            i.ivu-icon.ivu-icon-arrow-down-b {
              margin-left: 5px;
            }
          }
        }
        .ios,
        .andrio {
          float: left;
          text-align: center;
          img {
            width: 106px;
            height: 106px;
            margin: 0 auto;
          }
          .tips {
            height: 30px;
            img {
              width: 14px;
              height: 14px;
              margin-top: 5px;
              margin-right: 5px;
            }
            span {
              font-size: 14px;
              // color: #000;
            }
          }
        }
        .andrio {
          float: right;
        }
        .ivu-dropdown-rel a {
          color: #fff;
        }
        .ivu-select-dropdown {
          z-index: 901;
          #change_language_theme {
            li {
              background: #fff;
              color: #333;
            }
          }
        }
        .changelanguage {
          float: left;
          .languagelogo {
            float: left;
            padding-top: 5px;
            height: 45px;
            padding-left: 15px;
            margin-right: 12px;
          }
        }
      }
    }
    .layout {
      background: #141e2b;
      // -moz-box-shadow:0px 2px 5px #f5f5f5;
      // -webkit-box-shadow:0px 2px 5px #f5f5f5;
      //  box-shadow:0px 2px 5px #f5f5f5;
      // border-bottom: 1px solid #eee;
      width: 100%;
      z-index: 10;
      position: absolute;
      .layout-ceiling {
        padding: 5px 80px;
        .layout-logo {
          width: 132px;
          height: 38px;
          background: url(./assets/images/logo.png) no-repeat;
          background-size: 100% 100%;
          float: left;
          position: relative;
        }
        .layout-ceiling-main {
          height: 50px;
          line-height: 50px;
          margin-left: 128px;
          .header_nav {
            li.ivu-menu-submenu.ivu-menu-item-active.ivu-menu-opened.ivu-menu-child-item-active {
              background: #141e2b;
              .ivu-menu {
                a {
                  &:hover {
                    li {
                      background: none;
                      color: #f0a70a;
                    }
                  }
                  li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
                    color: #f0a70a;
                  }
                  li {
                    color: #fff;
                  }
                }
                .router-link-exact-active.router-link-active {
                  li {
                    color: #f0a70a;
                  }
                }
              }
            }
            .ivu-menu-vertical.ivu-menu-light {
              &:after {
                width: 0;
              }
            }
          }
        }
        .rr {
          .mymsg {
            float: left;
            padding-right: 20px;
            a {
              color: #fff;
              display: inline;
              padding-right: 20px;
              border-right: 1px solid #fff;
            }
          }
          .login_register {
            float: left;
            .ivu-menu {
              background: #141e2b;
              #login,
              #register {
                display: inline-block;
                width: 80px;
                height: 100%;
                text-align: center;
                background: #f0a70a;
                line-height: 25px;
                border-radius: 25px;
                margin-left: 20px;
                box-sizing: border-box;
                li {
                  height: 100%;
                }
                &:hover {
                  li {
                    color: #fff;
                    background: none;
                  }
                }
              }
              #register {
                background: #eeee;
                border: none;
                &:hover {
                  li {
                    color: #333;
                  }
                }
                li {
                  color: #333;
                }
              }
              #login.router-link-exact-active.router-link-active {
                li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
                  color: #fff;
                }
              }
            }
          }
          .isLogin {
            a {
              color: #fff;
            }
            .ivu-dropdown {
              display: block;
              float: left;
              .ivu-dropdown-rel {
                a {
                  margin-left: 0;
                }
              }
              .ivu-select-dropdown {
                position: absolute;
              }
            }
          }
        }
      }
    }
  }
}
.wechatclick .api2 {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    img {
      width: 100px;
    }
    span {
      display: block;
      color: #333;
      text-align: center;
    }
  }
}
.appdownload {
  /deep/ .ivu-poptip-inner {
    background-color: #27313e;
    color: #fff;
    padding-top: 10px;
  }
  /deep/ .ivu-poptip-popper .ivu-poptip-arrow {
    border-bottom-color: #27313e;
  }
  /deep/ .ivu-poptip-popper .ivu-poptip-arrow:after {
    border-bottom-color: #27313e;
  }
}
</style>

<style lang="scss">
.container_test {
  padding-top: 60px;
}

.ivu-table-filter-list .ivu-table-filter-select-item {
  color: #ccc;
  &:hover {
    background-color: #27313e;
    color: #f0ac19;
  }
}
.ivu-table-filter-list .ivu-table-filter-select-item-selected {
  color: #f0ac19;
  &:hover {
    color: #f0ac19;
  }
}

.ivu-table-filter i.on {
  color: #fff;
}
//tips
.ivu-message {
  color: #333;
}
.ivu-poptip-inner {
  background-color: #27313e;
  color: #fff;
  .ivu-poptip-body-content-inner {
    color: #fff;
  }
}
.ivu-poptip-popper {
  // border-top-color:#27313e;
  .ivu-poptip-arrow:after {
    bottom: 0px !important;
    border-top-color: #27313e !important;
  }
}
/* 多选框 */
.exchange .ivu-checkbox-checked .ivu-checkbox-inner {
  background-color: #f0a70a;
  border-color: #f0a70a;
}
/* modal */
.ivu-modal-confirm-head {
  text-align: center;
  margin-bottom: 15px;
}
.ivu-modal-header p,
.ivu-modal-header-inner {
  color: #fff;
}
.ivu-modal-body {
  border-radius: 5px;
  .ivu-modal-confirm {
    .ivu-modal-confirm-body {
      font-size: 14px;
    }
  }
}
.ivu-modal-confirm-footer .ivu-btn-primary {
  background-color: #f0a70a;
  border-color: #f0a70a;
}
.ivu-modal-confirm-footer .ivu-btn-text {
  &:hover {
    color: #f0a70a;
  }
}
.ivu-table-wrapper {
  background-color: #192330;
  .ivu-table {
    box-shadow: 0px 0px 4px #27313e;
    background-color: #192330;
    color: #ccc;
    &:before {
      background: transparent;
    }
    &:after {
      background: #192330;
    }
    .ivu-table-header {
      th {
        background-color: #27313e;
        border: none;
        color: #ccc;
      }
    }
    .ivu-table-row td {
      background-color: #192330;
      border: none;
      border-bottom: 1px solid #27313e;
      color: #fff;
    }
  }
}
.ivu-table td {
  background-color: #192330;
  border-bottom: 1px solid #27313e;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: none;
  &:after {
    background: none;
  }
}
.ivu-select-dropdown .ivu-select-item {
  color: #ccc;
  padding: 6px 16px;
}

.page-view {
  height: 100%;
  .page-content {
    .layout {
      .layout-ceiling {
        .layout-ceiling-main {
          .header_nav {
            .ivu-menu-vertical.ivu-menu-light {
              .ivu-menu-submenu-title {
                i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                  &:before {
                    content: "";
                  }
                }
              }
            }
          }
          .rr {
            .login_register .ivu-menu-submenu-title .ivu-icon {
              &:before {
                content: "";
              }
            }
          }
        }
      }
    }
  }
}
.page-view2 {
  height: 100%;
  .page-content {
    .layout {
      .layout-ceiling {
        .layout-ceiling-main {
          .header_nav {
            .ivu-menu-vertical.ivu-menu-light {
              .ivu-menu-submenu-title {
                i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                  &:before {
                    content: "";
                  }
                }
              }
            }
          }
          .rr {
            .login_register .ivu-menu-submenu-title .ivu-icon {
              &:before {
                content: "";
              }
            }
          }
        }
      }
    }
  }
}
html,
body {
  height: 100%;
  font-size: 14px;
  background: #0b1520;
  color: #fff;
}

/*自定义滚动条样式*/

::-webkit-scrollbar {
  width: 10px;
  background: #192330;
}

::-webkit-scrollbar-thumb {
  background: #27313e;
  border-radius: 25px;
}

.ivu-carousel-dots li button {
  width: 30px;
  height: 10px;
  border-radius: 14px;
}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background: #18202a;
}

#checkbox {
  width: 10px;
}

// .login_right {
//   position: absolute;
//   background: #fff;
//   width: 350px;
//   height: 510px;
//   top: 35px;
//   right: 50px;
// }

.login_title {
  color: #000;
  text-align: center;
  height: 80px;
  font-size: 25px;
}
.login_right .ivu-select-dropdown {
  background: #fff;
}

.ivu-form-inline .ivu-form-item {
  display: block;
  margin-right: 0;
}

.layout {
  position: absolute;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-ceiling-main {
  height: 50px;
  line-height: 50px;
  margin-left: 128px;
}

.layout-ceiling-main .rr {
  float: right;
}

.layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 0;
}

.layout-ceiling-main .ivu-menu-item {
  font-size: 14px;
}

.layout-ceiling-main a {
  color: #fff;
  display: inline-block;
  line-height: 40px;
  height: 40px;
  text-align: center;
  margin-left: 38px;
  /*padding: 0 15px;*/
}

.header_nav {
  float: left;
}

.ivu-dropdown-rel a {
  width: 100%;
}

.ivu-dropdown-menu {
  width: 100px;
}

.layout-ceiling-main .ivu-select-dropdown {
  background: #27313e;
  margin-left: 25px;
  .ivu-dropdown-item {
    color: #ccc;
    &:hover {
      color: #f0ac19;
    }
  }
}

.ivu-select-dropdown a {
  width: 100%;
  text-align: left;
  margin: 0;
}

// .ivu-dropdown-item:hover {
//   background: #27313e;
// }

// .ivu-dropdown-item {
//   color: #fff;
// }
.ivu-dropdown-item:hover {
  background-color: #27313e;
  color: #f0ac19;
}
.ivu-dropdown-item img {
  width: 14px;
  vertical-align: middle;
}

.ivu-radio-inner:after {
  background: #18202a;
}

/*安全中心*/

.user_center {
  height: 900px;
}

.ivu-menu-item {
  text-align: center;
}

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
  padding-left: 0 !important;
  padding-right: 0;
  color: #fff;
  font-size: 14px;
  border-right: 0 !important;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
  background: #1855fd !important;
}

.rr .ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
}

.layout_menu_right {
  margin-left: 3%;
  background: #18202a;
  color: #fff;
  padding-bottom: 130px;
}

.menu_right_title {
  font-size: 16px;
  line-height: 45px;
  margin: 0 10px;
  padding-left: 20px;
  border-bottom: 1px solid #263142;
}

.category .ivu-radio-group.ivu-radio-group-button {
  width: 100%;
}

.category .ivu-radio-group label {
  font-size: 14px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper {
  background: #28313e;
  color: #979797;
  border: 0;
  padding: 0 25px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper-checked {
  color: #fff;
  background: #2f3d52;
  box-shadow: none;
}

.category .ivu-radio-wrapper span {
  padding-left: 0;
}

.purse_address_left {
  float: left;
  width: 86%;
}

.purse_address p {
  font-size: 10px;
  line-height: 25px;
  color: #979797;
}

.purse_address_left_icon {
  line-height: 40px;
  height: 40px;
  width: 100%;
}

.purse_address_left_icon img {
  vertical-align: middle;
  margin-right: 10px;
}

.purse_address span {
  font-size: 14px;
  float: left;
  color: #fff;
  padding: 0 20px;
  background: #28313e;
  width: 21%;
}

.purse_address_left_icon label {
  float: left;
  width: 72%;
  height: 40px;
  border: 2px solid #28313e;
  padding-left: 20px;
}

#qrcode canvas {
  width: 120px;
}

#qrcode img {
  width: 100%;
}

.chart_container #chart_updated_time {
  float: left;
}

// 粘住底部布局
.page-content {
  min-height: 100%;
  padding-bottom: 200px;
}

.footer {
  width: 100%;
  overflow: hidden;
  margin-top: -200px;
}
.footer_content {
  height: 200px;
  padding: 50px 10%;
  color: #53575c;
  color: rgba(255, 255, 255, 0.8);
  background: #192330;
}

.footer_left {
  float: left;
  font-size: 14px;
}

.footer_left img {
  margin: 15px 0;
}

.footer_left p {
  margin: 10px 0;
  color: rgba(255, 255, 255, 0.6);
}

.footer_right {
  float: right;
  /*margin-top: 15px;*/
  text-align: left;
  /* margin-right: 20px; */
}

.footer_right ul {
  float: left;
  margin: 0 30px;
}

.footer_right ul li a {
  color: #53575c;
  color: rgba(255, 255, 255, 0.6);
  line-height: 25px;
  display: block;
}

.footer_title {
  font-size: 15px;
  height: 35px;
}

.ivu-select-selected-value {
  color: #bbbec4;
}

/*法币交易*/

.ivu-col {
  text-align: center;
}

.page-view {
  .page-content {
    .layout {
      .layout-ceiling {
        .rr {
          .login_register {
            .ivu-menu-light.ivu-menu-vertical
              .ivu-menu-item-active:not(.ivu-menu-submenu) {
              color: #fff;
            }
          }
          .isLogin {
            .ivu-dropdown {
              display: inline-block;
              .ivu-select-dropdown {
                padding: 0;
                margin: 0;
                .ivu-dropdown-menu {
                  .ivu-dropdown-item {
                    // background: #27313e;
                    // color: #ccc;
                    border-radius: 5px;
                    // &:hover {
                    //   background: #27313e;
                    //   color: #ccc;
                    // }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.changelanguage {
  .ivu-dropdown {
    .ivu-select-dropdown {
      z-index: 901;
    }
  }
}
// 重置分页器颜色
.ivu-page-next,
.ivu-page-prev {
  background-color: #192330;
}
.ivu-page-item {
  background-color: #192330;
  border-color: #27313e;
}
.ivu-page-item-jump-next,
.ivu-page-item-jump-prev,
.ivu-page-next,
.ivu-page-prev {
  border-color: #27313e;
}
.ivu-page-item-active {
  // background-color: #f0ac19;
  border-color: #f0ac19;
  // color: #fff;
}
.ivu-page-next:hover,
.ivu-page-prev:hover {
  border-color: #f0ac19;
}
.ivu-page-next:hover a,
.ivu-page-prev:hover a {
  color: #f0ac19;
}

.ivu-page-item-jump-prev a,
.ivu-page-item-jump-next a {
  color: #666;
}
.ivu-page-item-jump-prev a:hover,
.ivu-page-item-jump-next a:hover {
  color: #f0ac19;
}
.ivu-page-item:hover {
  border-color: #f0ac19;
}
.ivu-page-item:hover a {
  color: #f0ac19;
}
.ivu-page-item.ivu-page-item-active a {
  color: #f0ac19;
}
.ivu-page-disabled {
  a {
    cursor: not-allowed;
    .ivu-icon {
      cursor: not-allowed;
    }
  }
}
/*input框样式重置*/
.ivu-input,
.ivu-input-number-input,
.ivu-input-number {
  background-color: #192330;
  color: #fff;
  border-color: #27313e;
  &:hover {
    border-color: #27313e;
  }
  &:focus {
    border-color: #27313e;
    box-shadow: none;
  }
}
.ivu-input[disabled]:hover,
fieldset[disabled] .ivu-input:hover {
  border-color: #27313e;
}
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  background-color: #27313e;
}
.ivu-input-number-focused {
  box-shadow: none;
}
.ivu-input-number:focus {
  box-shadow: none;
}
.ivu-form .ivu-form-item-label {
  color: #ccc;
}
.ivu-input-number-handler-wrap {
  background: #27313e;
  border-left: 1px solid #192330;
}
.ivu-input-number-handler {
  border-top: 1px solid #192330;
}
.ivu-input-number-handler:hover .ivu-input-number-handler-up-inner,
.ivu-input-number-handler:hover .ivu-input-number-handler-down-inner {
  color: #ccc;
}
.ivu-input-group-append,
.ivu-input-group-prepend {
  color: #ccc;
}
/*下拉框样式重置*/
.ivu-select-selection {
  background-color: #192330;
  color: #fff;
  border: 1px solid #27313e;
}
.ivu-select-selection:hover {
  border-color: #27313e;
}
.ivu-select-visible .ivu-select-selection {
  border-color: #27313e;
  box-shadow: none;
}
.ivu-select-selected-value {
  color: #fff;
}
.ivu-select-selection-focused {
  border-color: #27313e;
}
.ivu-select-dropdown {
  background-color: #192330;
}

.ivu-select-disabled .ivu-select-selection {
  background-color: #27313e;
}
.ivu-select-disabled .ivu-select-selection:hover {
  border-color: #27313e;
}
/*下拉框*/
.ivu-select-item-selected {
  background-color: #192330;
  color: #ccc;
}
.ivu-select-item-focus {
  background-color: #192330;
}
.ivu-select-item:hover {
  background-color: #27313e;
  // color:#ccc;
  color: #f0ac19;
}
.ivu-select-multiple .ivu-select-item-selected {
  background-color: #192330;
  color: #f0ac19;
}
.ivu-select-multiple .ivu-select-item-focus,
.ivu-select-multiple .ivu-select-item-selected:hover {
  background-color: #192330;
}
.ivu-select-multiple .ivu-select-item-selected:after {
  color: #f0ac19;
}

.ivu-select-item-selected,
.ivu-select-item-selected:hover {
  background-color: #192330;
  color: #f0ac19;
}
// chexkboxes
.ivu-checkbox-inner {
  background-color: #192330;
}

// 开关
.ivu-switch {
  border: 1px solid #27313e;
  background-color: #192330;
}
.ivu-switch:after {
  background-color: #ccc;
}
// tag
.ivu-tag {
  border: 1px solid #27313e;
  border-radius: 3px;
  background: #192330;
}
.ivu-tag-text {
  color: #ccc;
}
/*table组件样式重置*/
.ivu-table-wrapper {
  border: none;
}
.ivu-table-wrapper > .ivu-spin-fix {
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  border-color: #fff;
}
.ivu-spin-fix {
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  border-color: #fff;
}
/*加载样式重置*/
.ivu-spin-dot {
  background: #f0ac19;
}
.ivu-tabs-bar {
  border-color: #f5f5f5;
}
/*日期组件样式重置*/
.ivu-picker-panel-icon-btn {
  &:hover {
    color: #f0ac19;
  }
}
.ivu-date-picker-focused input {
  border-color: #1f2936;
  box-shadow: none;
}
.ivu-date-picker-cells-focused em {
  // -moz-box-shadow: 0 0 0 1px #f0ac19 inset;
  // -webkit-box-shadow: 0 0 0 1px #f0ac19 inset;
  // box-shadow: 0 0 0 1px #f0ac19 inset;
  box-shadow: none;
  color: #f0ac19;
  &:after {
    // background: #27313e;
  }
}
.ivu-date-picker-cells-cell {
  color: #fff;
}
.ivu-date-picker-cells-cell-selected em,
.ivu-date-picker-cells-cell-selected:hover em {
  background: #27313e;
  color: #f0ac19;
}
.ivu-date-picker-cells-cell-today em:after {
  background: #27313e;
}
.ivu-date-picker-cells-cell-range:before {
  background: rgba(240, 167, 10, 0.2);
}
.ivu-date-picker-cells-cell:hover em {
  background: #27313e;
  color: #f0ac19;
}
/*按钮样式重置*/

.ivu-btn {
  border: none;
}
.ivu-btn-primary:hover {
  background: #f0ac19;
  border-color: #f0ac19;
}
.ivu-btn.ivu-btn-default {
  background-color: #27313e;
  color: #ccc;
  &:hover {
    color: #f0a70a;
    // background: #27313e;
    // border: 1px solid #f0a70a;
  }
  &:active {
    color: #f0a70a;
    // border: 1px solid #f0a70a;
    // background: #27313e;
  }
}
// primary按钮
.ivu-btn-text {
  color: #ccc;
  border: 1px solid #27313e;
}
.ivu-btn-primary {
  background-color: #f0ac19;
  border-color: #f0ac19;
}
.ivu-btn-text:hover {
  background-color: transparent;
  color: #f0ac19;
}
.ivu-input-group-append,
.ivu-input-group-prepend {
  background-color: #27313e;
  border: 1px solid #27313e;
}
.ivu-form-item-error .ivu-input-group-append,
.ivu-form-item-error .ivu-input-group-prepend {
  background-color: #27313e;
  border: 1px solid #27313e;
}
.ivu-form-item-error .ivu-input,
.ivu-form-item-error .ivu-input:focus,
.ivu-form-item-error .ivu-input:hover {
  border: 1px solid #27313e;
  box-shadow: none;
}

/*radio样式重置*/
.ivu-radio-checked .ivu-radio-inner {
  border-color: #f0ac19;
}
.ivu-radio-checked:hover {
  .ivu-radio-inner {
    border-color: #f0ac19;
  }
}
.ivu-radio-inner:after {
  background: #f0ac19;
}
.ivu-switch-checked {
  border-color: #f0ac19;
  background-color: #f0ac19;
}
.ivu-switch:focus {
  box-shadow: none;
}
.ivu-radio-focus {
  box-shadow: none;
}

//弹窗
.ivu-modal-content {
  background-color: #192330;
}
.ivu-modal-header {
  border-bottom: 1px solid #27313e;
}
.ivu-modal-confirm-head-icon-confirm {
  color: #fff;
}
.ivu-modal-header p {
  color: #fff;
}
.ivu-modal-footer {
  border-top: 1px solid #27313e;
}
/*排序小箭头样式重置*/
.ivu-table-sort i.on {
  color: #f0ac19;
}
.ivu-table-sort i:hover {
  color: #f0ac19;
}
.ivu-modal-confirm-head-icon {
  font-size: 24px;
}
.ivu-modal-confirm-body {
  color: #fff;
  padding-left: 0;
}
.ivu-modal-confirm-head-title {
  color: #fff;
  margin-left: 5px;
}
.ivu-modal-confirm-footer {
  padding-top: 10px;
  border-top: 1px solid #27313e;
}
// 上传组件
.ivu-upload-list-file:hover {
  background-color: #27313e;
}
</style>
<style lang="less">
// @import './assets/css/theme.less';
// body{
//   background-color: @body-background;
// }
</style>