<template>
  <div>
    <div id="fullpage">
      <div class="section" id="page1">
        <!-- <div v-if="lang==='简体中文'"> -->
        <div v-if="picList.length==0" class="spin-wrap" style="height:500px;">
          <Spin size="large" fix></Spin>
        </div>
        <Carousel v-else autoplay :arrow="showArrow" :autoplay-speed="speed" v-model="valueCal">
          <CarouselItem v-for="(item,index) in picList" :key="index">
            <div :style="'background-image: url('+item.url+')'" class="carousel-item">
              <a v-show="item.linkUrl&&item.linkUrl!=' '&&item.linkUrl!='1'" style="display:block;width:100%;height: 100%;" :href="item.linkUrl" target="_blank"></a>
            </div>
          </CarouselItem>
        </Carousel>
        <!-- </div> -->
        <!-- <div v-else>
          <Carousel autoplay :arrow="showArrow" :autoplay-speed="speed" v-model="valueCal">
            <CarouselItem v-for="(item,index) in bannerImgsEn" :key="index">
              <div :style="'background-image: url('+item.url+')'" class="carousel-item">
                <a v-show="item.linkUrl!=''&&item.linkUrl!='1'" style="display:block;width:100%;height: 100%;" :href="item.linkUrl" target="_blank"></a>
              </div>
            </CarouselItem>
          </Carousel>
        </div> -->
      </div>
      <div id="pagetips">
        <div class="topnav">
          <div class="carl">
            <div class="laba">
              <img src="../../assets/images/laba.png" style="height:14px;margin-right:4px;">
            </div>
            <div class="carsoul">
              <!-- v-if="titleLang(item.title)===lang" @mouseover="stop()" @mouseout="startMove()" -->
              <div v-for="(item,index) in FAQList" class="cal_content1">
                <div v-for="(con,j) in item" class="cal_content" @mouseover="stop()" @mouseout="startMove()">
                  <router-link :to="{path: '/notice/index', query: { 'id': con.id }}">{{strde(con.title)}}</router-link>
                </div>
              </div>
            </div>
            <div class="more">
              <router-link to="/notice">更多>></router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="section" id="page2">
        <div class="page2nav">
          <ul class="brclearfix">
            <li v-show="!(index==3&&!isLogin)" v-for="(item,index) in indexBtn" @click="addClass(index)" :class="{'active':index==choseBtn,'ivu-btn-default':index!=choseBtn}" :key="index">{{item.text}}</li>
          </ul>
        </div>
        <div class="ptjy">
          <Table v-if="choseBtn==3" :columns="favorColumns" :data="dataIndex" class="tables" :disabled-hover="true" :loading="loading"></Table>
          <Table v-else :columns="coins.columns" :data="dataIndex" class="tables" :disabled-hover="true" :loading="loading"></Table>
        </div>
      </div>
      <div class="section" id="page4">
        <ul>
          <li>
            <div><img src="../../assets/images/feature_safe.png" alt=""></div>
            <p class="title">{{$t('description.title1')}}</p>
            <p>{{$t('description.message1')}}</p>
          </li>
          <li>
            <div><img src="../../assets/images/feature_fast.png" alt=""></div>
            <p class="title">{{$t('description.title2')}}</p>
            <p>{{$t('description.message2')}}</p>
          </li>
          <li>
            <div><img src="../../assets/images/feature_experience.png" alt=""></div>
            <p class="title">{{$t('description.title3')}}</p>
            <p>{{$t('description.message3')}}</p>
          </li>
        </ul>
      </div>
      <div class="section" id="page5">
        <div class="phone_image"></div>
        <ul class="download">
          <li class="qrcode">扫描二维码，下载APP</li>
          <li class="wrapper">
            <div class="download_app">
              <img src="../../assets/images/app_andraio.png">
            </div>
            <div class="abstract">
              <div class="image">
                <Icon type="logo-android" size="30" color="#fff"/>
              </div>
              <div class="content">
                <span>Android</span><br>
                <span>仅支持4.4及以上系统</span>
              </div>
            </div>
          </li>
          <li class="wrapper">
            <div class="download_app">
              <img src="../../assets/images/app_ios.png">
            </div>
            <div class="abstract">
              <div class="image"><Icon type="logo-apple" size="30" color="#fff"/></div>
              <div class="content">
                <span>iPhone</span>
              </div>
            </div>
          </li>
          <!--<li>-->
          <!--<a @click="donwload(0)"><img src="../../assets/images/iosdown.png" alt=""></a>-->
          <!--</li>-->
          <!--<li>-->
          <!--<a @click="donwload(1)"><img src="../../assets/images/anddown.png" alt=""></a>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
    <div id="onlineservice">
      <a href="http://kefu.caymanex.pro:80/im/text/15FwEk.html" target="_blank"></a>
    </div>
  </div>
