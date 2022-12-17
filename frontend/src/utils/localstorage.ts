import { UserInfo } from "../types";

export const setUserItem = (userInfo: UserInfo) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      role: userInfo.role,
      address: userInfo.address,
    })
  );
};

export const getUserItem = () => {
  const _user = localStorage.getItem("user");
  if (_user) {
    const user = JSON.parse(_user) as UserInfo;
    if (user) {
      return {
        role: user.role,
        address: user.address,
      } as UserInfo;
    }
  }
  return undefined;
};

export const removeUserItem = () => {
  localStorage.removeItem("user");
};
