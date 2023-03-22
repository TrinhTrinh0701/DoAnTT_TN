import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

const ManagePost = () => {
  const dispatch = useDispatch();
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("0");

  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit, updateData]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);
  useEffect(() => {
    setPosts(postOfCurrent);
  }, [postOfCurrent]);
  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId);
    if (response?.data.err === 0) {
      Swal.fire("Thành công", "Đã xóa bài đăng thành công", "success").then(
        () => {
          setUpdateData((prev) => !prev);
        }
      );
    } else {
      Swal.fire("Oops!!", "Xóa không thành công", "error");
    }
  };

  useEffect(() => {
    if (status === 1) {
      const activePost = postOfCurrent?.filter((item) =>
        checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (status === 2) {
      const expiredPost = postOfCurrent?.filter(
        (item) => !checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(expiredPost);
    } else {
      setPosts(postOfCurrent);
    }
  }, [status]);
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex items-center justify-between py-4 border-b border-gray600">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          onChange={(e) => setStatus(+e.target.value)}
          className="p-2 border rounded-md outline-none border-gray600 "
          value={status}
        >
          <option value="0">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-fixed ">
        <thead>
          <tr className="flex w-full bg-[#c8fbdb]">
            <th className="w-[169px] p-2 border  border-gray">Mã tin</th>
            <th className="w-[151px] p-2 border border-gray">Ảnh đại diện</th>
            <th className="flex-1 p-2 border border-gray">Tiêu đề</th>
            <th className="flex-1 p-2 border border-gray">Giá</th>
            <th className="w-[152px] p-2 border border-gray">Ngày bắt đâu</th>
            <th className="flex-1 p-2 border border-gray">Ngày hết hạn</th>
            <th className="flex-1 p-2 border border-gray">Trạng thái</th>
            <th className="flex-1 p-2 border border-gray">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>
              <td>Bạn chưa có tin đăng nào. Bấm vào đây để bắt đầu đăng tin</td>
            </tr>
          ) : (
            posts?.map((item) => {
              return (
                <tr key={item.id} className="flex items-center w-full h-16">
                  <td className="flex items-center justify-center w-[169px] h-full px-2 border border-gray">
                    {item?.overviews?.code}
                  </td>
                  <td className="flex items-center justify-center w-[151px] h-full px-2  border border-gray">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="object-cover w-12 h-12 rounded-md "
                    />
                  </td>
                  <td className="flex items-center justify-center flex-1 h-full px-2 border border-gray">
                    {`${item?.title?.slice(0, 30)}...`}
                  </td>
                  <td className="flex items-center justify-center flex-1 h-full px-2 border border-gray">
                    {item?.attributes?.price}
                  </td>
                  <td className="flex items-center justify-center w-[152px]  h-full px-2 border border-gray">
                    {item?.overviews?.created}
                  </td>
                  <td className="flex items-center justify-center flex-1 h-full px-2 border border-gray">
                    {item?.overviews?.expired}
                  </td>
                  <td className="flex items-center justify-center flex-1 h-full px-2 border border-gray">
                    {checkStatus(item?.overviews?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="flex items-center justify-center flex-1 h-full gap-4 px-2 border border-gray ">
                    <Button
                      text="Sửa"
                      bgColor="bg-[#357a38]"
                      textColor="text-white"
                      onClick={() => {
                        dispatch(actions.editData(item));
                        setIsEdit(true);
                      }}
                    ></Button>
                    <Button
                      text="Xóa"
                      bgColor="bg-[#ff5622]"
                      textColor="text-white"
                      onClick={() => handleDeletePost(item.id)}
                    ></Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit}></UpdatePost>}
    </div>
  );
};

export default ManagePost;