</template>
<script>
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var moment = require("moment");
import SvgLine from "@components/exchange/SvgLine.vue";
import $ from "@js/jquery.min.js";
export default {
  components: { SvgLine },
  data() {
    let self = this;
    return {
      loading: false,
      // progress: 0,
      // already: 0,
      percent: 0,
      timer3: null,
      pageNo: 1,
      pageSize: 50,
      totalNum: 0,
      FAQList: [],
      // safetyAndAssoction: 0,
      // currentBonusETHBnous: 0,
      yesDayCashDividensBonusETH: 0,
      // yesDayMineAmountBHB: 0,
      CNYRate: null,
      dataIndex: [],
      pageNo: 1,
      pageSize: 50,
      totalNum: 0,
      FAQList: [],
      favorColumns: [
        {
          title: self.$t("service.favor"),
          align: "center",
          key: "collection",
          width: 60,
          render: (h, params) => {
            let flag = this.isLogin;
            return h("Icon", {
              props: {
                color: "#f0a70a",
                size: "18",
                type: params.row.isFavor
                  ? "ios-star"
                  : "ios-star-outline"
              },
              nativeOn: {
                click: () => {
                  if (this.isLogin) {
                    event.stopPropagation(); //阻止事件冒泡
                    if (
                      event.currentTarget.className ==
                      "ivu-icon ivu-icon-ios-star"
                    ) {
                      // 解除收藏
                      this.cancelCollect(params.index, params.row);
                      event.currentTarget.className ==
                        "ivu-icon ivu-icon-ios-star-outline";
                    } else {
                      // 收藏
                      this.collect(params.index, params.row);
                      event.currentTarget.className =
                        "ivu-icon ivu-icon-ios-star";
                    }
                  } else {
                    this.$Message.warning("请先登录");
                  }
                }
              }
            });
          }
        },
        {
          title: self.$t("service.symbol"),
          align: "center",
          width: 70,
          key: "symbol"
        },
        {
          title: self.$t("service.NewPrice"),
          align: "center",
          key: "price",
          minWidth:120,
          sortable: true,
          sortMethod: function(a, b, type) {
            let a1 = parseFloat(a);
            let b1 = parseFloat(b);
            if (type == "asc") {
              return a1 - b1;
            } else {
              return b1 - a1;
            }
          },
          render: function(h, params) {
            // var rmb = self.round(self.mul(params.row.price, 6.5), 2);
            // if (self.CNYRate != null)
            //   rmb = self.round(self.mul(params.row.price, self.CNYRate), 2);
            let CNYRate = self.CNYRate || 6.5,
              rmb = self.round(self.mul(params.row.usdRate, CNYRate), 2);
            const isgreen =
              parseFloat(params.row.rose) < 0 ? "none" : "inline-block";
            const nogreen =
              parseFloat(params.row.rose) < 0 ? "inline-block" : "none";
            return h("div", [
              h("span", {}, params.row.price + " /￥" + rmb),
              h(
                "Icon",
                {
                  props: {
                    type: "arrow-up-c"
                  },
                  style: {
                    display: isgreen,
                    fontSize: "16px",
                    marginLeft: "5px",
                    verticalAlign: "middle"
                  },
                  class: {
                    green: true
                  }
                },
                "↑"
              ),
              h(
                "Icon",
                {
                  props: {
                    type: "arrow-down-c"
                  },
                  style: {
                    display: nogreen,
                    fontSize: "16px",
                    marginLeft: "5px",
                    verticalAlign: "middle"
                  },
                  class: {
                    red: true
                  }
                },
                "↓"
              )
            ]);
          }
        },
        {
          title: self.$t("service.Change"),
          align: "center",
          key: "rose",
          minWidth:70,
          sortable: true,
          sortMethod: function(a, b, type) {
            let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
            let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
            if (type == "asc") {
              return a1 - b1;
            } else {
              return b1 - a1;
            }
          },
          render: (h, params) => {
            const row = params.row;
            const className = parseFloat(row.rose) < 0 ? "red" : "green";
            return h(
              "span",
              {
                attrs: {
                  class: className
                }
              },
              row.rose
            );
          }
        },
        {
          title: self.$t("service.high"),
          align: "center",
          key: "high",
          render: (h, params) => {
            return h("div", {}, params.row.high);
          }
        },
        {
          title: self.$t("service.low"),
          align: "center",
          key: "high",
          render: (h, params) => {
            return h("div", {}, params.row.low);
          }
        },
        {
          title: self.$t("service.ExchangeNum"),
          align: "center",
          key: "volume",
          // width: 110,
          sortable: true,
          sortMethod: function(a, b, type) {
            let a1 = parseFloat(a);
            let b1 = parseFloat(b);
            if (type == "asc") {
              return a1 - b1;
            } else {
              return b1 - a1;
            }
          }
        },
        // {
        //   title: self.$t("service.OpenPrice"),
        //   align: "center",
        //   key: "open",
        //   width: 150,
        //   sortable: true,
        //   sortMethod: function(a, b, type) {
        //     let a1 = parseFloat(a);
        //     let b1 = parseFloat(b);
        //     if (type == "asc") {
        //       return a1 - b1;
        //     } else {
        //       return b1 - a1;
        //     }
        //   }
        // },

        {
          title: self.$t("service.PriceTrend"),
          align: "center",
          render: function(h, params) {
            let valus = null;
            let len = params.row.trend.length;
            valus =
              len > 0
                ? params.row.trend
                : [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ];
            return h(SvgLine, {
              props: {
                values: valus,
                rose: params.row.rose,
                width: 100,
                height: 40
              }
            });
          }
        },
        {
          title: self.$t("service.Exchange"),
          // align: "center",
          key: "buyBtn",
          width: 60,
          render: function(h, params) {
            return h("div", [
              h("img", {
                attrs: {
                  src: require("../../assets/images/to_del.png")
                },
                style: {
                  width: "18px",
                  cursor: "pointer",
                  marginLeft: "10px",
                  marginTop: "8px"
                },
                on: {
                  click: function() {
                    self.$router.push("/exchange/" + params.row.href);
                  }
                }
              })
            ]);
          }
        }
      ],
      //当前市场上的交易币种，按交易对分
      coins: {
        _map: [],
        USDT: [],
        BTC: [],
        ETH: [],
        favor: [],
        columns: [
          {
            title: self.$t("service.favor"),
            align: "center",
            key: "collection",
            width: 60,
            // renderHeader: (h, params) => {
            // return h("Icon", {
            //   props: {
            //     color: "#f0a70a",
            //     size: "18",
            //     type: "android-star-outline"
            //   }
            // });
            // },
            render: (h, params) => {
              let flag = this.isLogin;
              return h("Icon", {
                props: {
                  color: "#f0a70a",
                  size: "18",
                  type: params.row.isFavor
                    ? "ios-star"
                    : "ios-star-outline"
                },
                nativeOn: {
                  click: (event) => {
                    if (this.isLogin) {
                      event.stopPropagation(); //阻止事件冒泡
                      if (
                        event.currentTarget.className ==
                        "ivu-icon ivu-icon-ios-star"
                      ) {
                        // 解除收藏
                        this.cancelCollect(params.index, params.row);
                        event.currentTarget.className ==
                          "ivu-icon ivu-icon-ios-star-outline";
                      } else {
                        // 收藏
                        this.collect(params.index, params.row);
                        event.currentTarget.className =
                          "ivu-icon ivu-icon-ios-star";
                      }
                    } else {
                      this.$Message.warning("请先登录");
                    }
                  }
                }
              });
            }
          },
          {
            title: self.$t("service.COIN"),
            align: "center",
            key: "coin",
            width: 70,
            render: function(h, params) {
              const className = params.row.href + "icon" + " indexicon";
              var iconName = "";
              if (params.row.coin == "BTC") {
                iconName = "比特币";
              } else if (params.row.coin == "ETH") {
                iconName = "以太币";
              } else if (params.row.coin == "GCC") {
                iconName = "银河链";
              }
              return h("div", [
                h(
                  "span",
                  {
                    attrs: {
                      //class: className
                    }
                  },
                  params.row.memberName
                ),
                h("span", {}, params.row.coin)
              ]);
            }
          },
          {
            title: self.$t("service.NewPrice"),
            align: "center",
            key: "price",
            minWidth: 120,
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
            render: function(h, params) {
              // var rmb = self.round(self.mul(params.row.price, 6.5), 2);
              // if (self.CNYRate != null)
              //   rmb = self.round(self.mul(params.row.price, self.CNYRate), 2);
              let CNYRate = self.CNYRate || 6.5,
                rmb = self.round(self.mul(params.row.usdRate, self.CNYRate), 2);
              const isgreen =
                parseFloat(params.row.rose) < 0 ? "none" : "inline-block";
              const nogreen =
                parseFloat(params.row.rose) < 0 ? "inline-block" : "none";
              return h("div", [
                h("span", {}, params.row.price + " /￥" + rmb),
                h(
                  "Icon",
                  {
                    props: {
                      type: "arrow-up-c"
                    },
                    style: {
                      display: isgreen,
                      fontSize: "16px",
                      marginLeft: "5px",
                      verticalAlign: "middle"
                    },
                    class: {
                      green: true
                    }
                  },
                  "↑"
                ),
                h(
                  "Icon",
                  {
                    props: {
                      type: "arrow-down-c"
                    },
                    style: {
                      display: nogreen,
                      fontSize: "16px",
                      marginLeft: "5px",
                      verticalAlign: "middle"
                    },
                    class: {
                      red: true
                    }
                  },
                  "↓"
                )
              ]);
            }
          },
          {
            title: self.$t("service.Change"),
            align: "center",
            key: "rose",
            minWidth: 70,
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
              let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
            render: (h, params) => {
              const row = params.row;
              const className = parseFloat(row.rose) < 0 ? "red" : "green";
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                row.rose
              );
            }
          },
          {
            title: self.$t("service.high"),
            align: "center",
            key: "high",
            render: (h, params) => {
              return h("div", {}, params.row.high);
            }
          },
          {
            title: self.$t("service.low"),
            align: "center",
            key: "high",
            render: (h, params) => {
              return h("div", {}, params.row.low);
            }
          },
          {
            title: self.$t("service.ExchangeNum"),
            align: "center",
            key: "volume",
            // minWidth: 110,
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            }
          },
          // {
          //   title: self.$t("service.OpenPrice"),
          //   align: "center",
          //   key: "open",
          //   width: 150,
          //   sortable: true,
          //   sortMethod: function(a, b, type) {
          //     let a1 = parseFloat(a);
          //     let b1 = parseFloat(b);
          //     if (type == "asc") {
          //       return a1 - b1;
          //     } else {
          //       return b1 - a1;
          //     }
          //   }
          // },
          {
            title: self.$t("service.PriceTrend"),
            align: "center",
            render: function(h, params) {
              let valus = null;
              let len = params.row.trend.length;
              valus =
                len > 0
                  ? params.row.trend
                  : [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ];
              return h(SvgLine, {
                props: {
                  values: valus,
                  rose: params.row.rose,
                  width: 100,
                  height: 40
                }
              });
            }
          },
          {
            title: self.$t("service.Exchange"),
            align: "center",
            key: "buyBtn",
            width: 60,
            // minWidth: 60,
            render: function(h, params) {
              return h("div", [
                h("img", {
                  attrs: {
                    src: require("../../assets/images/to_del.png")
                  },
                  style: {
                    width: "18px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    marginTop: "8px"
                  },
                  on: {
                    click: function() {
                      self.$router.push("/exchange/" + params.row.href);
                    }
                  }
                })
              ]);
            }
          }
        ]
      },
      indexBtn: [
        {
          text: this.$t("service.USDT")
        },
        {
          text: this.$t("service.BTC")
        },
        {
          text: this.$t("service.ETH")
        },
        {
          text: this.$t("service.CUSTOM")
        }
      ],
      choseBtn: 0,
      valueCal: 0,
      showArrow: "never",
      speed: 5000,
      symbol: "",
      usdtData: [],
      usdtList: [],
      btcList: [],
      ethList: [],
      picList: []
    };
  },
  created: function() {
    this.stop();
    this.init();
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    lang: function() {
      return this.$store.state.lang;
    }
  },
  watch: {
    lang: function() {
      this.updateLangData();
    }
  },
  mounted: function() {
    this.getCNYRate();
    this.getSymbol();
  },
  methods: {
    strde(str) {
      str = str.trim();
      return str.length > 30 ? str.slice(0, 30) + "..." : str;
    },
    noticedeail(id) {
      var path = { path: "/notice/index", query: { id: id } };
      this.$router.push(path);
    },
    titleLang(str) {
      const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(str)) {
        return "简体中文";
      } else {
        return "English";
      }
    },
    updateLangData() {
      this.indexBtn = [
        {
          text: this.$t("service.USDT")
        },
        {
          text: this.$t("service.BTC")
        },
        {
          text: this.$t("service.ETH")
        },
        {
          text: this.$t("service.CUSTOM")
        }
      ];

      this.coins.columns[0].title = this.$t("service.favor");
      this.coins.columns[1].title = this.$t("service.COIN");
      this.coins.columns[2].title = this.$t("service.NewPrice");
      this.coins.columns[3].title = this.$t("service.Change");
      this.coins.columns[4].title = this.$t("service.high");
      this.coins.columns[5].title = this.$t("service.low");
      this.coins.columns[6].title = this.$t("service.ExchangeNum");
      this.coins.columns[7].title = this.$t("service.PriceTrend");
      this.coins.columns[8].title = this.$t("service.Exchange");

      this.favorColumns[0].title = this.$t("service.favor");
      this.favorColumns[1].title = this.$t("service.symbol");
      this.favorColumns[2].title = this.$t("service.NewPrice");
      this.favorColumns[3].title = this.$t("service.Change");
      this.favorColumns[4].title = this.$t("service.high");
      this.favorColumns[5].title = this.$t("service.low");
      this.favorColumns[6].title = this.$t("service.ExchangeNum");
      this.favorColumns[7].title = this.$t("service.PriceTrend");
      this.favorColumns[8].title = this.$t("service.Exchange");

      // this.coins.columns[4].title = this.$t("service.OpenPrice");
    },
    openActivity(url) {
      // console.log(url);
    },
    init() {
      this.$store.commit("navigate", "nav-index");
      this.$store.state.HeaderActiveName = "1-1";
      this.loadPicData();
      this.addClass(0);
      // this.getmoneyData();
      this.loadDataPage(this.pageNo);
    },
    stop: function() {
      clearInterval(this.timer3);
    },
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      } else {
        return getComputedStyle(obj, false)[attr];
      }
    },
    move() {
      clearInterval(this.timer3);
      var self = this;
      this.cal = document.getElementsByClassName("carsoul")[0];
      this.list = this.cal.getElementsByClassName("cal_content1");
      let l = this.list[0].cloneNode(true);
      this.cal.appendChild(l);
      this.startMove();
    },
    startMove() {
      clearInterval(this.timer3);
      var self = this;
      let len = this.list.length;
      let maxT = 40 * len;
      this.timer3 = setInterval(() => {
        let t = parseInt(this.getStyle(this.cal, "top"));
        t -= 40;
        if (t <= -maxT) {
          t = 0;
          $(".carsoul").animate({ top: "0px" }, 0);
        }
        let p = t + "px";
        $(".carsoul").animate({ top: p });
      }, 3000);
    },
    loadDataPage(pageIndex) {
      var param = {};
      (param["pageNo"] = pageIndex),
        (param["pageSize"] = this.pageSize),
        this.$http
          .post(this.host + this.api.uc.announcement, param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              if (resp.data.content.length == 0) return;
              let FAQList = resp.data.content;
              let len = FAQList.length;
              let n = 2; //假设每行显示2个
              let lineNum = len % 2 === 0 ? len / 2 : Math.floor(len / 2 + 1);
              let res = [];
              for (let i = 0; i < lineNum; i++) {
                let temp = FAQList.slice(i * n, i * n + n);
                res.push(temp);
              }
              this.FAQList = res;
              this.totalNum = resp.data.totalElements;
              this.$nextTick(function() {
                this.move();
              });
            } else {
              this.$Notice.error({
                title: this.$t("common.tip"),
                desc: resp.message
              });
            }
          });
    },
    getCNYRate() {
      this.$http
        .post(this.host + "/market/exchange-rate/usd-cny")
        .then(response => {
          var resp = response.body;
          this.CNYRate = resp.data;
        });
    },
    donwload(type) {
      const title = this.$t("common.tip");
      const content = "<p>" + this.$t("common.expect") + "</p>";
      this.$Modal.info({
        title: title,
        content: content,
        closable: true
      });
    },
    loadPicData() {
      let param = {};
      param["sysAdvertiseLocation"] = 1;
      this.$http
        .post(this.host + "/uc/ancillary/system/advertise", param)
        .then(response => {
          var result = response.body;
          if (result.code == 0 && result.data.length > 0) {
            this.picList = result.data;
          }
        });
    },
    getCoin(symbol) {
      return this.coins._map[symbol];
    },
    startWebsock() {
      var stompClient = null;
      var that = this;
      var socket = new SockJS(that.host + that.api.market.ws);
      stompClient = Stomp.over(socket);
      stompClient.debug = false;
      stompClient.connect({}, function(frame) {
        //订阅价格变化消息
        stompClient.subscribe("/topic/market/thumb", function(msg) {
          var resp = JSON.parse(msg.body);
          var coin = that.getCoin(resp.symbol);
          if (coin != null) {
            // coin.price = resp.close.toFixed(2);
            coin.price = resp.close;
            coin.rose =
              resp.chg > 0
                ? "+" + (resp.chg * 100).toFixed(2) + "%"
                : (resp.chg * 100).toFixed(2) + "%";
            // coin.close = resp.close.toFixed(2);
            // coin.high = resp.high.toFixed(2);
            // coin.low = resp.low.toFixed(2);
            coin.close = resp.close;
            coin.high = resp.high;
            coin.low = resp.low;
            coin.turnover = parseInt(resp.volume);
          }
        });
      });
    },
    round(v, e) {
      var t = 1;
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t;
    },
    mul(a, b) {
      var c = 0,
        d = a.toString(),
        e = b.toString();
      try {
        c += d.split(".")[1].length;
      } catch (f) {}
      try {
        c += e.split(".")[1].length;
      } catch (f) {}
      return (
        Number(d.replace(".", "")) *
        Number(e.replace(".", "")) /
        Math.pow(10, c)
      );
    },
    addClass(index) {
      this.choseBtn = index;
      if (index == 0) {
        this.dataIndex = this.coins.USDT;
      } else if (index == 1) {
        this.dataIndex = this.coins.BTC;
      } else if (index == 2) {
        this.dataIndex = this.coins.ETH;
      } else if (index == 3) {
        this.dataIndex = this.coins.favor;

        // if (this.isLogin) {
        //   this.dataIndex = this.coins.favor;
        // } else {
        //   this.$router.push("/login");
        // }
      }
    },
    getSymbol() {
      this.loading = true;
      this.$http
        .post(this.host + this.api.market.thumbTrend, {})
        .then(response => {
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            var coin = resp[i];
            coin.price = resp[i].close;
            coin.rose =
              resp[i].chg > 0
                ? "+" + (resp[i].chg * 100).toFixed(2) + "%"
                : (resp[i].chg * 100).toFixed(2) + "%";
            coin.coin = resp[i].symbol.split("/")[0];
            coin.base = resp[i].symbol.split("/")[1];
            coin.href = (coin.coin + "_" + coin.base).toLowerCase();
            coin.isFavor = false;
            this.coins._map[coin.symbol] = coin;
            this.coins[coin.base].push(coin);
          }
          if (this.isLogin) {
            this.getFavor();
          }
          this.startWebsock();
          this.loading = false;
        });
    },
    // getFavor() {
    //   //查询自选
    //   this.$http
    //     .post(this.host + this.api.exchange.favorFind, {})
    //     .then(response => {
    //       var resp = response.body;
    //       for (var i = 0; i < resp.length; i++) {
    //         var coin = this.getCoin(resp[i].symbol);
    //         this.coins.favor.push(coin);
    //       }
    //     });
    // },
    getFavor() {
      //查询自选(收藏)
      this.$http
        .post(this.host + this.api.exchange.favorFind, {})
        .then(response => {
          var resp = response.body;
          this.coins.favor = [];
          for (var i = 0; i < resp.length; i++) {
            var coin = this.getCoin(resp[i].symbol);
            if (coin != null) {
              coin.isFavor = true;
              this.coins.favor.push(coin);
            }
          }
        });
    },
    collect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.exchange.favorAdd, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.do_favorite"));
            this.getCoin(row.symbol).isFavor = true;
            row.isFavor = true;
            this.coins.favor.push(row);
          }
        });
    },
    cancelCollect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.exchange.favorDelete, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.cancel_favorite"));
            this.getCoin(row.symbol).isFavor = false;
            for (var i = 0; i < this.coins.favor.length; i++) {
              var favorCoin = this.coins.favor[i];
              if (favorCoin.symbol == row.symbol) {
                this.coins.favor.splice(i, 1);
                break;
              }
            }
          }
        });
    },
    getmoneyData() {
      this.$http.get(this.host + this.api.market.indexData).then(res => {
        if (res.body.code == 0) {
          let data = res.body.data;
          this.safetyAndAssoction = data.safetyAndAssoction || 0;
          this.currentBonusETHBnous = data.currentBonusETHBnous || 0;
          this.yesDayMineAmountBHB = data.yesDayMineAmountBHB || 0;
          this.yesDayCashDividensBonusETH =
            data.yesDayCashDividensBonusETH || 0;
          let total = 6000000000;
          this.already = data.bhbAmount;
          this.progress = data.bhbAmount / total * 100;
        } else {
          this.$Message.error(res.body.message);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss" >
#pagetips {
  background: #0b1520;
  padding: 0 14%;
  overflow: hidden;
  .topnav {
    width: 100%;
    line-height: 40px;
    height: 40px;
    // float: left;
    margin: 0 auto;
    .carl {
      width: 100%;
      height: 40px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
      .laba {
        width: 5%;
        img {
          vertical-align: middle;
        }
      }
      .carsoul {
        width: 100%;
        margin-left: 20px;
        position: absolute;
        a {
          color: #f0a70a;
          font-size: 14px;
          line-height: 40px;
          display: inline-block;
        }
        .cal_content {
          // height: 40px;
          // width: 100%;
          line-height: 40px;
          color: #f0a70a;
          font-size: 14px;
          display: inline;
        }
        .cal_content:nth-child(1) {
          padding-right: 20px;
        }
        .cal_content:nth-child(2) {
          border-left: 1px solid #f0ac19;
          padding-left: 20px;
        }
      }
      .more {
        position: absolute;
        z-index: 12;
        right: 0;
        a {
          color: #f0a70a;
          font-size: 14px;
        }
      }
    }
  }
  .frinend_wakuang {
    width: 50%;
    float: right;
    text-align: right;
    height: 100%;
    line-height: 40px;
    a {
      color: #f0a70a;
      font-size: 14px;
    }
  }
}
#page6 {
  padding: 20px 14%;
  ul {
    list-style-type: none;
  }
  .page6-out {
    -moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    padding: 30px 20px;
    overflow: hidden;
    .page6-list {
      width: 33.33333%;
      float: left;
      .list-op {
        .special {
          line-height: 26px;
          .num {
            color: #f0a70a;
          }
        }
        .list-opBHB {
          text-align: left;
        }
        .text {
          text-align: left;
          word-break: break-all;
          margin-right: 20px;
          .num {
            font-size: 30px;
            color: #f0a70a;
            font-weight: 500;
          }
          .type {
            font-size: 16px;
            color: #f0a70a;
            font-weight: 500;
          }
        }
        .num2 {
          color: #f0a70a;
        }
      }
    }
  }
}
#progress {
  padding: 20px 14%;
  .title {
    color: #f0a70a;
    overflow: hidden;
    line-height: 30px;
    font-size: 16px;
    .already {
      float: left;
    }
    .total {
      float: right;
      color: #f0ac19;
    }
  }
  .ivu-progress.ivu-progress-normal {
    .ivu-progress-inner {
      background: #fff;
      border-radius: 0;
      .ivu-progress-bg {
        border-radius: 0;
      }
    }
  }
}
#page2 {
  background: #192330;
  height: auto;
  min-height: 320px;
  padding: 40px 14%;
  .page2nav {
    line-height: 40px;
    font-size: 20px;
    .brclearfix {
      li {
        float: left;
        cursor: pointer;
        color: #fff;
        background: #192330;
        list-style: none;
        font-size: 16px;
        padding: 0 30px;
        -moz-box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
        -webkit-box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
        box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
        &:hover {
          color: #f0a70a;
        }
      }
      li.active {
        background: #27313e;
        color: #f0a70a;
        position: relative;
      }
    }
  }
  .ptjy {
    height: 100%;
    .tables {
      border: none;
      -moz-box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
      -webkit-box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
      box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
      .ivu-table {
        .ivu-table-header {
          .ivu-table-column-center {
            background: none;
          }
        }
      }
    }
  }
}
#page4 {
  background: #222e3d;
  height: auto;
  padding: 100px 0 80px 0;
  ul {
    width: 88%;
    margin: 0 auto;
    li {
      flex: 0 0 33%;
      display: inline-block;
      width: 33%;
      padding: 0 15px;
      div {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        vertical-align: middle;
        text-align: center;
        margin: 0 auto;
        border: 2px solid #f0ac19;
        img {
          height: 34px;
          margin-top: 28px;
        }
      }
      p {
        font-size: 15px;
        margin: 20px 0;
        text-align: center;
        color: #999;
      }
      p.title {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
#page5 {
  height: 517px;
  padding: 0 14%;
  position: relative;
  background: #192330 url("../../assets/images/app-download.png") no-repeat 0 0;
  background-size: 100% 517px;
  overflow: hidden;
  .phone_image {
    width: 480px;
    float: left;
    height: 100%;
    background: url("../../assets/images/phone_img.png") no-repeat left 150px;
    background-size: 480px;
  }
  .download {
    float: right;
    list-style-type: none;
    .qrcode {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      margin-top: 140px;
      text-align: left;
      line-height: 40px;
      margin-bottom: 14px;
      font-weight: 900;
    }
    .wrapper {
      width: 160px;
      height: 300px;
      float: left;
      padding: 0;
      margin-right: 20px;
      .download_app {
        height: 160px;
        img {
          width: 100%;
        }
      }
      .abstract {
        text-align: center;
        display: flex;
        margin-top: 14px;
        justify-content: center;
        align-items: center;
        height: 30px;
        .image {
          width: 18px;
          img {
            vertical-align: middle;
          }
        }
        .content {
          font-size: 12px;
          text-align: left;
          color: #fff;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
#progress {
  .ivu-progress.ivu-progress-normal {
    .ivu-progress-inner {
      background: #fff;
      border-radius: 5px;
      border: 1px solid #f0a70a;
      .ivu-progress-bg {
        border-radius: 0;
        background: #f0a70a;
      }
    }
  }
}
#page2 {
  .ptjy {
    .tables {
      .ivu-table {
        .ivu-table-header {
          background:#27313e;
          color:#888;
          th {
            background: none;
            border-color:#26303d;
          }
          .ivu-table{
            &:after{
              background:#27313e;
            }
          }
        }
        .ivu-table-header,
        .ivu-table-body {
          .ivu-table-cell {
            padding: 5px 0;
          }
        }
        .ivu-table-body table .ivu-table-tbody {
            tr td{
              background-color:#192330;
              border-color:#26303d;
              color:#fff;
            }
        }
      }
    }
  }
}
</style>


<style>
.section .ivu-carousel-dots-inside {
  bottom: 20px;
}

.green {
  color: #00b275 !important;
}

.red {
  color: #f15057 !important;
}

.brclearfix:after {
  content: "";
  display: block;
  height: 0;
  overflow: hidden;
  clear: both;
}

#fullpage {
  background: #fff;
}

.section {
  /* height: 574px; */
  /* text-align: center; */
  /* color: #fff; */
}

.carousel-item {
  background-repeat: no-repeat;
  background-position: center;
  height: 500px;
  background-size: cover;
}

.demo-carousel1 {
  /* background: url(../../assets/images/banner1.jpg) no-repeat center; */
  height: 575px;
  background-size: cover;
}

.demo-carousel2 {
  /* background: url(../../assets/images/banner2.jpg) no-repeat center; */
  height: 575px;
  background-size: cover;
}

.demo-carousel-btn {
  width: 100%;
  height: 100%;
  padding-top: 345px;
}

.demo-carousel1 a {
  display: inline-block;
  width: 250px;
  height: 55px;
  margin: 0 15px;
}

/*.register {
  background: url(../../assets/images/register.png) no-repeat;
}*/

/* .usdt {
  float: left;
  width: 100%;
} */

.usdt_icon {
  float: left;
  width: 18%;
  height: 290px;
  background: #1d293a;
  padding-top: 125px;
  margin: 5px;
}
.btc,
.eth {
  float: left;
  width: 100%;
  margin-top: 10px;
}

.btc_icon,
.eth_icon {
  float: left;
  width: 18%;
  height: 140px;
  background: #1d293a;
  padding-top: 50px;
  margin: 5px;
}

#nav {
  position: fixed;
  right: 10%;
  top: 50%;
  z-index: 100;
}

#nav ul li {
  display: block;
  /* width: 120px; */
  height: 25px;
  margin: 7px;
  position: relative;
  padding-right: 20px;
  text-align: right;
  color: #fff;
}

#nav ul li span {
  display: none;
}

#nav ul li a {
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background: url(../../assets/images/page.png) no-repeat;
  position: absolute;
  z-index: 1;
}

