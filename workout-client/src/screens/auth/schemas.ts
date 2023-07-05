import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  conf_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
