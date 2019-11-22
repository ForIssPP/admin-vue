/**
 * 导出excel
 * @param {Array<string>} header 表头
 * @param {Array<Array<string>>} data 表单信息
 * @param {function} callback 回调函数
 * @param {string} filename Excel文件名
 */
export default async function(
  header,
  data,
  callback,
  filename = new Date().getTime()
) {
  const excel = await import("@/vendor/Export2Excel");
  if (header.length !== data[0].length) {
    return false;
  }
  return new Promise(resolve => {
    excel.export_json_to_excel({
      header,
      data,
      filename
    });
    resolve(callback && callback());
  });
}
