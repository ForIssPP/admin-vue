<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 消费类型查询 -->
      <el-select
        v-model="listQuery.payType"
        placeholder="消费类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option label="发布线下聚会" value="发布线下聚会" />
        <el-option label="发布私密聚会" value="发布私密聚会" />
        <el-option label="取消线下聚会" value="取消线下聚会" />
        <el-option label="取消私密聚会" value="取消私密聚会" />
        <el-option label="手动消费" value="手动消费" />
      </el-select>

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 订单状态查询 -->
      <el-select
        v-model="listQuery.state"
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
        @keyup.enter.native="getList"
      />

      <!-- 订单号查询 -->
      <el-input
        v-model="listQuery.orderNumber"
        placeholder="订单号查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

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

      <!-- 手动扣费 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="onPurchase"
      >手动扣费</el-button>
    </div>
    <!-- 检索栏 end -->

    <!-- 表单 start -->
    <purchase-record-table :loading="listLoading" :componentList="componentList" :list="list"></purchase-record-table>
    <el-dialog
      title="手动扣除"
      label-width="80px"
      :visible.sync="purchaseVisible"
      :before-close="onClose"
    >
      <el-form ref="rechargeForm" :rules="formRules" :model="form">
        <el-form-item label="用户ID" prop="uid">
          <el-input type="text" v-model="form.uid" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input type="text" v-model="form.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="扣除金额" prop="coin">
          <el-input type="text" v-model="form.coin" placeholder="请输入金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onPurchaseAmount">确 定</el-button>
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
import { getPurchaseRecordList } from "@/api/finance";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchPlatform,
  SearchDate,
  SearchStateFinance,
  SearchSex,
  MoneyConut
} from "@/components/search/index";
import PurchaseRecordTable from "@/components/table/index.vue";
import { tableHeader, tableContent, componentList } from "./table-config";
import downloadExcel from "@/utils/download-excel";
import methodsCommon from "../common/methods";

export default {
  name: "FinanceControllerPurchaseRecord",
  components: {
    Pagination,
    SearchPlatform,
    SearchDate,
    SearchStateFinance,
    SearchSex,
    MoneyConut,
    PurchaseRecordTable
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
      purchaseVisible: false,
      money: 0,
      form: {
        uid: undefined,
        coin: undefined,
        nickname: undefined
      },
      formRules: {
        uid: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
        coin: [{ required: true, message: "请输入扣除金额", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入用户名", trigger: "blur" }]
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
  methods: Object.assign(methodsCommon("getRechargeRecordList"), {
    onPurchase() {
      this.purchaseVisible = true;
    },
    onPurchaseAmount() {
      this.$refs.rechargeForm.validate(valid => {
        if (valid) {
          import("@/api/finance").then(api =>
            api
              .addUserAmount(this.form)
              .then(
                res =>
                  this.$message({
                    message: "扣除成功",
                    type: "success"
                  }),
                (this.purchaseVisible = false)
              )
              .catch(
                err =>
                  this.$message({
                    message: "扣除失败",
                    type: "error"
                  }),
                (this.purchaseVisible = false)
              )
          );
        }
      });
    },
    onClose() {
      this.$refs.rechargeForm.resetFields();
      this.purchaseVisible = false;
    }
  })
};
</script>
