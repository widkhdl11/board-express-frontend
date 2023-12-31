import axios from "axios";
import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmitLogIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/auth`,
        {
          account,
          password,
        }
      );

      if (response.status !== 200) {
        return;
      }

      // 로컬스토리지 저장
      // 홈으로 보내기
      localStorage.setItem("token", response.data.token);
      navigate("/");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center pb-20">
      <h1 className="text-2xl font-bold">Jaewon Board Log In</h1>
      <form className="mt-8 flex items-end gap-4" onSubmit={onSubmitLogIn}>
        <div className="flex flex-col gap-2 relative">
          <input
            className="input-style"
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          ></input>
          <input
            className="input-style"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <Link
            to={"/sign-up"}
            className="absolute -bottom-5 left-2 text-xs text-blue-500 active:text-blue-700"
          >
            Create An account
          </Link>
        </div>
        <input className="button-style" type="submit" value="Log In"></input>
      </form>
    </main>
  );
};

export default Login;
