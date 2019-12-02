<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 支付类型查询 -->
      <el-select
        v-model="listQuery.payType"
        placeholder="支付类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option label="IOS支付" value="IOS支付" />
        <el-option label="Google支付" value="Google支付" />
        <el-option label="人工储值" value="人工储值" />
      </el-select>

      <!-- 订单状态查询 -->
      <el-select
        v-model="listQuery.orderState"
        placeholder="订单状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option label="已完成" value="已完成" />
        <el-option label="未完成" value="未完成" />
      </el-select>

      <!-- 时间查询 -->
      <search-date @searchChange="searchChange" />

      <!-- 性别查询 -->
      <search-sex @searchChange="searchChange" />

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

      <!-- 充值金额查询 -->
      <el-input
        v-model="listQuery.rechargeAmount"
        placeholder="充值金额查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 筛选结果金额统计 -->
      <money-conut :money="money" />
      <money-conut :name="'手动充值金额'" :money="money" />

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

      <!-- 手动储值 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="onRecharge"
      >手动储值</el-button>
    </div>
    <!-- 检索栏 end -->

    <!-- 表单 start -->
    <recharge-record-table :componentList="componentList" :list="list" @handleChoise="handleChoise"></recharge-record-table>
    <el-dialog
      title="手动充值"
      label-width="80px"
      :visible.sync="rechargeVisible"
      :before-close="onClose"
    >
      <el-form ref="rechargeForm" :model="form">
        <el-form-item label="用户ID">
          <el-input type="text" v-model="form.id" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input type="text" v-model="form.username" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input type="text" v-model="form.coin" placeholder="请输入金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onRechargeAmount">确 定</el-button>
      </div>
    </el-dialog>
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
import { getRechargeRecordList } from "@/api/finance";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchPlatform,
  SearchReviewer,
  SearchDate,
  SearchVip,
  SearchSex,
  MoneyConut
} from "@/components/search/index";
import RechargeRecordTable from "@/components/table/index.vue";
import { tableHeader, tableContent, componentList } from "./table-config";
import downloadExcel from "@/utils/download-excel";

export default {
  name: "FinanceControllerRechargeRecord",
  components: {
    Pagination,
    MoneyConut,
    SearchPlatform,
    SearchReviewer,
    SearchDate,
    SearchVip,
    SearchSex,
    RechargeRecordTable
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
      form: {
        id: undefined,
        coin: undefined,
        username: undefined
      },
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
    handleChoise(tag) {
      console.log(tag);
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
      getRechargeRecordList(this.listQuery).then(response => {
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
    },
    onRecharge() {
      this.rechargeVisible = true;
    },
    onRechargeAmount() {
      console.log(this.form);
    },
    onClose() {
      this.form = {
        coin: undefined,
        id: undefined,
        username: undefined
      };
      this.rechargeVisible = false;
    }
  }
};
</script>
