import React, { useState } from "react";
import Button from "./components/base/button";
import Input from "./components/base/input";
import Form from "./components/employee/Form";
import Modal from "./components/base/modal/Modal";

export default function App() {
  // Lấy danh sách employee trên local
  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  });
  const [showForm, setShowForm] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [baseId, setBaseId] = useState("");

  // Hàm mở form
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Hàm đóng form
  const handleCloseForm = () => {
    setShowForm(false);
    setEmployeeInfo(null);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  // hàm cập nhật lại state sau khi thêm mới hoặc update
  const handleUpdateEmployees = (newEmployees) => {
    setEmployees(newEmployees);
  };

  // Hàm mở form cập nhật và lấy id của nhân viên
  const handleUpdate = (employee) => {
    setShowForm(true);

    // Cập nhật thông tin cho employeeInfo
    setEmployeeInfo(employee);
  };

  // Hàm mở modal xác nhận xóa và lấy id cần xóa
  const handleShowModalDelete = (id) => {
    setShowModal(true);
    setBaseId(id);
  };

  // Hàm đóng modal xác nhận xóa
  const handleCloseModalDelete = () => {
    // Đóng modal xác nhận xóa
    setShowModal(false);

    // Reset lại baseId
    setBaseId("");
  };

  const handleDelete = () => {
    // Lọc ra danh sách nhân viên có id khác với id cần xóa
    const filterEmployees = employees.filter(
      (employee) => employee.id !== baseId
    );

    // Lưu dữ liệu lên local
    localStorage.setItem("employees", JSON.stringify(filterEmployees));

    // Cập nhật lại danh sách để component re-render
    setEmployees(filterEmployees);

    handleCloseModalDelete();
  };

  return (
    <>
      {/* Form  */}

      {showForm && (
        <Form
          employeeInfo={employeeInfo}
          onCloseForm={handleCloseForm}
          onLoadDate={handleUpdateEmployees}
        />
      )}

      {/* Modal xác nhận */}

      {showModal && (
        <Modal
          onClose={handleCloseModalDelete}
          onConfirm={handleDelete}
          title="Xác nhận"
          message="Bạn có chắn chắn muốn xóa nhân viên này không?"
        />
      )}

      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <Button type="primary" onClick={handleShowForm}>
              Thêm mới nhân viên
            </Button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <Input onChange={handleSearch} placeholder="Tìm kiếm theo tên" />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" />
          </div>
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={2}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{employee.employeeName}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {employee.status ? (
                        <>
                          <div className="status status-active" />
                          <span> Đang hoạt động</span>
                        </>
                      ) : (
                        <>
                          <div className="status status-stop" />
                          <span>Ngừng hoạt động</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="button button-block">Chặn</span>
                  </td>
                  <td>
                    <span
                      onClick={() => handleUpdate(employee)}
                      className="button button-edit"
                    >
                      Sửa
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => handleShowModalDelete(employee.id)}
                      className="button button-delete"
                    >
                      Xóa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected="">Hiển thị 10 bản ghi trên trang</option>
              <option>Hiển thị 20 bản ghi trên trang</option>
              <option>Hiển thị 50 bản ghi trên trang</option>
              <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>
    </>
  );
}
