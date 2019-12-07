function editData(data, header) {
  return data.map(arr =>
    arr.map((redate, index) => {
      console.log(redate);
      switch (header[index]) {
        case "会员":
          Number(redate) > 0 ? (redate = "会员") : (redate = "非会员");
          break;
        case "性别":
          redate === "1" ? (redate = "男") : (redate = "女");
          break;
        case "订单状态":
          redate === "1" ? (redate = "已打款") : (redate = "未打款");
          break;
        case "提现类型":
        case "支付类型":
        case "消费类型":
          redate === "1" ? (redate = "支付宝") : (redate = "微信");
          break;
        case "平台":
          redate === "0"
            ? (redate = "无")
            : redate === "1"
            ? (redate = "安卓")
            : (redate = "iOS");
          break;
        case "提交时间":
        case "修改时间":
          redate = new Date(Number(redate) || 0).toLocaleDateString();
          break;
      }
      return redate;
    })
  );
}

/**
 * 导出excel
 * @param {Array<string>} header 表头
 * @param {Array<Array<string>>} data 表单信息
 * @param {string} filename Excel文件名
 * @return {Promise<void>} Promise回调
 */
export default async function(header, data, filename = new Date().getTime()) {
  const excel = await import("@/vendor/Export2Excel");
  if (header.length !== data[0].length) {
    console.error(header, data);
    return Promise.reject(new Error("参数错误"));
  }
  data = editData(data, header);

  return new Promise(resolve => {
    excel.export_json_to_excel({
      header,
      data,
      filename
    });
    resolve();
  });
}
