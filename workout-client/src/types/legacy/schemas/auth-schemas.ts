import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Enter email"),
  password: Yup.string().required("Enter Password"),
});

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Enter email"),
  password: Yup.string()
    .required("Enter Password")
    .min(8, "Password is too short - should be 8 chars minimum."),
  password_cofg: Yup.string()
    .required("Confirm Password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  first_name: Yup.string()
    .required("Enter First Name")
    .min(2, "First name is too short"),
  last_name: Yup.string()
    .required("Enter Last Name")
    .min(2, "Last name is too short"),
  weight: Yup.number().min(0).max(500),
  height: Yup.number().min(0).max(300),
  fat_percentage: Yup.number().min(0).max(100),
});

export { LoginSchema, RegistrationSchema };
