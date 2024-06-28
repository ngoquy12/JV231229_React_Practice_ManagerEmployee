import React from "react";

export default function Modal({
  title,
  message,
  onClose,
  onConfirm,
  cancelText,
  okText,
}) {
  return (
    <>
      <div className="overlay">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>{title || "Tiêu đề"}</h4>
            <i onClick={onClose} className="fa-solid fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <span>{message || "Nội dung thông báo"}</span>
          </div>
          <div className="modal-footer-custom">
            <button onClick={onClose} className="btn btn-light">
              {cancelText || "Hủy"}
            </button>
            <button onClick={onConfirm} className="btn btn-danger">
              {okText || "Xác nhận"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
