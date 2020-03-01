<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 昵称查询 -->
      <el-input
        v-model="listQuery.nickname"
        placeholder="昵称查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 手机号查询 -->
      <el-input
        v-model="listQuery.mobile"
        placeholder="手机号查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.uid"
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
        icon="el-icon-refresh"
        @click="getList(true)"
      >重置</el-button>
    </div>
    <!-- 检索栏 end -->

    <!-- 表单 start -->
    <offline-party-table
      :loading="listLoading"
      :componentList="componentList"
      :list="list"
      @handleChoise="handleChoise"
    ></offline-party-table>
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
import { componentList } from "./table-config";
import OfflinePartyTable from "@/components/table/index.vue";
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
    OfflinePartyTable
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
        limit: undefined,
        position: undefined,
        create_time: undefined,
        nickname: undefined,
        mobile: undefined,
        device: undefined,
        admin_id: undefined,
        sex: undefined,
        state: undefined,
        userCreate: undefined,
        title: undefined,
        start_time: undefined,
        end_time: undefined,
        uid: undefined
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: methodsCommon("getOfflinePartyList", "setPartyState")
};
</script>
