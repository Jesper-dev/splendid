import axios from "axios";

export const sendToDB = (url: string, method: string, obj: Object): void => {
  if (method === "post") {
    axios
      .post(url, obj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
};
