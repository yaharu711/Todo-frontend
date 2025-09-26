import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";

const MenueModalPortalViewModel = (changeIsOpen: (open: boolean) => void) => {
  const navigate = useNavigate();
  const onClickSetting = () => {
    changeIsOpen(false);
    setTimeout(() => {
      navigate(ROUTE_PATHS.settings);
    }, 300); // アニメーションが終わる頃に遷移
  };

  return {
    onClickSetting,
  };
};

export default MenueModalPortalViewModel;
