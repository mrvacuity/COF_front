import { apiservice } from "../service/api";
export async function authActionEditProfile({ state, token }) {
  try {
    const response = await apiservice({
      path: "/authen/updateuser",
      method: "put",
      body: state,
      token: token,
    });
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    throw error;
  }
}
export async function authActionScore({ state, token }) {
  try {
    const response = await apiservice({
      path: "/lesson/createscore",
      method: "post",
      body: state,
      token: token,
    });
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    throw error;
  }
}
export async function authActionResetPassword({ state, token }) {
  try {
    const response = await apiservice({
      path: "/authen/resetpassword",
      method: "post",
      body: state,
      token: token,
    });
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    throw error;
  }
}
export async function authActionReport({ state, token }) {
  try {
    const response = await apiservice({
      path: "/lesson/createreport",
      method: "post",
      body: state,
      token: token,
    });
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    throw error;
  }
}
export async function authActionComment({ state, token }) {
  try {
    const response = await apiservice({
      path: "/lesson/createcomment",
      method: "post",
      body: state,
      token: token,
    });
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    throw error;
  }
}
export async function authActionCreateFeed({ state, token }) {
  try {
    const response = await apiservice({
      path: "/lesson/createfeed",
      method: "post",
      body: state,
      token: token,
    });
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    throw error;
  }
}
