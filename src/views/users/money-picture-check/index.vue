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

      <!-- 状态查询 -->
      <SearchState @stateTypeChange="stateTypeChange" />

      <!-- 操作人查询 -->
      <SearchReviewer @reviewerTypeChange="reviewerTypeChange" />

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
      <TableId />

      <!-- Phone Number -->
      <TablePhoneNumber />

      <!-- Sex -->
      <TableSex />

      <!-- State -->
      <TableState />

      <!-- Picture Check -->
      <el-table-column label="图片" prop="avatar" align="center">
        <template slot-scope="{row}">
          <img v-for="(picture, index) in row.pictures" :key="index" :src="picture" alt="old-avatar" />
        </template>
      </el-table-column>

      <!-- Reviewer -->
      <TableReviewer />

      <!-- 操作 -->
      <TableChoise @handleChoise="handleChoise" />
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
import {
  getMoneyPicturesList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { SearchState, SearchReviewer } from "@/components/search/index";
import {
  TableId,
  TablePhoneNumber,
  TableSex,
  TableState,
  TableReviewer,
  TableChoise
} from "@/components/table/index";

export default {
  name: "UserControllerMoneyCheck",
  components: {
    Pagination,
    SearchState,
    SearchReviewer,
    TableId,
    TableSex,
    TableState,
    TablePhoneNumber,
    TableReviewer,
    TableChoise
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
     * 获取表单
     */
    getList() {
      this.listLoading = true;
      getMoneyPicturesList(this.listQuery).then(response => {
        console.log(response)
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
