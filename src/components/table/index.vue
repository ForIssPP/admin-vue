<template>
  <el-table
    :key="0"
    v-loading="listLoading"
    :data="list"
    border
    fit
    highlight-current-row
    style="width: 100%;"
  >
    <component
      v-for="(componentId, index) in componentList"
      :key="index"
      :is="componentId"
      @handleChoise="handleChoise"
    ></component>
  </el-table>
</template>
<script>
import TableComponents from "./index";

export default {
  props: {
    componentList: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      listLoading: false
    };
  },
  components: TableComponents,
  methods: {
    handleChoise(state, row) {
      this.$emit("handleChoise", state, row);
    }
  }
};
</script>