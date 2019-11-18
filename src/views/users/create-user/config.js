function reLabelAndValue(name) {
  return name.map(e => {
    return {
      label: e,
      value: e
    }
  });
}

export default {
  workWoman: reLabelAndValue([
    '模特',
    '老师',
    '学生',
    '导游',
    '空姐',
    '白领',
    '其他',
  ]),
  workMan: reLabelAndValue([
    "互联网行业",
    "金融行业",
    "制造行业",
    "矿产、金属行业",
    "畜牧行业",
    "艺术行业",
    "食品制造业",
    "房地产行业",
    "医疗行业",
    "其他",
  ]),
  live: reLabelAndValue([
    "极度奢靡",
    "高度奢侈",
    "中产阶级",
    "小资生活",
  ]),
  style: reLabelAndValue([
    "性感",
    "萝莉",
    "女神",
    "淑女",
    "御姐",
    "可爱",
    "多样",
  ]),
  target: reLabelAndValue([
    "寻找精神伴侣",
    "寻找私密关系",
    "打发时间",
    "结交朋友",
  ]),
  address: reLabelAndValue([
    "澳门",
    "台湾",
    "香港",
    "大陆",
    "其他",
  ]),
  somke: reLabelAndValue([
    "老烟枪",
    "社交应酬",
    "偶尔一根",
    "从不抽烟",
  ]),
  drink: reLabelAndValue([
    "品酒达人",
    "社交应酬",
    "偶尔小酌",
    "滴酒不沾",
  ])
}
