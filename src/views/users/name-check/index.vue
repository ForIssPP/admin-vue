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
      <search-state @searchChange="searchChange" />

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

    <!-- 表格 -->
    <name-check-table
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

    <!-- 拒绝反馈 -->
    <open-choise-type
      :visible="visibleChoise"
      :title="'反馈类型'"
      :typeList="typeList"
      @onUpdateMessage="onUpdateMessage"
      @closed="onClosed"
    ></open-choise-type>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchSex,
  SearchState,
  SearchReviewer,
  SearchDate
} from "@/components/search/index";
import NameCheckTable from "@/components/table/index.vue";
import downloadExcel from "@/utils/download-excel";
import { tableHeader, tableContent, componentList } from "./table-config";
import methodsCommon from "../common/methods";
import { commonConfirm } from "@/utils/open-confirm";
import OpenChoiseType from "@/components/OpenChoiseType";
const methods = methodsCommon("getUsernameList", "setUserNameCheck", 1);

export default {
  name: "UserControllerNameCheck",
  components: {
    Pagination,
    SearchSex,
    SearchState,
    SearchReviewer,
    SearchDate,
    NameCheckTable,
    OpenChoiseType
  },
  directives: { waves },
  data() {
    return {
      id: undefined,
      typeList: ["含有敏感词", "有其他社交平台账号", "广告宣传"],
      userState: undefined,
      visibleChoise: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      componentList,
      listQuery: {
        nickname: undefined,
        page: 1,
        uid: undefined,
        limit: undefined,
        mobile: undefined,
        sex: undefined,
        state: undefined,
        reviewer: undefined,
        date: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods
};
</script>
