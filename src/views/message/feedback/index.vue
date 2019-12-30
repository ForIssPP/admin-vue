<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 处理类型查询 -->
      <search-tip-off-type :list="tipOffsTypeOptions" name="反馈类型" @searchChange="searchChange" />
      <!-- 时间查询 -->
      <search-date @searchChange="searchChange" />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 处理结果查询 -->
      <search-state-tackle @searchChange="searchChange" />

      <!-- ID查询 -->
      <el-input
        v-model="listQuery.uid"
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
        @click="getList"
      >搜索</el-button>
    </div>
    <!-- 检索栏 end -->

    <!-- 表单 start -->
    <my-table
      :loading="listLoading"
      :componentList="componentList"
      :list="list"
      @handleChoise="handleChoise"
    ></my-table>

    <el-dialog title="反馈结果" :visible.sync="feedbackVisible" :before-close="onClose">
      <el-form :model="form">
        <el-form-item label="私信消息" :label-width="'500'">
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

    <!-- 重置 -->
    <el-button
      v-waves
      class="filter-item"
      type="primary"
      icon="el-icon-refresh"
      @click="getList(true)"
    >重置</el-button>
  </div>
</template>

<script>
import { getFeedBackList, setFeedbackHandle } from "@/api/message";
import MyTable from "@/components/table/index.vue";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { componentList } from "./table-config";
import {
  SearchPlatform,
  SearchReviewer,
  SearchDate,
  SearchStateTackle,
  SearchTipOffType
} from "@/components/search/index";

export default {
  name: "MessageControllerFeedbackPage",
  components: {
    MyTable,
    Pagination,
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
      tipOffsTypeOptions: [
        "用户问题",
        "APP问题",
        "费用问题",
        "线下聚会/私密约会申请",
        "其他"
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        type: undefined,
        name: undefined,
        platform: undefined,
        state: undefined,
        reviewer: undefined,
        limit: undefined,
        start_time: undefined,
        end_time: undefined
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
      } else if (tag === false) {
        this.$message({
          message: "反馈已处理",
          type: "warning"
        });
      } else {
        setFeedbackHandle(row.id).then(res =>
          import("@/utils/open-confirm").then(_confirm => {
            _confirm.commonConfirm(() => {
              this.$message({
                message: "处理成功",
                type: "success"
              });
              row.state = "1";
            });
          })
        );
      }
    },
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
    },
    /**
     * 获取表单
     */
    getList(reload) {
      let query;

      this.listLoading = true;
      if (reload === true) {
        query = {};
      } else {
        query = this.listQuery;
      }
      getFeedBackList(query).then(response => {
        this.list = response.items;
        this.total = Number(response.total);
        this.listQuery.limit = Number(response.page_num);
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
     * 提交消息
     */
    onSend() {
      if (!this.form.feedback) {
        return this.$message({
          type: "warning",
          message: "内容不能为空"
        });
      }
      import("@/api/message").then(messageApi =>
        messageApi
          .feedbackLetter(this.form.feedback, this.feedbackId)
          .then(res => {
            this.$message({
              type: "success",
              message: "私信成功"
            });
            this.onClose();
          })
      );
    },
    /**
     * 关闭提交消息弹窗
     */
    onClose() {
      this.feedbackVisible = false;
      this.form.feedback = undefined;
      this.feedbackId = undefined;
    }
  }
};
</script>
