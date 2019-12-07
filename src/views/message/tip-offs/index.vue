<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 处理类型查询 -->
      <search-tip-off-type @searchChange="searchChange" />

      <!-- 时间查询 -->
      <search-date @searchChange="searchChange" />

      <!-- 操作人查询 -->
      <search-reviewer style="margin-right: 10px" @searchChange="searchChange" />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

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
    </div>
    <!-- 检索栏 end -->

    <!-- 表单 start -->
    <my-table :componentList="componentList" :list="list" @handleChoise="handleChoise"></my-table>

    <el-dialog title="反馈结果" :visible.sync="feedbackVisible" :before-close="onClose">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="'500'">
          <el-input type="textarea" :rows="10" v-model="form.feedback" placeholder="请输入反馈内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSend">确 定</el-button>
      </div>
    </el-dialog>
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
import { getTipOffsList } from "@/api/message";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import MyTable from "@/components/table/index.vue";
import { componentList } from "./table-config";
import {
  SearchPlatform,
  SearchReviewer,
  SearchDate,
  SearchStateTackle,
  SearchTipOffType
} from "@/components/search/index";

export default {
  name: "MessageControllerTip-OffsPage",
  components: {
    Pagination,
    MyTable,
    SearchPlatform,
    SearchReviewer,
    SearchDate,
    SearchStateTackle,
    SearchTipOffType
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
        tipOffs: undefined,
        name: undefined,
        platform: undefined,
        stateTackle: undefined,
        reviewer: undefined,
        date: undefined
      },
      form: {
        feedback: undefined
      },
      downloadLoading: false,
      feedbackVisible: false,
      feedbackId: undefined
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
      if (tag === "msg") {
        this.feedbackVisible = true;
        this.feedbackId = row.id;
        console.log(tag, row);
      } else if (tag === false) {
        this.$message({
          message: "反馈已处理",
          type: "warning"
        });
      } else {
        import("@/utils/open-confirm").then(_confirm => {
          _confirm.commonConfirm.call(this, () => {
            row.tipOffState = "已处理";
          });
        });
      }
    },
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
      console.log(this.listQuery);
      /* TODO */
    },
    /**
     * 获取表单
     */
    getList() {
      this.listLoading = true;
      getTipOffsList(this.listQuery).then(response => {
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
    onSend() {
      console.log(this.form.feedback);
      console.log(this.feedbackId);
    },
    onClose() {
      this.feedbackVisible = false;
      this.form.feedback = undefined;
      this.feedbackId = undefined;
    }
  }
};
</script>
