<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 订单状态查询 -->
      <el-select
        v-model="listQuery.orderState"
        placeholder="订单状态"
        clearable
        class="filter-item"
        style="width: 80px"
      >
        <el-option label="待处理" value="待处理" />
        <el-option label="提现成功" value="提现成功" />
        <el-option label="提现失败" value="提现失败" />
      </el-select>

      <!-- 时间查询 -->
      <search-date @dateTypeChange="dateTypeChange" />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.userID"
        placeholder="ID查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 订单号查询 -->
      <el-input
        v-model="listQuery.orderNumber"
        placeholder="订单号查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- Vip查询 -->
      <search-vip></search-vip>

      <!-- 渠道查询 -->
      <search-platform @stateTypeChange="stateTypeChange" />

      <!-- 操作人查询 -->
      <search-reviewer @reviewerTypeChange="reviewerTypeChange" />

      <!-- 提现类型查询 -->
      <search-state-finance style="margin-right: 10px"></search-state-finance>

      <!-- 筛选结果金额统计 -->
      <money-conut :money="money" />

      <!-- 搜索 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        style="margin-left: 0"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
    </div>
    <!-- 检索栏 end -->

    <!-- 表单 start -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- ID -->
      <table-id />

      <!-- Username -->
      <table-username />

      <!-- Vip -->
      <table-vip />

      <!-- Coin -->
      <table-coin />

      <!-- Withdraw Amount -->
      <el-table-column label="提现金额" prop="withdrawAmount" align="center">
        <template slot-scope="{row}">
          <span>{{ row.withdrawAmount }}</span>
        </template>
      </el-table-column>

      <!-- Order Number -->
      <table-order-number></table-order-number>

      <!-- Pay Type -->
      <table-pay-type :payName="'提现类型'"></table-pay-type>

      <!-- Withdraw User ID -->
      <el-table-column label="提现账号" prop="withdrawUserId" align="center">
        <template slot-scope="{row}">
          <span>{{ row.withdrawUserId }}</span>
        </template>
      </el-table-column>

      <!-- Platform -->
      <table-platform />

      <!-- Order State -->
      <table-state-order></table-state-order>

      <!-- Post Time -->
      <table-post-time />

      <!-- Reviewer -->
      <table-reviewer />

      <!-- Time -->
      <table-time />

      <!-- Choise Order -->
      <table-choise-order></table-choise-order>
    </el-table>
    <!-- 表单 end -->

    <!-- 分页器 start -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <!-- 分页器 end -->
  </div>
</template>

<script>
import { getWithdrawList } from "@/api/finance";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchPlatform,
  SearchReviewer,
  SearchDate,
  SearchStateFinance,
  SearchVip,
  SearchSex,
  MoneyConut
} from "@/components/search/index";
import {
  TableId,
  TableUsername,
  TableVip,
  TablePlatform,
  TableTime,
  TableCoin,
  TableOrderNumber,
  TablePayType,
  TableStateOrder,
  TableReviewer,
  TablePostTime,
  TableChoiseOrder
} from "@/components/table/index";

export default {
  name: "UserControllerNameCheck",
  components: {
    Pagination,
    SearchPlatform,
    SearchReviewer,
    SearchDate,
    SearchStateFinance,
    SearchVip,
    SearchSex,
    MoneyConut,
    TableId,
    TableUsername,
    TableVip,
    TablePlatform,
    TableTime,
    TableCoin,
    TableOrderNumber,
    TablePayType,
    TableStateOrder,
    TablePostTime,
    TableReviewer,
    TableChoiseOrder
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      // 分页器按钮
      total: 0,
      listLoading: true,
      money: 0,
      listQuery: {
        // 页面
        page: 1,
        // 15行
        limit: 15,
        phoneNumber: undefined,
        name: undefined,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        orderNumber: undefined,
        orderState: undefined
      },
      tableHeader: [
        "ID",
        "电话号码",
        "状态",
        "性别",
        "审核昵称",
        "修改时间",
        "处理人"
      ],
      tableContent: [
        "id",
        "phoneNumber",
        "state",
        "sex",
        "checkName",
        "time",
        "reviewer"
      ],
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 操作状态更新
     */
    handleChoise(tag) {
      console.log(tag);
    },
    /**
     * 选择`性别`更新
     */
    sexTypeChange(sex) {
      console.log(sex);
    },
    /**
     * 选择`状态`更新
     */
    stateTypeChange(state) {
      console.log(state);
    },
    /**
     * 选择`处理`人更新
     */
    reviewerTypeChange(state) {
      console.log(state);
    },
    /**
     * 选择`时间`更新
     */
    dateTypeChange(state) {
      console.log(state);
    },
    /**
     * 获取表单
     */
    getList() {
      this.listLoading = true;
      getWithdrawList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
        this.money = this.list.reduce((prev, item) => {
          if (typeof prev === "number") {
            return prev + item.withdrawAmount;
          } else {
            return prev.withdrawAmount + item.withdrawAmount;
          }
        });
        console.log(this.money);
      });
    },
    /**
     * 表单搜索填充
     */
    handleFilter() {
      console.log(this.listQuery);
      // this.getList();
    },
    /**
     * 导出Excel
     */
    handleDownload() {
      const header = this.tableHeader;

      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        if (header.length !== this.tableContent.length) {
          return false;
        }
        const data = this.list.map(value => {
          return this.tableContent.map(key => {
            return value[key];
          });
        });
        excel.export_json_to_excel({
          header,
          data,
          filename: "name-check"
        });
        this.downloadLoading = false;
      });
    }
  }
};
</script>