<template>
  <el-select
    v-model="reviewerType"
    placeholder="处理人"
    clearable
    @change="searchChange"
    class="filter-item"
    style="width: 100px"
    :loading="loading"
  >
    <el-option v-for="item in reviewerTypeOptions" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
import request from "@/utils/request";
import { getReviewerUserList } from "@/api/user.js";

export default {
  name: "search-reviewer",
  data() {
    return {
      reviewerType: "",
      loading: true,
      reviewerTypeOptions: []
    };
  },
  created() {
    getReviewerUserList(0)
      .then(res => {
        if (res.code === 20000) {
          this.reviewerTypeOptions = res.data;
          this.loading = false;
        }
      })
      .catch(err => console.log(err));
  },
  methods: {
    searchChange() {
      this.$emit("searchChange", "reviewer", this.reviewerType);
    }
  }
};
</script>