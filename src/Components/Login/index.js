import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../Toast";
import { useFormik } from "formik";
import FormInputText from "../FormInput";
import Fullscreen from "../FullScreen";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  // validate data
  email: Yup.string()
    .required("Email đang còn trống")
    .email("Email không hợp lệ!"),
  password: Yup.string()
    .required("Mật khẩu đang còn trống !")
    .min(8, "Mật khẩu chứa ít nhất 8 ký tự"),
});

export default function Login() {
  const navigate = useNavigate();
  const [initStateValue, setInitStateValue] = useState({
    email: "",
    password: "",
  });
  const [hidenPassword, setHiddenPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("info-user")) {
      const data = JSON.parse(localStorage.getItem("info-user"));
      const info = {
        email: data.email,
        password: data.password,
      };
      setInitStateValue(info);
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // check info login form user
        if (initStateValue.email !== values.email) {
          toast.error("Email không tồn tại!");
        } else {
          if (initStateValue.password !== values.password) {
            toast.error("Mật khẩu không đúng");
          } else {
            // if success head to pagehome
            navigate("/home");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { errors, values, handleSubmit, handleChange } = formik;

  const showError = (errors) => {
    // show errors
    Object.values(errors).map((item, index) => {
      toast.error(item);
    });
  };

  return (
    <Fullscreen>
      <form className="form" onSubmit={handleSubmit}>
        <div className="caption">
          <h2>Đăng nhập</h2>
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
            Đăng nhập
          </button>
        </div>
        <span className="navigate" onClick={() => navigate("/register")}>
          Đăng ký tài khoản
        </span>
      </form>
    </Fullscreen>
  );
}
