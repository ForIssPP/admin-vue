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

      <!-- 状态查询 -->
      <SearchState @searchChange="searchChange" />

      <!-- 操作人查询 -->
      <SearchReviewer @searchChange="searchChange" />

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
    <money-check-table
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
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { SearchState, SearchReviewer } from "@/components/search/index";
import MoneyCheckTable from "@/components/table/index.vue";
import methodsCommon from "../common/methods";
import { componentList } from "./table-config";

export default {
  name: "UserControllerMoneyCheck",
  components: {
    Pagination,
    SearchState,
    SearchReviewer,
    MoneyCheckTable
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      // 分页器按钮
      total: 0,
      listLoading: true,
      downloadLoading: false,
      componentList,
      listQuery: {
        nickname: undefined,
        page: 1,
        uid: undefined,
        limit: 15,
        sex: undefined,
        state: undefined,
        admin_id: undefined,
        date: undefined,
        mobile: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: methodsCommon("getMoneyPicturesList", "setUserManAuth")
};
</script>
