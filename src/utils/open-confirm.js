/**
 * 打开默认confirm
 * @param {function} callback 回调函数
 */
export function commonConfirm(callback) {
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

export function userCommonOpenConfirm(tag, row) {
  if (this && this.$confirm) {
    const openConfirm = commonConfirm.bind(this);
    const handleUpdate = () => {
      row.state = "待审核";
    };

    const handlePass = () => {
      row.state = "通过";
    };

    const handleNotPass = () => {
      row.state = "未通过";
    };

    if (tag === "update") {
      openConfirm(handleUpdate);
    }

    if (tag === true) {
      openConfirm(handlePass);
    }

    if (tag === false) {
      openConfirm(handleNotPass);
    }
  }
}
