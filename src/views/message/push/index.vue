<template>
  <div class="app-container">
    <!-- 检索栏 start -->
    <div class="filter-container">
      <!-- 位置查询 -->
      <search-address @stateTypeChange="stateTypeChange" />

      <!-- 性别查询 -->
      <search-sex @sexTypeChange="sexTypeChange" />

      <!-- 会员查询 -->
      <search-vip @stateTypeChange="stateTypeChange" />

      <!-- 渠道查询 -->
      <search-platform @stateTypeChange="stateTypeChange" />

      <!-- 真人认证 -->
      <el-select v-model="userCheck" placeholder="真人认证" class="filter-item" style="width: 110px">
        <el-option label="已通过" value="已通过" />
        <el-option label="未通过" value="未通过" />
      </el-select>

      <!-- 财产认证 -->
      <el-select v-model="moneyCheck" placeholder="财产认证" class="filter-item" style="width: 110px">
        <el-option label="已通过" value="已通过" />
        <el-option label="未通过" value="未通过" />
      </el-select>

      <!-- 注册时间 -->
      <search-date></search-date>

      <!-- 身高 -->
      <div class="filter-item number-search">
        <el-col :span="11">
          <el-input placeholder="开始身高" v-model="height.start"></el-input>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-input placeholder="结束身高" v-model="height.end"></el-input>
        </el-col>
      </div>

      <!-- 年龄 -->
      <div class="filter-item number-search">
        <el-col :span="11">
          <el-input placeholder="开始年龄" v-model="age.start"></el-input>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-input placeholder="结束年龄" v-model="age.end"></el-input>
        </el-col>
      </div>

      <!-- 特殊符号 -->
      <el-select v-model="syntaxCheck" placeholder="特殊符号" class="filter-item" style="width: 110px">
        <el-option label="存在" value="存在" />
        <el-option label="不存在" value="不存在" />
      </el-select>

      <!-- 搜索 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >筛选</el-button>
    </div>
    <!-- 检索栏 end -->

    <el-form :label-position="'left'" :label-width="'100px'" :model="pushForm" ref="pushForm">
      <el-form-item label="发送内容" prop="msg">
        <el-input type="textarea" :rows="10" v-model="pushForm.msg" placeholder="请输入想要群发的内容"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发送</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
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
  name: "UserControllerNameCheck",
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
      moneyCheck: "",
      userCheck: "",
      syntaxCheck: "",
      height: {
        start: "",
        end: ""
      },
      age: {
        start: "",
        end: ""
      },
      pushForm: {
        msg: ""
      },
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
     * 选择`性别`更新
     */
    sexTypeChange(sex) {
      console.log(sex);
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
     * 选择`时间`更新
     */
    dateTypeChange(state) {
      console.log(state);
    },
    /**
     * 获取表单
     */
    getList() {
      this.listLoading = true;
      getUserList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    onSubmit() {
      console.log(this.userCheck);
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