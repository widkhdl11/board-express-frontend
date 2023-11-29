import axios from "axios";
import { useState } from "react";

export const useMe = () => {
  const [account, setAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMe = async () => {
    try {
      setIsLoading(true);

      // new Promise ? 잘 이해안됨
      //await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/user/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAccount(response.data.user.account);

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return { account, setAccount, getMe, isLoading };
};
