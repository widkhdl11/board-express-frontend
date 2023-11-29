import { FC, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useMe } from "../hooks";
import { FiLogOut, FiEdit3 } from "react-icons/fi";

const Header: FC = () => {
  const { account, setAccount, getMe, isLoading } = useMe();
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("token");
    setAccount("");
    navigate("/");
  };

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading)
    return <div className="max-w-screen-md mx-auto">Loading...</div>;

  return (
    <>
      <header className="max-w-screen-md mx-auto flex justify-between items-center p-4">
        {account ? (
          <div className="flex items-center">
            {" "}
            <span className="font-semibold">{account}님 환영합니다.</span>
            <Link to="/create" className="button-style">
              <FiEdit3 className="inline" size={24} />
              &nbsp; Create
            </Link>
            <button className="ml-4 button-style flex" onClick={onClickLogout}>
              <FiLogOut className="inline" size={24} /> &nbsp; Log out
            </button>
          </div>
        ) : (
          <div>
            <Link to="/log-in" className="text-blue-500 hover:text-blue-700">
              Log In
            </Link>
            <Link
              to="/sign-up"
              className="ml-4 text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Header;
