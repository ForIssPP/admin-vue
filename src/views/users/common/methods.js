export default function(api, setApi) {
  return {
    /**
     * 操作状态更新
     */
    handleChoise(tag, row) {
      import("@/utils/open-confirm").then(func =>
        import("@/api/user").then(userApi =>
          func.userCommonOpenConfirm(tag, row, userApi[setApi])
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
    getList(reload) {
      this.listLoading = true;
      import("@/api/user").then(userApi => {
        let data = this.listQuery;
        if (reload === true) {
          data = {};
        }
        userApi[api](data).then(response => {
          this.list = response.items;
          this.total = Number(response.total);
          this.listQuery.limit = Number(response.page_num);
          this.listLoading = false;
        });
      });
    }
  };
}
