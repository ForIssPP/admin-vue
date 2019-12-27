<template>
  <el-dialog append-to-body :visible.sync="display" @close="closed">
    <span slot="title">
      <i class="el-icon-warning" style="color: #E6A23C" />
      再次确认
    </span>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="title">
        <el-radio-group v-model="form.type">
          <el-radio-button
            v-for="(type, index) in typeList"
            :key="index"
            :label="type"
            :value="index + 1"
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="消息内容">
        <el-input v-model="form.msg" type="textarea" :rows="6" placeholder="消息内容" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onClick">确认</el-button>
      <el-button type="primary" @click="closed">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    typeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        type: undefined,
        msg: undefined
      },
      display: false
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.display = true;
      } else {
        this.$emit("closed");
        this.closed();
      }
    }
  },
  methods: {
    closed() {
      this.display = false;
      this.form = {
        type: undefined,
        msg: undefined
      };
      this.$emit("closed");
      this.$emit("update:visible", false);
    },
    onClick() {
      const { form } = this;
      if (form.type) {
        this.$emit("onUpdateMessage", form);
      } else {
        this.$message.warning("请至少选择一个类型");
      }
    }
  }
};
</script>
