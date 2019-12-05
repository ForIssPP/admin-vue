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
      .then(callback)
      .catch(() => undefined);
  }
}

export function userCommonOpenConfirm(tag, row, handleSetState) {
  if (this && this.$confirm) {
    const openConfirm = commonConfirm.bind(this);

    const handleSuccess = () => {
      this.$notify({
        type: "success",
        message: "修改成功!"
      });
    };

    const handleUpdate = () => {
      row.state = "0";
    };

    const handlePass = () => {
      handleSetState(row).then(res => {
        handleSuccess();
        row.state = "1";
      });
    };

    const handleNotPass = () => {
      handleSetState(row).then(res => {
        handleSuccess();
        row.state = "2";
      });
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
