export default function(api, setApi, type) {
  return {
    /**
     * 操作状态更新
     */
    handleChoise(tag, row) {
      import("@/utils/open-confirm").then(func =>
        import("@/api/user").then(userApi =>
          func.userCommonOpenConfirm.call(this, tag, row, userApi[setApi], type)
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
    },
    onUpdateMessage(data) {
      const state = Number(this.userState);
      import("@/api/user").then(userApi =>
        userApi.setUpdateUserState(this.id, state, data.type).then(() => {
          this.$notify({
            type: "success",
            message: "修改成功!"
          });
          this.row.state = state;
          this.visibleChoise = false;
        })
      );
    },
    onClosed() {
      this.visibleChoise = false;
    }
  };
}
