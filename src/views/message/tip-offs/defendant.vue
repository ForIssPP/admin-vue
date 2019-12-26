<template>
  <el-table-column label="被举报人" prop="bnickname" :sortable="sortable" align="center" :width="width">
    <template slot-scope="{row}">
      <span style="display: block;height: 100%" @click="open(row)">{{ row.bnickname || '无' }}</span>
    </template>
    <!-- 拒绝反馈 -->
    <open-choise-type
      :visible="visibleChoise"
      :title="'是否封号'"
      :typeList="typeList"
      @onUpdateMessage="onUpdateMessage"
      @closed="onClosed"
    ></open-choise-type>
  </el-table-column>
</template>
<script>
import OpenChoiseType from "@/components/OpenChoiseType";
import { feedbackLetter, tipoffHandtleUser } from "@/api/message";

export default {
  name: "table-name",
  data() {
    return {
      feedbackId: undefined,
      typeList: ["是", "否"],
      userState: undefined,
      visibleChoise: false,
      row: undefined
    };
  },
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
  components: {
    OpenChoiseType
  },
  methods: {
    open(row) {
      this.visibleChoise = true;
      this.userState = true;
      this.feedbackId = row.buid;
      this.row = row;
    },
    onUpdateMessage(data) {
      const state = Number(this.userState);
      this.$message.success("处理成功");
      this.row.state = state;
      this.visibleChoise = false;
      if (data.msg) {
        feedbackLetter(data.msg, this.feedbackId).then(res => {
          this.$message.success("发送成功");
          this.feedbackVisible = false;
        });
      }
      if (data.type === 1) {
        tipoffHandtleUser(this.feedbackId);
      }
    },
    onClosed() {
      this.visibleChoise = false;
    }
  }
};
</script>
