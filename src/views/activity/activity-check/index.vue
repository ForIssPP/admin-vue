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
        @keyup.enter.native="handleFilter"
      />

      <!-- 手机号查询 -->
      <el-input
        v-model="listQuery.phoneNumber"
        placeholder="手机号查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.userID"
        placeholder="ID查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 性别查询 -->
      <search-sex @searchChange="searchChange" />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 时间查询 -->
      <search-date @searchChange="searchChange" />

      <!-- 状态查询 -->
      <search-state-activity @searchChange="searchChange" />

      <!-- 位置查询 -->
      <search-address @searchChange="searchChange" />

      <!-- 用户类型查询 -->
      <search-user-create-type @searchChange="searchChange" />

      <!-- 操作人查询 -->
      <search-reviewer style="margin-right: 10px" @searchChange="searchChange" />

      <!-- 搜索 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
    </div>
    <!-- 检索栏 end -->

    <!-- 表单 start -->
    <activity-check-table :componentList="componentList" :list="list" @handleChoise="handleChoise"></activity-check-table>
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
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchUserCreateType,
  SearchSex,
  SearchAddress,
  SearchPlatform,
  SearchReviewer,
  SearchStateActivity,
  SearchDate
} from "@/components/search/index";
import ActivityCheckTable from "@/components/table/index.vue";
import { componentList } from "./table-config";
import methodsCommon from "../common/methods";

export default {
  name: "UserControllerNameCheck",
  components: {
    Pagination,
    SearchUserCreateType,
    SearchSex,
    SearchStateActivity,
    SearchAddress,
    SearchPlatform,
    SearchReviewer,
    SearchDate,
    ActivityCheckTable
  },
  directives: { waves },
  data() {
    return {
      componentList,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 15,
        address: undefined,
        date: undefined,
        name: undefined,
        phoneNumber: undefined,
        platform: undefined,
        reviewer: undefined,
        sex: undefined,
        stateActivity: undefined,
        userCreate: undefined,
        userID: undefined
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: methodsCommon("getActivityCheckList")
};
</script>