#nav ul li a:hover,
#nav ul li a.active {
  top: 0;
  right: -3px;
  width: 18px;
  height: 18px;
  background: url(../../assets/images/page_active.png) no-repeat;
  position: absolute;
  z-index: 1;
}

#page3 {
  position: relative;
  color: #979797;
  /* background: url(../../assets/images/section3.png) no-repeat center; */
}

#page3 label {
  position: absolute;
  top: 30%;
  left: 20%;
  font-size: 30px;
}

@-webkit-keyframes fadeinB {
  0% {
    top: 50%;
    opacity: 0;
  }
  100% {
    top: 30%;
    opacity: 1;
  }
}

@keyframes fadeinB {
  0% {
    top: 50%;
    opacity: 0;
  }
  100% {
    top: 30%;
    opacity: 1;
  }
}

@-webkit-keyframes fadeinA {
  0% {
    top: 60%;
    opacity: 0;
  }
  100% {
    top: 40%;
    opacity: 1;
  }
}

@keyframes fadeinA {
  0% {
    top: 60%;
    opacity: 0;
  }
  100% {
    top: 40%;
    opacity: 1;
  }
}

#page3 p {
  position: absolute;
  top: 40%;
  left: 20%;
  font-size: 15px;
}

.news_1 {
  color: #202b3c;
  font-size: 12px;
}

.news_2 {
  color: #505c6f;
  font-size: 13px;
}

.news_3 {
  color: #fff;
  font-size: 18px;
}

.news_title {
  color: #fff;
  font-size: 20px;
}

.news_date {
  color: #505c6f;
}

.news_detail {
  color: #98999f;
  margin-top: 10px;
}
</style>


