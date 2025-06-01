import { useCheckLineBotFriend } from "../../api/Line/hooks";

const useSettingPageViewModel = () => {
  const { data, isPending } = useCheckLineBotFriend();

  return {
    isLineBotFriend: data?.friend_flag,
    isPending,
  };
};

export default useSettingPageViewModel;
