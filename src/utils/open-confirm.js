import { Notification, MessageBox } from "element-ui";

function handleSuccess() {
  Notification({
    type: "success",
    message: "修改成功!"
  });
}

/**
 * 打开默认confirm
 * @param {function} callback 回调函数
 */
export function commonConfirm(callback) {
  return MessageBox.confirm("此操作将会修改状态，是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    lockScroll: false,
    type: "warning"
  })
    .then(callback)
    .catch(err => console.log(err));
}

/**
 * User 默认操作
 * @param {string} tag 类型
 * @param {object} row 列表对象
 * @param {function} handleSetState 修改操作函数
 * @param {number} type 是否添加弹窗
 */
export function userCommonOpenConfirm(tag, row, handleSetState, type) {
  const handleUpdate = () => {
    row.state = "0";
  };

  const handlePass = () => {
    handleSetState(row, "1").then(res => {
      handleSuccess();
      row.state = "1";
    });
  };

  const handleNotPass = () => {
    handleSetState(row, "2").then(res => {
      handleSuccess();
      row.state = "2";
    });
  };

  if (tag === "update") {
    commonConfirm(handleUpdate);
  }

  if (tag === true) {
    commonConfirm(handlePass);
  }

  if (tag === false) {
    if (type) {
      this.visibleChoise = true;
      this.userState = true;
    } else {
      commonConfirm(handleNotPass);
    }
  }
}

/**
 * Activity 默认操作
 * @param {string} tag 类型
 * @param {object} row 列表对象
 * @param {function} handleSetState 修改操作函数
 */
export function activityCommonOpenConfirm(tag, row, handleSetState) {
  const handlePass = () => {
    handleSetState(row, "1").then(res => {
      handleSuccess();
      row.check_state = "1";
    });
  };

  const handleNotPass = () => {
    handleSetState(row, "0").then(res => {
      handleSuccess();
      row.check_state = "0";
    });
  };

  if (tag === true) {
    commonConfirm(handlePass);
  }

  if (tag === false) {
    commonConfirm(handleNotPass);
  }
}

/**
 * Finance 提现操作
 * @param {string} tag 类型
 * @param {object} row 列表对象
 */
export function financeCommonOpenConfirm(tag, row) {
  const handlePass = () => {
    import("@/api/finance").then(api =>
      api.cashoutRemit(row, "1").then(res => {
        handleSuccess();
        row.state = "1";
      })
    );
  };

  const handleNotPass = () => {
    MessageBox.prompt("请输入驳回消息", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }).then(({ value: msg }) => {
      if (!msg) {
        return Promise.reject(Error("请输入驳回信息"));
      }
      row.msg = msg;
      import("@/api/finance").then(api =>
        api.cashoutReject(row, "1").then(res => (row.state = "1"))
      );
    });
  };

  if (tag === true) {
    commonConfirm(handlePass);
  }

  if (tag === false) {
    commonConfirm(handleNotPass);
  }
}
