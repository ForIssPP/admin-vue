<template>
  <el-table-column label="性别" prop="sex" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span>{{ row.sex === '0' ? '保密' : row.sex === '1' ? '男' : '女' }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-sex",
  props: {
    width: {
      type: String,
      default: "60"
    },
    sortable: {
      type: [Boolean, String],
      validator(value) {
        return typeof value === "boolean" || value === "custom ";
      },
      default: false
    }
  }
};
</script>
