<template>
  <el-table-column
    label="反馈类型"
    prop="tipOffType"
    :sortable="sortable"
    align="center"
    :width="width"
  >
    <template slot-scope="{row}">
      <span>{{ renderType(row.type) }}</span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-tip-off-type",
  props: {
    width: {
      type: String,
      default: "110"
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
    // 1头像/资料虚假 2诈骗/广告 3发布色情、低俗、暴力内容 4恶意骚扰我 5其他
    renderType(type) {
      switch (type) {
        case "1":
          return "用户问题";
        case "2":
          return "APP问题";
        case "3":
          return "费用问题";
        case "4":
          return "线下聚会/私密约会申请";
        case "5":
          return "其他";
      }
    }
  }
};
</script>
