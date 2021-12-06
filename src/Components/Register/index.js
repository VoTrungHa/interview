import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FormInputText from "../FormInput";
import Fullscreen from "../FullScreen";
import * as Yup from "yup";
import { toast } from "../Toast";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email đang còn trống")
    .email("Email không hợp lệ!"),
  passconfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Xác nhận mật khẩu không trùng khớp!"
  ),
  password: Yup.string()
    .required("Mật khẩu đang còn trống !")
    .min(8, "Mật khẩu chứa ít nhất 8 ký tự"),
});
export default function Register() {
  const navigate = useNavigate();
  const [hidenPassword, setHiddenPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      passconfirm: "",
      password: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const infoUser = {
          email: values.email,
          password: values.password,
        };
        localStorage.setItem("info-user", JSON.stringify(infoUser));
        toast.success("Đăng ký tài khoản thành công!");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { errors, values, handleSubmit, handleChange } = formik;
  const showError = (errors) => {
    Object.values(errors).map((item, index) => {
      toast.error(item);
    });
  };
  return (
    <Fullscreen>
      <form className="form" onSubmit={handleSubmit}>
        <div className="caption">
          <h2>Đăng ký</h2>
        </div>
        <div className="formGroup">
          <FormInputText
            value={values.email}
            type="text"
            name="email"
            required={true}
            handleChange={handleChange}
            label="Địa chỉ email"
          />
        </div>
        <div className="formGroup">
          <FormInputText
            value={values.password}
            type={hidenPassword ? "text" : "password"}
            name="password"
            required={true}
            handleChange={handleChange}
            label="Mật khẩu"
          />
        </div>
        <div className="formGroup">
          <FormInputText
            value={values.passconfirm}
            type={hidenPassword ? "text" : "password"}
            name="passconfirm"
            required={true}
            handleChange={handleChange}
            label="Xác nhận mật khẩu"
          />
        </div>
        {values.password && (
          <div className="formGroup">
            <span
              className="show-pass"
              onClick={() => setHiddenPassword(!hidenPassword)}
            >
              {hidenPassword ? "Ẩn mật khẩu" : "hiển thị mật khẩu"}
            </span>
          </div>
        )}

        <div className="formGroup">
          <button onClick={() => (errors ? showError(errors) : handleSubmit)}>
            Đăng ký
          </button>
        </div>
        <span className="navigate" onClick={() => navigate("/login")}>
          Quay lại đăng nhập!
        </span>
      </form>
    </Fullscreen>
  );
}
