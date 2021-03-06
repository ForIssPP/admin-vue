import downloadExcel from "@/utils/download-excel";

export default function(api) {
  return {
    /**
     * 查询更新
     */
    searchChange(type, query) {
      this.listQuery[type] = query || undefined;
      console.log(type);
      /* TODO */
    },
    /**
     * 获取表单
     */
    getList(reload) {
      this.listLoading = true;
      import("@/api/finance").then(financeApi => {
        let data = this.listQuery;
        if (reload === true) {
          data = {};
        }
        financeApi[api](data).then(response => {
          this.list = response.items;
          this.total = Number(response.total);
          this.listQuery.limit = Number(response.page_num);
          this.listLoading = false;
          if ("money" in this) {
            this.money = Number(response.money) || 0;
          }
          if ("coin" in this) {
            this.coin = Number(response.coin) || 0;
          }
        });
      });
    },
    /**
     * 导出下载
     */
    handleDownload() {
      if (this.list && this.tableContent && this.tableHeader) {
        import("@/utils/download-excel").then(downloadExcel => {
          this.downloadLoading = true;
          const data = this.list.map(value => {
            return this.tableContent.map(key => {
              return value[key];
            });
          });
          downloadExcel
            .default(this.tableHeader, data)
            .then(() => (this.downloadLoading = false));
        });
      } else {
        this.$message({
          type: "warning",
          message: "无可导出数据"
        });
      }
    }
  };
}
