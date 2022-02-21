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
export async function authActionResetPassword({ state, token, user }) {
  try {
    const response = await apiservice({
      path: "/authen/resetpassword?id=" + user,
      method: "post",
      body: { ...state, id: user },
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
export async function authActionEditFeed({ state, token }) {
  try {
    const response = await apiservice({
      path: "/lesson/updatefeed",
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
export async function authActionEditLesson({ state, token, id }) {
  try {
    const response = await apiservice({
      path: "/lesson/updatelesson/" + id,
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
export async function authActionEditComponent({ state, token, id }) {
  try {
    const response = await apiservice({
      path: "/lesson/updatecomponent/" + id,
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
export async function authActionDeleteComponent({ id }) {
  try {
    const response = await apiservice({
      path: "/lesson/deletecomponent/" + id,
      method: "delete",
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
export async function authActionCreateTest({ state }) {
  try {
    const response = await apiservice({
      path: "/lesson/createtest",
      method: "post",
      body: state,
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
export async function authActionDeleteFeed({ id }) {
  try {
    const response = await apiservice({
      path: "/lesson/deletefeed?id=" + id,
      method: "delete",
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
export async function authActionDeleteLesson({ id }) {
  try {
    const response = await apiservice({
      path: "/lesson/deletelesson/" + id,
      method: "delete",
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
export async function authActionCreateLesson({ state, token }) {
  try {
    const response = await apiservice({
      path: "/lesson/createlesson",
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
export async function authActionCreateComponent({ state, token }) {
  try {
    const response = await apiservice({
      path: "/lesson/createcomponent",
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
export async function authActionForgetPassword({ state }) {
  try {
    const response = await apiservice({
      path: "/authen/forgetpassword",
      method: "post",
      body: state,
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
