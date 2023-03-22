import React from "react";
import { Select, InputReadOnly, InputFormV2 } from "./";
import { useSelector } from "react-redux";

const targets = [
  { code: "Tất cả", value: "Tất cả" },
  { code: "Nam", value: "Nam" },
  { code: "Nữ", value: "Nữ" },
];

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { dataEdit } = useSelector((state) => state.post);

  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  return (
    <div>
      <h2 className="py-4 text-xl font-semibold">Thông tin mô tả</h2>
      <div className="flex flex-col w-full gap-4">
        <div className="w-1/2">
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.categoryCode}
            setValue={setPayload}
            name="categoryCode"
            options={categories}
            label="Loại chuyên mục"
          />
        </div>
        <InputFormV2
          value={payload.title}
          setValue={setPayload}
          name="title"
          label="Tiêu đề"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="desc">Nội dung mô tả</label>
          <textarea
            id="desc"
            cols="30"
            rows="10"
            className="w-full p-2 border rounded-md outline-none border-gray600"
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
          ></textarea>
          <small className="block w-full text-red">
            {invalidFields?.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                ?.message}
          </small>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <InputReadOnly
            label="Thông tin liên hệ"
            value={currentData?.name || currentData?.username}
          />
          <InputReadOnly label="Điện thoại" value={currentData?.phone} />
          <InputFormV2
            value={payload.priceNumber}
            setValue={setPayload}
            small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
            label="Giá cho thuê"
            unit="đồng"
            name="priceNumber"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFormV2
            value={payload.areaNumber}
            setValue={setPayload}
            name="areaNumber"
            label="Diện tích"
            unit="m2"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.target}
            setValue={setPayload}
            name="target"
            options={targets}
            label="Đối tượng cho thuê"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
