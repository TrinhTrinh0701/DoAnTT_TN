import React, { useState } from "react";
import { InputForm, Button } from "../../components";
import Swal from "sweetalert2";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handleSubmit = () => {
    Swal.fire(
      `Cảm ơn! ${payload.name ? payload.name : ""}`,
      "Phản hồi của bạn đã được chúng tôi ghi nhận ",
      "success"
    ).then(() => {
      setPayload({
        name: "",
        phone: "",
        content: "",
      });
    });
  };
  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-semibold">Liên hệ với chúng tôi</h1>
      <div className="flex gap-4 ">
        <div className="flex flex-col h-fit flex-1 gap-4 p-4 rounded-[30px] bg-gradient-to-br from-[#0b8363] to-[#1ee5b2] text-white ">
          <h4 className="font-medium ">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTro.vn
          </span>
          <span>Điện thoại: 0356 776 829</span>
          <span>Email: cskh.phongtro@gmail.com</span>
          <span>Zalo: 0356 776 829</span>
          <span>Viber: 0356 776 829</span>
          <span>
            Địa chỉ: LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ,
            Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
          </span>
        </div>
        <div className="flex-1 p-4 mb-6 bg-white rounded-md shadow-md">
          <h4 className="mb-4 text-lg font-medium">Liên hệ trực tuyến</h4>
          <div className="flex flex-col gap-4">
            <InputForm
              value={payload.name}
              setValue={setPayload}
              label="HỌ VÀ TÊN CỦA BẠN"
              keyPayload="name"
            ></InputForm>
            <InputForm
              value={payload.phone}
              setValue={setPayload}
              label="SỐ ĐIỆN THOẠI CỦA BẠN"
              keyPayload="phone"
            ></InputForm>
            <div>
              <label htmlFor="desc">NỘI DUNG MÔ TẢ</label>
              <textarea
                value={payload.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e.target.value }))
                }
                className="outline-none bg-[#f2f2f2] p-2 rounded-md w-full "
                id="desc"
                name="content"
              ></textarea>
            </div>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-[#ff5722]"
              textColor="text-white"
              fullWidth
              onClick={handleSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
