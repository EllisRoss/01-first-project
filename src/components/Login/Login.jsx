import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, requiredField} from "../../utils/validators/validators";

const maxLength15 = maxLengthCreator(15);
const maxLength20 = maxLengthCreator(20);
const minLength4 = minLengthCreator(4);
const minLength8 = minLengthCreator(8);


const LoginForm = (props) => {
    console.log('rerender');
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'login'} placeholder={'Login'} component={Input} validate={[requiredField, maxLength15, minLength4]}/>
            </div>
            <div>
                <Field name={'password'} placeholder={'Password'} component={Input} validate={[requiredField, maxLength20, minLength8]} type={'password'}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={'input'} type={'checkbox'}/>
                <label>remember me</label>
            </div>
            <button>Log In</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login',
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;