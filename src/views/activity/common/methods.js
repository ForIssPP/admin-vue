export default function(api, setApi) {
  return {
    /**
     * 操作状态更新
     */
    handleChoise(tag, row) {
      import("@/utils/open-confirm").then(func =>
        import("@/api/activity").then(activityApi =>
          func.activityCommonOpenConfirm(tag, row, activityApi[setApi])
        )
      );
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
      import("@/api/activity").then(activityApi =>
        activityApi[api](this.listQuery).then(response => {
          this.list = response.items;
          // this.total = response.total;
          this.listLoading = false;
        })
      );
    }
  };
}
