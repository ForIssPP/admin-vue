function reLabelAndValue(name) {
  return name.map((e, i) => {
    return {
      label: e,
      value: String(i)
    };
  });
}

export default {
  workWoman: reLabelAndValue([
    "无",
    "模特",
    "老师",
    "学生",
    "导游",
    "空姐",
    "白领",
    "其他"
  ]),
  workMan: reLabelAndValue([
    "无",
    "互联网行业",
    "金融行业",
    "制造行业",
    "矿产、金属行业",
    "畜牧行业",
    "艺术行业",
    "食品制造业",
    "房地产行业",
    "医疗行业",
    "其他"
  ]),
  life_quality: reLabelAndValue([
    "无",
    "极度奢靡",
    "高度奢侈",
    "中产阶级",
    "小资生活"
  ]),
  style: reLabelAndValue([
    "无",
    "性感",
    "萝莉",
    "女神",
    "淑女",
    "御姐",
    "可爱",
    "多样"
  ]),
  purpose: reLabelAndValue([
    "无",
    "寻找精神伴侣",
    "寻找私密关系",
    "打发时间",
    "结交朋友"
  ]),
  position: [
    {
      label: "澳门",
      value: "澳门"
    },
    {
      label: "台湾",
      value: "台湾"
    },
    {
      label: "香港",
      value: "香港"
    },
    {
      label: "大陆",
      value: "大陆"
    },
    {
      label: "其他",
      value: "其他"
    }
  ],
  smoke: reLabelAndValue(["老烟枪", "社交应酬", "偶尔一根", "从不抽烟"]),
  drink: reLabelAndValue(["品酒达人", "社交应酬", "偶尔小酌", "滴酒不沾"]),
  defaultForm: {
    nickname: undefined,
    position: undefined,
    mobile: undefined,
    introduction: undefined,
    age: undefined,
    purpose: undefined,
    is_vip: undefined,
    profession: undefined,
    style: undefined,
    height: undefined,
    smoke: undefined,
    life_quality: undefined,
    drink: undefined,
    auth_state: undefined,
    sex: "2",
    make_friend: "0",
    measurements: [],
    photo: []
  }
};
