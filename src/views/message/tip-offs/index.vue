<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 处理类型查询 -->
      <search-tip-off-type @searchChange="searchChange" />

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
  </div>
</template>

<script>
import {
  getTipOffsList,
  setTipoffHandle,
  feedbackLetter,
  tipoffHandtleUser
} from "@/api/message";
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
import OpenChoiseType from "@/components/OpenChoiseType";

export default {
  name: "MessageControllerTip-OffsPage",
  components: {
    Pagination,
    MyTable,
    SearchPlatform,
    SearchReviewer,
    SearchDate,
    SearchStateTackle,
    SearchTipOffType,
    OpenChoiseType
  },
  directives: { waves },
  data() {
    return {
      typeList: ["是", "否"],
      userState: undefined,
      visibleChoise: false,
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
        setTipoffHandle(row.id).then(res =>
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
      console.log(this.listQuery);
      /* TODO */
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
      getTipOffsList(query).then(response => {
        this.list = response.items;
        this.listQuery.limit = Number(response.page_num);
        this.total = Number(response.total);
        this.listLoading = false;
      });
    },
    onSend() {
      if (this.form.feedback) {
        feedbackLetter(this.form.feedback, this.feedbackId).then(res => {
          this.$message.success("发送成功");
          this.feedbackVisible = false;
        });
      } else {
        this.$message.warning("请输入内容");
      }
    },
    onClose() {
      this.feedbackVisible = false;
      this.form.feedback = undefined;
      this.feedbackId = undefined;
    }
  }
};
</script>
