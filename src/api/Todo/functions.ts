import axios from "axios";

const getHelloMessage = async (): Promise<string> => {
  const res = await axios.get("http://localhost/api/hello-message", {
    withCredentials: true,
  });
  return res.data;
};

const TodoApi = {
  getHelloMessage,
};

export default TodoApi;
