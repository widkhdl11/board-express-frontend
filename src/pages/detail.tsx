import { FC, FormEvent, useEffect, useState } from "react";
import { useMe } from "../hooks";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IPost } from "./home";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FiEdit3 } from "react-icons/fi";
import EditTitle from "../components/EditTitle";

export interface IComments {
  content: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  user: { account: string };
  userId: number;
}
const Detail: FC = () => {
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComments[]>();
  const [isEditToggle, setIsEditToggle] = useState<boolean>(false);

  const { account, getMe } = useMe();
  const { postId } = useParams();

  const [updateContent, setUpdateContent] = useState<string>("");

  const onClickUpdateContent = async () => {
    try {
      if (!updateContent || post?.content === updateContent) {
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL!}/post/${postId}`,
        { content: updateContent },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPost(response.data.updatedPost);
    } catch (error) {
      console.error(error);
    }
  };
  const [content, setContent] = useState<string>();

  const onSubmitCreate = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!content) {
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/comment`,
        { content, postId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setContent("");
      getComment();
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/post/${postId}`
      );

      setPost(response.data.post);
      setUpdateContent(response.data.post.content);
    } catch (error) {
      console.error(error);
    }
  };

  const getComment = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL!}/comment/?postId=${postId}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMe();
    getPost();
    getComment();
  }, []);

  return (
    <main className="max-w-screen-md mx-auto py-24">
      {post ? (
        <>
          <div className="border-b-2">
            {account === post.user.account ? (
              <EditTitle
                title={post.title}
                postId={post.id}
                setPost={setPost}
              />
            ) : (
              <h1 className="text-center font-bold py-8 text-2xl">
                {post.title}
              </h1>
            )}
            <div className="pb-2 text-sm px-20 flex justify-between">
              <div>
                {account === post.user.account && (
                  <button onClick={() => setIsEditToggle(!isEditToggle)}>
                    {isEditToggle ? (
                      <>
                        <button onClick={onClickUpdateContent}>
                          <FiEdit3
                            className="inline hover:text-blue-300 mr-2"
                            size={24}
                          />
                          <span>Cancel</span>
                        </button>
                      </>
                    ) : (
                      <FiEdit3
                        className="inline hover:text-blue-300"
                        size={24}
                      />
                    )}
                  </button>
                )}
              </div>
              <div>
                <span>{post.user.account}, </span>
                <span>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    locale: ko,
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="px-20 py-12 min-h-[360px] whitespace-pre-wrap">
            {isEditToggle ? (
              <textarea
                className="px-4 py-2 w-full h-96 focus:outline-none focus:border-blue-300 border-2 rounded-md resize-none"
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
              />
            ) : (
              <span className="">{post.content}</span>
            )}
          </div>
          <form className="flex flex-col px-20 pt-4" onSubmit={onSubmitCreate}>
            <textarea
              className="px-4 py-2 h-28 focus:outline-none focus:border-blue-300 border-2 rounded-md resize-none"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <input
              type="submit"
              className="self-end mt-2 button-style"
              value="Create"
            ></input>
          </form>
          {comments && (
            <ul className="px-20 mt-2">
              {comments.map((v, i) => (
                <li key={i} className="flex mb-2">
                  <span className="inline-block w-20 text-right">
                    {v.user.account}
                  </span>
                  <span className="inline-block w-96 pl-2 truncate">
                    {v.content}
                  </span>
                  <span className="pl-2">
                    {formatDistanceToNow(new Date(v.createdAt), {
                      locale: ko,
                      addSuffix: true,
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        "Loading..."
      )}
    </main>
  );
};

export default Detail;
