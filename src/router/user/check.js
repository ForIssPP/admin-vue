import routerFactory from "@/utils/router-factory";

const name = [
  "nameCheck",
  "avatarCheck",
  "profilesCheck",
  "albumCheck",
  "userPictureCheck",
  "moneyPictureCheck"
];

export default routerFactory(
  name,
  [
    () => import("@/views/users/name-check"),
    () => import("@/views/users/avatar-check"),
    () => import("@/views/users/profiles-check"),
    () => import("@/views/users/album-check"),
    () => import("@/views/users/user-picture-check"),
    () => import("@/views/users/money-picture-check")
  ],
  name,
  [
    "昵称审核",
    "头像审核",
    "个人介绍审核",
    "相册审核",
    "真人认证审核",
    "财产认证审核"
  ]
);
