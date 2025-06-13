import { useNavigate } from "react-router-dom";

const MenueModalPortalViewModel = (changeIsOpen: (open: boolean) => void) => {
  const navigate = useNavigate();
  const onClickSetting = () => {
    changeIsOpen(false);
    navigate("/settings");
  };

  return {
    onClickSetting,
  };
};

export default MenueModalPortalViewModel;
