import axios from "axios";
const BaseUrl = "http://144.126.242.196:5000/api";
//const BaseUrl = "https://3a27-184-22-37-66.ngrok.io/api";

async function apiservice({ url, method, path, body, token }) {
  try {
    let header = {
      "Content-Type": "application/json",
    };

    if (token != undefined) {
      header.Authorization = "Bearer " + token;
    }
    const response = await axios({
      method: method,
      data: body,
      url: BaseUrl + path,
      headers: header,
    });

    if (response.status == 200) {
      return {
        data: response.data,
        status: 200,
      };
    }
    // response
    return response;
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
    };
  }
}

export { apiservice };
