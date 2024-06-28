import React, { useEffect, useState } from "react";
import Input from "../base/input";
import { v4 as uuidv4 } from "uuid";
import Button from "../base/button";

export default function Form({ onCloseForm, onLoadDate, employeeInfo }) {
  // null, undifined, NaN, false, "", 0 => Mặc định là false

  // Lấy danh sách employee trên local
  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  });

  const [employee, setEmployee] = useState({
    employeeName: "",
    dateOfBirth: "",
    email: "",
    address: "",
  });
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    setEmployee(employeeInfo);
  }, [employeeInfo]);

  // Hàm validate dữ liệu đầu vào
  const validateData = (name, value) => {
    let valid = true;
    switch (name) {
      case "employeeName":
        if (!value) {
          setNameError("Tên không được để trống");
          valid = false;
        } else {
          setNameError("");
        }
        break;

      default:
        return valid;
    }

    return valid;
  };

  // Hàm lưu thông tin nhân viên lên local
  const handleSave = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));

    setEmployees(data);

    // Đóng form
    onCloseForm();

    // Load lại dữ liệu
    onLoadDate(data);
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });

    // Gọi hàm validate
    validateData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameValid = validateData("employeeName", employee.employeeName);

    if (nameValid) {
      if (employeeInfo) {
        // Cập nhật dữ liệu
        const filterEmployees = employees.filter(
          (employee) => employee.id !== employeeInfo.id
        );

        const newEmployees = [...filterEmployees, employee];

        handleSave("employees", newEmployees);
      } else {
        // Tiến hành submit dữ liệu
        const newEmployee = { ...employee, id: uuidv4(), status: true };

        const newEmployees = [...employees, newEmployee];

        handleSave("employees", newEmployees);
      }
    }
  };

  return (
    <>
      {/* Form thêm mới nhân viên */}
      <div className="overlay">
        <form className="form" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>
              {employeeInfo ? "Chỉnh sửa nhân viên" : "Thêm mới nhân viên"}
            </h4>
            <i onClick={onCloseForm} className="fa-solid fa-xmark" />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <Input
              name="employeeName"
              value={employee?.employeeName}
              onChange={handleChangeValue}
            />
            {nameError && <div class="form-text error">{nameError}</div>}
          </div>
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <Input
              name="dateOfBirth"
              value={employee?.dateOfBirth}
              onChange={handleChangeValue}
              type={"date"}
            />
          </div>
          {/* <div class="form-text error">
    Ngày sinh không được lớn hơn ngày hiện tại.
  </div> */}
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <Input
              name="email"
              value={employee?.email}
              onChange={handleChangeValue}
            />
          </div>
          {/* <div class="form-text error">Email không được để trống.</div> */}
          <div>
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <Input
              name="address"
              value={employee?.address}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <Button className="w-100" type="primary">
              {employeeInfo ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
