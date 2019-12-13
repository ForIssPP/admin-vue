<template>
  <!-- 操作 -->
  <el-table-column label="操作" prop="checkName" align="center" width="auto">
    <template v-slot="{row}">
      <el-button plain size="mini" @click="handleChoise('open', row)">审核</el-button>
    </template>

    <el-dialog append-to-body title="相册审核" :lock-scroll="false" :visible.sync="dialogFormVisible">
      <el-table v-loading="listLoading" :data="album">
        <el-table-column label="图片" property="picture" align="center">
          <template slot-scope="{row}">
            <img style="width: 100%" :src="row.photo" alt="old-avatar" />
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="check" align="center">
          <template slot-scope="{row, any, $index}">
            <div class="table-choise" v-show="row.state === '0'">
              <el-button
                plain
                type="success"
                size="mini"
                @click="handleChoise(true, row, $index)"
              >通过</el-button>
              <el-button
                plain
                type="warning"
                size="mini"
                @click="handleChoise(false, row, $index)"
              >拒绝</el-button>
            </div>
            <div class="table-choise" v-show="row.state !== '0'">
              <el-button plain size="mini" @click="handleChoise('update', row, $index)">更改状态</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-table-column>
</template>
<script>
import { setUserPhotoCheck } from "@/api/user";

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
    handleChoise(tag, row, index) {
      if (tag === "open") {
        this.dialogFormVisible = true;
        if (!this.album) {
          this.album = row.photo.map(p => {
            const photo = {
              uid: row.id,
              photo: p[0],
              state: p[1]
            };
            return photo;
          });
          this.$nextTick(() => (this.listLoading = false));
        }
      } else {
        import("@/utils/open-confirm").then(_confirm => {
          row.sort = index;
          _confirm.userCommonOpenConfirm(tag, row, setUserPhotoCheck);
        });
      }
    }
  }
};
</script>
