<template>
  <!-- 操作 -->
  <el-table-column label="操作" prop="checkName" align="center" width="130">
    <template v-slot="{row}">
      <el-button plain size="mini" @click="handleChoise('open', row)">审核</el-button>
    </template>

    <el-dialog append-to-body title="相册审核" :lock-scroll="false" :visible.sync="dialogFormVisible">
      <el-table v-loading="listLoading" :data="album">
        <el-table-column label="图片" property="picture" align="center">
          <template slot-scope="{row}">
            <img :src="row.picture" alt="old-avatar" />
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="check" align="center">
          <el-button plain type="warning" size="mini" @click="handleChoise(true)">通过</el-button>
          <el-button plain type="success" size="mini" @click="handleChoise(false)">不通过</el-button>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-table-column>
</template>
<script>
import { getAlbumList } from "@/api/user";

export default {
  name: "table-old-avatar",
  data() {
    return {
      dialogFormVisible: false,
      listLoading: true,
      album: null,
      form: {
        name: undefined,
        region: undefined
      }
    };
  },
  methods: {
    handleChoise(tag, row) {
      if (tag === "open") {
        this.dialogFormVisible = true;
        getAlbumList(row.id).then(res => {
          this.album = res.data.album;
          this.listLoading = false;
        });
      } else {
        import("@/utils/open-confirm").then(_confirm => {
          _confirm.commonConfirm.call(this);
        });
      }
    }
  }
};
</script>