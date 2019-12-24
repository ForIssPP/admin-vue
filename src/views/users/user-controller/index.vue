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
      <search-sex @searchChange="searchChange" />

      <!-- 会员查询 -->
      <search-vip @searchChange="searchChange" />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 时间查询 -->
      <search-date @searchChange="searchChange" />

      <!-- 账号状态查询 -->
      <search-numberState @searchChange="searchChange" />

      <!-- 位置查询 -->
      <search-address @searchChange="searchChange" />

      <!-- 用户类型查询 -->
      <search-userCreateType @searchChange="searchChange" />

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
    <user-controller-table
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
import {
  SearchVip,
  SearchSex,
  SearchAddress,
  SearchState,
  SearchPlatform,
  SearchReviewer,
  SearchNumberState,
  SearchUserCreateType,
  SearchDate
} from "@/components/search/index";
import UserControllerTable from "@/components/table/index.vue";
import downloadExcel from "@/utils/download-excel";
import { tableHeader, tableContent, componentList } from "./table-config";
import methodsCommon from "../common/methods";
import { userDetail } from "@/api/user";

const methods = methodsCommon("getUserList");
methods["handleDownload"] = function() {
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
};

methods["handleChoise"] = function(tag, row) {
  import("@/utils/open-confirm").then(_confirm => {
    const openConfirm = _confirm.commonConfirm;
    const handleSuccess = number => {
      this.$notify({
        type: "success",
        message: "修改成功!"
      });
      row.state = String(number);
    };
    if (tag === "freeze") {
      openConfirm(() =>
        import("@/api/user").then(userApi =>
          userApi.setUpdateUserState(row, "1").then(res => handleSuccess(1))
        )
      );
    }

    if (tag === "thaw") {
      openConfirm(() =>
        import("@/api/user").then(userApi =>
          userApi.setUpdateUserState(row, "0").then(res => handleSuccess(0))
        )
      );
    }

    if (tag === "msg") {
      openConfirm(() => console.log(1));
    }

    if (tag === "edit") {
      this.$router.push({
        path: "/user/userInfoController",
        query: {
          uid: row.id,
          edit: 1
        }
      });
    }

    if (tag === "see") {
      this.$router.push({
        path: "/user/userInfoController",
        query: {
          uid: row.id
        }
      });
    }
  });
};

export default {
  name: "UserControllerCheck",
  components: {
    Pagination,
    SearchVip,
    SearchSex,
    SearchAddress,
    SearchState,
    SearchPlatform,
    SearchReviewer,
    SearchNumberState,
    SearchUserCreateType,
    SearchDate,
    UserControllerTable
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      userDetailShow: false,
      userDetail: {
        id: undefined,
        nickname: undefined,
        sex: undefined,
        position: undefined,
        age: undefined,
        state: undefined,
        vip_level: undefined,
        mobile: undefined,
        avatar: undefined,
        workWoman: undefined,
        style: undefined,
        height: undefined,
        somke: undefined,
        live: undefined,
        authMan: undefined,
        authWoman: undefined,
        workMan: undefined,
        target: undefined,
        workWoman: undefined,
        dimension: null,
        drink: undefined
      },
      componentList,
      listQuery: {
        name: undefined,
        page: 1,
        userID: undefined,
        limit: undefined,
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
  methods
};
</script>
