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
      <search-date @searchChange="searchChange" />

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
      <search-vip @searchChange="searchChange" />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 操作人查询 -->
      <search-reviewer @searchChange="searchChange" />

      <!-- 提现类型查询 -->
      <search-state-finance style="margin-right: 10px" @searchChange="searchChange" />

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
    <withdraw-record-table :componentList="componentList" :list="list" @handleChoise="handleChoise"></withdraw-record-table>
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
import WithdrawRecordTable from "@/components/table/index.vue";
import { tableHeader, tableContent, componentList } from "./table-config";
import downloadExcel from "@/utils/download-excel";

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
    WithdrawRecordTable
  },
  directives: { waves },
  data() {
    return {
      componentList,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      rechargeVisible: false,
      money: 0,
      listQuery: {
        payType: undefined,
        orderState: undefined,
        userID: undefined,
        orderNumber: undefined,
        rechargeAmount: undefined,
        page: 1,
        limit: 15,
        sex: undefined,
        platform: undefined,
        orderNumber: undefined
      },
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
    async handleChoise(tag, row) {
      const openConfirm = await import("@/utils/open-confirm");
      if (tag === "reject") {
        openConfirm.commonConfirm.call(this, () => {
          row.orderState = "未完成";
        });
      } else if (tag === "goPay") {
        openConfirm.commonConfirm.call(this, () => {
          row.orderState = "已完成";
        });
      } else {
        this.$message({
          message: "操作已处理",
          type: "warning"
        });
      }
    },
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
      console.log(this.listQuery);
      /* TODO */
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
      this.downloadLoading = true;
      const data = this.list.map(value => {
        return tableContent.map(key => {
          return value[key];
        });
      });
      downloadExcel(
        tableHeader,
        data,
        () => (this.downloadLoading = false)
        /* file name */
      );
    }
  }
};
</script>
