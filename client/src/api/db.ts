import axios from "axios";
import { useDispatch } from "react-redux";
import { sended } from "../redux/sendedSlice";

/** Fetch data func */
export const dbFunc = (url: string, method: string, obj: Object) => {
  // const dispatch = useDispatch();
  if (method === "post") {
    axios
      .post(url, obj)
      .then((res) => {
        console.log(res.data);
        // dispatch(sended(true));
      })
      .catch((err) => {
        console.log(err);
        // dispatch(sended(false));
      });
  } else if (method === "get") {
    axios
      .post(url)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
};
