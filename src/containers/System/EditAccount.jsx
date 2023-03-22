import React, { useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { apiUpdateUser } from "../../services";
import { fileToBase64, blobToBase64 } from "../../ultils/Common/tobase64";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";

const EditAccount = () => {
  const dispatch = useDispatch();

  const { currentData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: blobToBase64(currentData?.avatar) || "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });
  const handleSubmit = async () => {
    const response = await apiUpdateUser(payload);
    if (response?.data.err === 0) {
      Swal.fire(
        "Thành công",
        "Đã chỉnh sửa thông tin cá nhân thành công",
        "success"
      ).then(() => {
        dispatch(getCurrent());
      });
    } else {
      Swal.fire("Oops!!", "Chỉnh sửa không thành công", "error");
    }
  };
  const handleUploadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);

    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };

  return (
    <div className="flex flex-col items-center h-full px-6">
      <h1 className="w-full py-4 text-3xl font-medium border-b text-start border-gray600">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="flex items-center justify-center w-3/5 ">
        <div className="flex flex-col w-full gap-4 py-16">
          <InputReadOnly
            value={
              `#${currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}` || ""
            }
            direction="flex-row"
            label="Mã thành viên"
          ></InputReadOnly>
          <InputReadOnly
            value={currentData?.phone}
            editPhone
            direction="flex-row"
            label="Số điện thoại"
          ></InputReadOnly>
          <div className="flex flex-col gap-3 mt-5">
            <InputFormV2
              setValue={setPayload}
              name="name"
              direction="flex-row"
              label="Tên hiển thị"
              value={payload.name}
            ></InputFormV2>

            <InputFormV2
              setValue={setPayload}
              name="zalo"
              direction="flex-row"
              label="Zalo"
              value={payload.zalo}
            ></InputFormV2>
            <InputFormV2
              setValue={setPayload}
              name="fbUrl"
              direction="flex-row"
              label="Facebook"
              value={payload.fbUrl}
            ></InputFormV2>
            <div className="flex mt-6">
              <label className="flex-none w-48" htmlFor="password">
                Mật khẩu
              </label>
              <small className="flex-auto text-sm cursor-pointer text-orangce">
                Đổi mật khẩu
              </small>
            </div>
          </div>
          <div className="flex mt-10 mb-10">
            <label className="flex-none w-48" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div className="">
              <img
                src={payload.avatar || anonAvatar}
                alt="avatar"
                className="object-cover rounded-full w-28 h-28"
              />

              <input
                onChange={handleUploadFile}
                type="file"
                className="my-4 appearance-none "
                id="avatar"
              />
            </div>
          </div>
          <Button
            text="Lưu và cập nhật"
            bgColor="bg-[#3c8c40]"
            textColor="text-white"
            onClick={handleSubmit}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
