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
        @keyup.enter.native="getList"
      />

      <!-- 手机号查询 -->
      <el-input
        v-model="listQuery.mobile"
        placeholder="手机号查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.uid"
        placeholder="ID查询"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />

      <!-- 性别查询 -->
      <search-sex @searchChange="searchChange" />

      <!-- 状态查询 -->
      <Search-state @searchChange="searchChange" />

      <!-- 操作人查询 -->
      <search-reviewer @searchChange="searchChange" />

      <!-- 时间查询 -->
      <search-date style="margin-right: 10px" @searchChange="searchChange" />

      <!-- 搜索 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
      >搜索</el-button>
    </div>
    <!-- 检索栏 end -->

    <!-- 表格 -->
    <avatar-check-table
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
import AvatarCheckTable from "@/components/table/index.vue";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchSex,
  SearchState,
  SearchReviewer,
  SearchDate
} from "@/components/search/index";
import methodsCommon from "../common/methods";
import { componentList } from "./table-config";

export default {
  name: "UserControllerAvatarCheck",
  components: {
    Pagination,
    SearchSex,
    SearchState,
    SearchReviewer,
    SearchDate,
    AvatarCheckTable
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      // 分页器按钮
      total: 0,
      listLoading: true,
      componentList,
      downloadLoading: false,
      listQuery: {
        nickname: undefined,
        page: 1,
        uid: undefined,
        limit: 15,
        sex: undefined,
        state: undefined,
        reviewer: undefined,
        date: undefined,
        mobile: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: methodsCommon("getAvatarList", "setUserAvatarCheck")
};
</script>
