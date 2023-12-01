import axios from "axios";
import { FC, useState, FormEvent, Dispatch, SetStateAction } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IPost } from "../pages/home";

interface EditTitleProps {
  title: string;
  postId: number;
  setPost: Dispatch<SetStateAction<IPost | undefined>>;
}

const EditTitle: FC<EditTitleProps> = ({ title, postId, setPost }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>(title);

  const onMouseEnterHover = () => {
    if (isEdit) return;
    setIsHover(true);
  };
  const onMouseLeaveHover = () => {
    if (isEdit) return;
    setIsHover(false);
  };

  const onClickEditToggle = () => {
    setIsEdit(true);
    setIsHover(false);
  };

  const onClickCancel = () => {
    setIsEdit(false);
  };

  const onSubmitUpdateTitle = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!updateTitle || title === updateTitle) {
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL!}/post/${postId}`,
        { title: updateTitle },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPost(response.data.updatedPost);
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <h1
      onMouseEnter={onMouseEnterHover}
      onMouseLeave={onMouseLeaveHover}
      className="text-center font-bold py-8 text-2xl cursor-pointer relative"
    >
      {isEdit ? (
        <form className="max-w-lg flex mx-auto" onSubmit={onSubmitUpdateTitle}>
          <input
            className="grow input-style text-base"
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <button type="submit" className="text-base button-style">
            <FiEdit3 className="inline" />
            수정
          </button>
          <button onClick={onClickCancel} className="text-base button-style">
            취소
          </button>
        </form>
      ) : (
        title
      )}
      {isHover && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-xl font-normal">
          <button className="button-style" onClick={onClickEditToggle}>
            <FiEdit3 className="inline mr-2" />
            수정
          </button>
        </div>
      )}
    </h1>
  );
};

export default EditTitle;
