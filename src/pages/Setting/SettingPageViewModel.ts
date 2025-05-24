import { useCheckLineBotFriend } from "../../api/User/hooks";

const useSettingPageViewModel = () => {
  const { data, isPending } = useCheckLineBotFriend();

  return {
    isLineBotFriend: data?.friend_flag,
    isPending,
  };
};

export default useSettingPageViewModel;
