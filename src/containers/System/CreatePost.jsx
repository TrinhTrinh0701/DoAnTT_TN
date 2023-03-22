import React, { useEffect, useState } from "react";
import { Overview, Address, Loading, Button, Map } from "../../components";
import { apiUploadImages, apiUpdatePost } from "../../services";
import icons from "../../ultils/icons";
import { useSelector, useDispatch } from "react-redux";
import { getCodes, getCodesArea } from "../../ultils/Common/getCodes";
import { apiCreatePost } from "../../services";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validateFields";
import { resetDataEdit } from "../../store/actions";
import { attention } from "../../ultils/constant";

const { BsCameraFill, ImBin } = icons;

const CreatePost = ({ isEdit }) => {
  const { dataEdit } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit?.description)
        : "",
      target: dataEdit?.overviews?.target || "",
      province: dataEdit?.province || "",
    };
    return initData;
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { prices, areas, categories, provinces } = useSelector(
    (state) => state.app
  );
  const { currentData } = useSelector((state) => state.user);
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );
      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };
  const handleSubmit = async () => {
    let priceCodeArr = getCodes(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 99);
    let areaCode = areaCodeArr[0]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload.categoryCode)?.value
      } ${payload?.address?.split(",")[0]} `,
    };
    const result = validate(finalPayload, setInvalidFields);
    if (result === 0) {
      if (dataEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;

        const response = await apiUpdatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã chỉnh sửa bài đăng thành công",
            "success"
          ).then(() => {
            resetPayload();
            dispatch(resetDataEdit());
          });
        } else {
          Swal.fire("Không thành công!!!", "Đã bị lỗi rồi", "error");
        }
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire("Thành công", "Đã thêm bài đăng mới", "success").then(
            () => {
              resetPayload();
            }
          );
        } else {
          Swal.fire("Không thành công!!!", "Đã bị lỗi rồi", "error");
        }
      }
    }
  };
  const resetPayload = () => {
    setPayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
    });
  };
  return (
    <div className="px-6 ">
      <h1 className="py-4 text-3xl font-medium border-b border-gray600">
        {isEdit ? "Chỉnh sửa tin đăng" : " Đăng tin mới"}
      </h1>
      <div className="flex gap-4">
        <div className="flex flex-col flex-auto gap-8 py-4">
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <Overview
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full mb-6">
            <h2 className="py-4 text-xl font-semibold">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray border-dashed rounded-md"
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <BsCameraFill color="orange" size={50} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="file"
                multiple
              />
              <small className="block w-full text-red">
                {invalidFields?.some((item) => item.name === "images") &&
                  invalidFields?.find((item) => item.name === "images")
                    ?.message}
              </small>
              <div className="w-full">
                <h3 className="py-4 font-medium">Ảnh đã chọn</h3>
                <div className="flex items-center gap-4">
                  {imagesPreview?.map((item) => {
                    return (
                      <div key={item} className="relative w-1/3 h-1/3 ">
                        <img
                          src={item}
                          alt="preview"
                          className="object-cover w-full h-full rounded-md"
                        />
                        <span
                          title="Xóa"
                          onClick={() => handleDeleteImage(item)}
                          className="absolute top-0 right-0 p-2 rounded-full cursor-pointer bg-gray hover:bg-gray600"
                        >
                          <ImBin />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text={isEdit ? "Cập nhật bài đăng" : "Tạo bài đăng mới"}
            bgColor="bg-[#4caf50]"
            textColor="text-white"
          />
          {/* <div className="h-[500px]"></div> */}
        </div>
        <div className="w-[30%] flex-none pt-12">
          <Map address={payload?.address}></Map>
          <div className="mt-8 bg-[#FFF3CD] text-[#856404] rounded-md p-4">
            <h4 className="mb-4 text-xl font-medium">Lưu ý khi đăng tin</h4>
            <ul className="pl-6 text-sm text-justify list-disc">
              {attention.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
