import * as userApi from "@/api/activity";

export default function(api) {
  return {
    /**
     * 操作状态更新
     */
    handleChoise(tag, row) {
      console.log(tag, row);
      if (!tag) {
        import("@/utils/open-confirm").then(_confirm => {
          _confirm.commonConfirm.call(this, () => {
            row.activityState = "正常";
          });
        });
      } else {
        import("@/utils/open-confirm").then(_confirm => {
          _confirm.commonConfirm.call(this, () => {
            row.activityState = "已下架";
          });
        });
      }
    },
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
      console.log(this.listQuery);
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
    },
    /**
     * 表单搜索填充
     */
    handleFilter() {
      console.log(this.listQuery);
      // this.getList();
    }
  };
}
