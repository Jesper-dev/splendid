import axios from "axios";

/** Fetch data func */
export const dbFunc = (url: string, method: string, obj: Object) => {
  if (method === "post") {
    axios
      .post(url, obj)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (method === "get") {
    axios
      .post(url)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
};
