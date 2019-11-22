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
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import MyTable from "@/components/table/index.vue";
import downloadExcel from "@/utils/download-excel";
import { tableHeader, tableContent, componentList } from "./table-config";
import methodsCommon from "../common/methods";

export default {
  name: "UserControllerAlbumCheck",
  components: {
    Pagination,
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
  methods: methodsCommon("getPictureList")
};
</script>
