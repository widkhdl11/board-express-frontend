import { FC, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import { CgSpinner } from "react-icons/cg";

export interface IPost {
  content: string;
  createdAt: Date;
  id: number;
  title: string;
  updatedAt: Date;
  user: { account: string };
  userId: number;
}

const Home: FC = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getPosts = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/post?page=${page}`
      );

      setPosts(response.data.posts);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const getCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/post/count`
      );

      setCount(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error(error);
    }
  };

  const pageComp = () => {
    let pageCompArray = [];
    for (let i = 0; i < count; i++) {
      pageCompArray.push(
        <li
          key={i}
          onClick={() => {
            currentPage !== i && getPosts(i);
          }}
          className={`cursor-pointer p-2  ${
            currentPage !== i
              ? "hover:font-semibold hover:text-black text-gray-300"
              : "text-black"
          }`}
        >
          {i + 1}
        </li>
      );
    }
    return pageCompArray;
  };

  // 토큰 있는지 체크
  // 백엔드에 맞는 토큰인지 확인
  // 틀리면 로그인 보냄

  useEffect(() => {
    getPosts(0);
    getCount();
  }, []);

  return (
    <main className=" max-w-screen-md mx-auto">
      <h1 className="mt-20 text-center font-bold text-2xl">Jaewon's 게시판</h1>
      <ul className="mt-10 h-[440px]">
        <li className=" flex justify-between [&>span]:p-2 border-b-2 mb-2 font-semibold text-center">
          <span className=" w-2/12 ">아이디</span>
          <span className=" w-6/12 ">제목</span>
          <span className=" w-2/12 ">사용자</span>
          <span className=" w-2/12 ">작성일</span>
        </li>
        {posts ? (
          posts?.map((v, i) => {
            return <PostCard key={i} index={i} post={v} />;
          })
        ) : (
          <div className="h-full flex justify-center items-center pb-8">
            <CgSpinner className="animate-spin" />
          </div>
        )}
      </ul>
      <ul className="flex text-lg justify-center">
        {count !== 0 && pageComp()}
      </ul>
    </main>
  );
};

export default Home;
