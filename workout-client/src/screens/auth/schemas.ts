import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  last_name: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  weight: Yup.number()
    .positive("Weight must be non 0")
    .max(10000, "Enter realistic weight"),
  height: Yup.number()
    .positive("Height must be non 0")
    .max(1000, "Enter realistic height"),
});
