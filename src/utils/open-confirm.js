/**
 * 打开默认confirm
 * @param {function} callback 回调函数
 */
export function _confirm(callback) {
  if (this && this.$confirm) {
    return this.$confirm("此操作将会修改状态，是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      lockScroll: false,
      type: "warning"
    })
      .then(() => {
        this.$notify({
          type: "success",
          message: "修改成功!"
        });
        callback();
      })
      .catch(() => undefined);
  }
}
