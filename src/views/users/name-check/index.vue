<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 昵称查询 -->
      <el-input
        v-model="listQuery.name"
        placeholder="昵称查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

      <!-- 手机号查询 -->
      <el-input
        v-model="listQuery.phoneNumber"
        placeholder="手机号查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.userID"
        placeholder="ID查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

      <!-- 性别查询 -->
      <SearchSex @searchChange="searchChange" />

      <!-- 状态查询 -->
      <SearchState @searchChange="searchChange" />

      <!-- 操作人查询 -->
      <SearchReviewer @searchChange="searchChange" />

      <!-- 时间查询 -->
      <SearchDate style="margin-right: 10px" @searchChange="searchChange" />

      <!-- 搜索 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
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

    <!-- 表格 -->
    <my-table :componentList="componentList" :list="list" @handleChoise="handleChoise"></my-table>

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
import { fetchList } from "@/api/article";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchSex,
  SearchState,
  SearchReviewer,
  SearchDate
} from "@/components/search/index";
import MyTable from "@/components/table/index.vue";
import { _confirm } from "@/utils/open-confirm";
import downloadExcel from "@/utils/download-excel";
import { tableHeader, tableContent, componentList } from "./tableConfig";

export default {
  name: "UserControllerNameCheck",
  components: {
    Pagination,
    SearchSex,
    SearchState,
    SearchReviewer,
    SearchDate,
    MyTable
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      componentList,
      listQuery: {
        name: undefined,
        page: 1,
        userID: undefined,
        limit: 15,
        sex: undefined,
        state: undefined,
        reviewer: undefined,
        date: undefined,
        phoneNumber: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 操作状态更新
     */
    handleChoise(tag, row) {
      const openConfirm = _confirm.bind(this);
      const handleUpdate = () => {
        row.state = "待审核";
      };

      const handlePass = () => {
        row.state = "通过";
      };

      const handleNotPass = () => {
        row.state = "未通过";
      };

      if (tag === "update") {
        openConfirm(handleUpdate);
      }

      if (tag === true) {
        openConfirm(handlePass);
      }

      if (tag === false) {
        openConfirm(handleNotPass);
      }
    },
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
      /* TODO */
    },
    /**
     * 获取表单
     */
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
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
