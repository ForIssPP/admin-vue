import * as userApi from "@/api/user";

export default function(api) {
  return {
    /**
     * 操作状态更新
     */
    handleChoise(tag, row) {
      import("@/utils/open-confirm").then(_confirm => {
        _confirm.userCommonOpenConfirm.call(this, tag, row);
      });
    },
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
      /* TODO */
    },
    /**
     * 获取表单
     */
    getList() {
      this.listLoading = true;
      userApi[api](this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    }
  };
}
