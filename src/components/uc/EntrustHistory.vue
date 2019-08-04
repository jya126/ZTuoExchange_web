
<style lang="scss" scoped>
.entrusthistory {
  float: left;
  width: 85%;
  padding-left: 30px;
}

.page {
  text-align: right;
  margin-top: 20px;
}
.table {
  border-radius: 4px;
}
.table .ivu-table-wrapper {
  position: relative;
  /* border: 1px solid #dddee1; */
  border-bottom: 0;
  border-right: 0;
  // box-shadow: 0 0 2px #ccc;
  border-radius: 4px;
  // overflow: hidden;
}
.form.ivu-form-inline .ivu-form-item {
  display: inline-block;
}
</style>
<style lang="scss">
.entrusthistory .ivu-table th,
.entrusthistory .ivu-table td {
  text-align: center;
}
.table .ivu-table-cell-expand {
  color: #f0a70a;
}
</style>



<template>
  <div class="entrusthistory">
    <Form class="form" :model="formItem" :label-width="65" inline>
      <FormItem label="起止时间:">
        <DatePicker type="daterange" v-model="formItem.date" style="width:180px;"></DatePicker>
      </FormItem>
      <FormItem label="交易对:">
        <Select v-model="formItem.symbol" style="width:100px;">
          <Option v-for="(item,index) in symbol" :key="index" :value="item.symbol">{{item.symbol}}</Option>
        </Select>
      </FormItem>
      <FormItem label="类型:">
        <Select v-model="formItem.type" style="width:70px;">
          <Option value="LIMIT_PRICE">限价</Option>
          <Option value="MARKET_PRICE">市价</Option>
        </Select>
      </FormItem>
      <FormItem label="方向:">
        <Select v-model="formItem.direction" style="width:70px;">
          <Option value="0">买入</Option>
          <Option value="1">卖出</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="warning" @click="handleSubmit">搜索</Button>
        <Button style="margin-left: 8px" @click="handleClear" class="clear_btn">清空条件</Button>
      </FormItem>
    </Form>
    <div class="table">
      <Table :columns="columns" :data="orders" :loading="loading"></Table>
      <div class="page">
        <Page :total="total" :pageSize="pageSize" :current="pageNo" @on-change="loadDataPage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require("moment");
import expandRow from "@components/exchange/expand.vue";

export default {
  components: { expandRow },
  data() {
    const self = this;
    return {
      loading: false,
      pageSize: 10,
      pageNo: 1,
      total: 10,
      symbol: [],
      formItem: {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      },
      columns: [
        {
          type: "expand",
          width: 30,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                skin: params.row.skin,
                rows: params.row.detail
              }
            });
          }
        },
        {
          title: this.$t("exchange.time"),
          key: "time",
          minWidth: 55,
          render: (h, params) => {
            return h("span", {}, this.dateFormat(params.row.time));
          }
        },
        {
          title: "交易对",
          key: "symbol"
        },
        {
          title: "类型",
          width: 60,
          render(h, params) {
            return h(
              "span",
              params.row.type === "LIMIT_PRICE" ? "限价" : "市价"
            );
          }
        },
        {
          title: this.$t("exchange.direction"),
          key: "direction",
          width: 60,
          render: (h, params) => {
            const row = params.row;
            const className = row.direction.toLowerCase();
            return h(
              "span",
              {
                attrs: {
                  class: className
                }
              },
              row.direction == "BUY"
                ? this.$t("exchange.buyin")
                : this.$t("exchange.sellout")
            );
          }
        },
        {
          title: this.$t("exchange.price"),
          key: "price",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.price
                }
              },
              self.toFloor(params.row.price)
            );
          }
        },
        {
          title: this.$t("exchange.num"),
          key: "amount",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.amount
                }
              },
              self.toFloor(params.row.amount)
            );
          }
        },
        {
          title: this.$t("exchange.done"),
          key: "tradedAmount",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.tradedAmount
                }
              },
              self.toFloor(params.row.tradedAmount)
            );
          }
        },
        {
          title: "成交金额",
          key: "turnover",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.turnover
                }
              },
              self.toFloor(params.row.turnover)
            );
          }
        },
        {
          title: this.$t("exchange.status"),
          key: "status",
          width: 80,
          render: (h, params) => {
            const status = params.row.status;
            if (status == "COMPLETED") {
              return h(
                "span",
                {
                  style: {
                    color: "#f0a70a"
                  }
                },
                this.$t("exchange.finished")
              );
            } else if (status == "CANCELED") {
              return h(
                "span",
                {
                  style: {
                    color: "#f0a70a"
                  }
                },
                this.$t("exchange.canceled")
              );
            } else {
              return h("span", {}, "--");
            }
          }
        }
      ],
      orders: []
    };
  },
  created() {
    this.getHistoryOrder();
    this.getSymbol();
  },
  methods: {
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    loadDataPage(data) {
      this.pageNo = data;
      this.getHistoryOrder();
    },
    handleSubmit() {
      this.pageNo = 1;
      this.getHistoryOrder();
    },
    handleClear() {
      this.formItem = {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      };
    },
    getHistoryOrder() {
      //查询历史委托
      this.loading = true;
      const { symbol, type, direction, date: rangeDate } = this.formItem,
        startTime = new Date(rangeDate[0]).getTime() || "",
        endTime = new Date(rangeDate[1]).getTime() || "";
      let params = {};
      if (symbol) params.symbol = symbol;
      if (direction) params.direction = direction;
      if (type) params.type = type;
      if (startTime) params.startTime = startTime;
      if (endTime) params.endTime = endTime;
      params.pageNo = this.pageNo;
      params.pageSize = this.pageSize;
      var that = this;
      this.orders = [];
      this.$http
        .post(this.host + "/exchange/order/personal/history", params)
        .then(response => {
          var resp = response.body;
          let rows = [];
          if (resp.content.length > 0) {
            this.total = resp.totalElements;
            for (var i = 0; i < resp.content.length; i++) {
              var row = resp.content[i];
              row.price =
                row.type == "MARKET_PRICE"
                  ? that.$t("exchange.marketprice")
                  : row.price;
              rows.push(row);
            }
            this.orders = rows;
          }
          this.loading = false;
        });
    },
    getSymbol() {
      this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
        var resp = response.body;
        if (resp.length > 0) {
          this.symbol = resp;
        }
      });
    }
  }
};
</script>

