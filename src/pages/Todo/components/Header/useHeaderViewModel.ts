import { useNavigate } from "react-router-dom";

const useHeaderViewModel = () => {
  const navigate = useNavigate();
  const onClickSettingButon = () => {
    navigate("/setting");
  };

  return {
    onClickSettingButon,
  };
};

export default useHeaderViewModel;
