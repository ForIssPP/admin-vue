<template>
  <el-table-column label="提交时间" prop="create_time" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ parseTime(row.create_time) }}</span>
    </template>
  </el-table-column>
</template>
<script>
import { parseTime } from "@/utils";

export default {
  name: "table-time-post",
  props: {
    width: {
      type: String
    },
    sortable: {
      type: [Boolean, String],
      validator(value) {
        return typeof value === "boolean" || value === "custom ";
      },
      default: false
    }
  },
  methods: {
    parseTime: time => parseTime(Number(time) * 1e3)
  }
};
</script>
