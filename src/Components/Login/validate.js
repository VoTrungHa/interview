import Joi from "joi";

const commonSchema = {};

export default Joi.object({
  email: Joi.string().required().messages({
    "string.empty": `Email còn trống`,
    "string.email": `Email không hợp lệ!`,
    "any.required": `"Email là trường bắt buộc`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `Mật khẩu còn trống`,
    "any.required": `"Mật khẩu là trường bắt buộc`,
  }),
});

export const schemaForRss = Joi.object(commonSchema);
