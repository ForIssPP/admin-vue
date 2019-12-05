import * as userApi from "@/api/user";
import { userCommonOpenConfirm } from "@/utils/open-confirm";

export default function(api, setApi) {
  return {
    /**
     * 操作状态更新
     */
    handleChoise(tag, row) {
      console.log(1);
      userCommonOpenConfirm.call(this, tag, row, userApi[setApi]);
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
        this.list = response.items;
        // this.total = response.total;
        this.listLoading = false;
      });
    }
  };
}
