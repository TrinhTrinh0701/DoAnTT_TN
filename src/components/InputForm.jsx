import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setValue,
  keyPayload,
  invalidFields,
  setInvalidFields,
  type,
}) => {
  return (
    <div>
      <label htmlFor="phone" className="text-xs font-medium">
        {label}
      </label>
      <input
        type={type || "text"}
        id="phone"
        className="outline-none bg-[#f2f2f2] p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
        autoComplete="off"
      />
      {invalidFields?.some((i) => i.name === keyPayload) && (
        <small className="italic text-red">
          {invalidFields.find((i) => i.name === keyPayload)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
