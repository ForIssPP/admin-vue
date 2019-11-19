<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 处理类型查询 -->
      <search-tip-off-type @dateTypeChange="dateTypeChange" />

      <!-- 时间查询 -->
      <search-date @dateTypeChange="dateTypeChange" />

      <!-- 操作人查询 -->
      <search-reviewer style="margin-right: 10px" @reviewerTypeChange="reviewerTypeChange" />

      <!-- 渠道查询 -->
      <search-platform @stateTypeChange="stateTypeChange" />

      <!-- 处理结果查询 -->
      <search-state-tackle />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.userID"
        placeholder="ID查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

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

      <!-- Tip Off Type -->
      <table-tip-off-type />

      <!-- Tip Off State -->
      <table-tip-off-state />

      <!-- Tip Off Messages -->
      <table-tip-off-msg />

      <!-- Platform -->
      <table-platform />

      <!-- Tip Off Images -->
      <el-table-column label="图片" prop="tipOffImages" align="center">
        <template slot-scope="{row}">
          <img
            v-for="(src, index) in row.tipOffImages"
            :key="index"
            :src="src"
            alt="tip-off-images"
          />
        </template>
      </el-table-column>

      <!-- Time -->
      <table-time />

      <!-- Reviewer -->
      <table-reviewer />

      <!-- Choise Message -->
      <table-choise-msg @handleChoise="handleChoise" />
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
import { getFeedBack } from "@/api/user";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchPlatform,
  SearchReviewer,
  SearchDate,
  SearchStateTackle,
  SearchTipOffType
} from "@/components/search/index";
import {
  TableId,
  TableTime,
  TableReviewer,
  TableUsername,
  TablePlatform,
  TableTipOffMsg,
  TableTipOffType,
  TableTipOffState,
  TableChoiseMsg,
  TableVip
} from "@/components/table/index";

export default {
  name: "UserControllerNameCheck",
  components: {
    Pagination,
    SearchPlatform,
    SearchReviewer,
    SearchDate,
    SearchStateTackle,
    SearchTipOffType,
    TableId,
    TableTime,
    TableReviewer,
    TableUsername,
    TablePlatform,
    TableTipOffMsg,
    TableTipOffType,
    TableTipOffState,
    TableChoiseMsg,
    TableVip
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      // 分页器按钮
      total: 0,
      listLoading: true,
      listQuery: {
        // 页面
        page: 1,
        // 15行
        limit: 15,

        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
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
      getFeedBack(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
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
