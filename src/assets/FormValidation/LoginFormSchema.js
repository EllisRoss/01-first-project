import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
    login: Yup.string()
        //минимальная длина - 2 символа
        .min(4, " Must be longer than 4 characters")
        //максимальная длина - 20 символов
        .max(20, "So long")
        .required(" Required"),
    password: Yup.string()
        .min(8, " Must be longer than 8 characters")
        .required(" Required")
});

export default loginFormSchema;