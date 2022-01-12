import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const userState = atom({
  key: "user", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export const tokenState = atom({
  key: "token", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const arrState = atom({
  key: "array", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const totalsstate = atom({
  key: "totalsstate", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
