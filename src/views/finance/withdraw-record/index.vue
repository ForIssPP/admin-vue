<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 订单状态查询 -->
      <el-select
        v-model="listQuery.type"
        placeholder="订单状态"
        clearable
        class="filter-item"
        style="width: 110px"
      >
        <el-option label="待处理" value="待处理" />
        <el-option label="提现成功" value="提现成功" />
        <el-option label="提现失败" value="提现失败" />
      </el-select>

      <!-- 时间查询 -->
      <search-date @searchChange="searchChange" />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.uid"
        placeholder="ID查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

      <!-- 订单号查询 -->
      <el-input
        v-model="listQuery.orderno"
        placeholder="订单号查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

      <!-- Vip查询 -->
      <search-vip @searchChange="searchChange" />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 提现类型查询 -->
      <el-select
        v-model="listQuery.state"
        placeholder="提现类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option label="已完成" value="已完成" />
        <el-option label="未完成" value="未完成" />
      </el-select>

      <!-- 筛选结果金额统计 -->
      <money-conut :money="money" />

      <!-- 搜索 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
      >搜索</el-button>

      <!-- 重置 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList(true)"
      >重置</el-button>

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

    <!-- 表单 -->
    <withdraw-record-table
      :loading="listLoading"
      :componentList="componentList"
      :list="list"
      @handleChoise="handleChoise"
    />
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
import methodsCommon from "../common/methods";

const methods = methodsCommon("getWithdrawList");

methods["handleChoise"] = function(tag, row) {
  import("@/utils/open-confirm").then(confirm => {
    confirm.financeCommonOpenConfirm(tag, row);
  });
};

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
      tableHeader,
      tableContent,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      rechargeVisible: false,
      money: 0,
      listQuery: {
        type: undefined,
        state: undefined,
        uid: undefined,
        orderno: undefined,
        money: undefined,
        page: 1,
        limit: 15,
        sex: undefined,
        is_vip: undefined,
        admin_id: undefined,
        device: undefined
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods
};
</script>
