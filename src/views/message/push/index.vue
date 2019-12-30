<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 位置查询 -->
      <search-address @searchChange="searchChange" />

      <!-- 性别查询 -->
      <search-sex @searchChange="searchChange" />

      <!-- 会员查询 -->
      <search-vip @searchChange="searchChange" />

      <!-- 渠道查询 -->
      <search-platform @searchChange="searchChange" />

      <!-- 真人认证 -->
      <el-select
        v-model="listQuery.userCheck"
        placeholder="真人认证"
        class="filter-item"
        style="width: 110px"
      >
        <el-option label="已通过" value="已通过" />
        <el-option label="未通过" value="未通过" />
      </el-select>

      <!-- 财产认证 -->
      <el-select
        v-model="listQuery.moneyCheck"
        placeholder="财产认证"
        class="filter-item"
        style="width: 110px"
      >
        <el-option label="已通过" value="已通过" />
        <el-option label="未通过" value="未通过" />
      </el-select>

      <!-- 注册时间 -->
      <search-date @searchChange="searchChange" />

      <!-- 身高 -->
      <div class="filter-item number-search">
        <el-col :span="11">
          <el-input placeholder="开始身高" v-model="listQuery.start_height"></el-input>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-input placeholder="结束身高" v-model="listQuery.end_height"></el-input>
        </el-col>
      </div>

      <!-- 年龄 -->
      <div class="filter-item number-search">
        <el-col :span="11">
          <el-input placeholder="开始年龄" v-model="listQuery.start_age"></el-input>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-input placeholder="结束年龄" v-model="listQuery.end_age"></el-input>
        </el-col>
      </div>

      <!-- 特殊符号 -->
      <el-select
        v-model="listQuery.special_char"
        placeholder="特殊符号"
        class="filter-item"
        style="width: 110px"
      >
        <el-option label="存在" value="存在" />
        <el-option label="不存在" value="不存在" />
      </el-select>

      <!-- 重置 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        @click="resetSearch"
      >重置</el-button>
    </div>
    <!-- 检索栏 end -->

    <el-form :label-position="'left'" :label-width="'100px'" :model="listQuery" ref="pushForm">
      <el-form-item label="发送内容" prop="text">
        <el-input
          type="textarea"
          :rows="10"
          v-model="listQuery.text"
          placeholder="请输入想要群发的内容"
          @change="savaMsg"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发送</el-button>
        <el-button type="reset" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { msgPush } from "@/api/message";
// button点击波纹指令
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  SearchVip,
  SearchSex,
  SearchAddress,
  SearchDate,
  SearchPlatform
} from "@/components/search/index";

export default {
  name: "MessageControllerPushMessagePage",
  components: {
    Pagination,
    SearchVip,
    SearchSex,
    SearchAddress,
    SearchDate,
    SearchPlatform
  },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        text: undefined,
        moneyCheck: undefined,
        userCheck: undefined,
        special_char: undefined,
        sex: undefined,
        is_vip: undefined,
        start_time: undefined,
        end_time: undefined,
        city: undefined,
        device: undefined,
        start_height: undefined,
        end_height: undefined,
        start_age: undefined,
        end_age: undefined
      }
    };
  },
  created() {
    const text = window.localStorage.getItem("text");
    if (text) {
      this.listQuery.text = text;
    }
  },
  methods: {
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
      console.log(this.listQuery);
      /* TODO */
    },
    /**
     * 提交消息
     */
    onSubmit() {
      if (this.listQuery.text) {
        let form;
        if (this.listQuery.date) {
          const [start_time, end_time] = this.listQuery.date;
          form = Object.assign({}, this.listQuery, {
            start_time,
            end_time
          });
          console.log("000000000000000000");
        } else {
          form = Object.assign({}, this.listQuery);
        }
        console.log(form);
        msgPush(form).then(res => {
          this.$message({
            type: "success",
            message: "发送成功"
          });
          console.log(res);
          this.reSetPushFormMsg();
        });
      } else {
        this.$message({
          type: "warning",
          message: "请输入内容"
        });
      }
    },
    /**
     * 重置消息
     */
    onReset() {
      this.listQuery.text = undefined;
      this.reSetPushFormMsg();
    },
    resetSearch() {
      this.reSetPushFormMsg();
      window.location.reload();
    },
    savaMsg() {
      window.localStorage.setItem("text", this.listQuery.text);
    },
    reSetPushFormMsg() {
      window.localStorage.removeItem("text");
      this.listQuery.text = "";
    }
  }
};
</script>
<style lang="scss">
.filter-item {
  &.number-search {
    width: 200px;
  }
  .text-center {
    line-height: 36px;
  }
}
</style>
