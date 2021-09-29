import axios from "axios";

export const dbFunc = (url: string, method: string, obj: Object): void => {
  if (method === "post") {
    //
    axios
      .post(url, obj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  } else if (method === "get") {
    axios
      .post(url)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
};

/* {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }*/
