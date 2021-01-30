import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../common/FormsControls/FormControls.module.css";

const maxLength30 = maxLengthCreator(30);


const LoginForm = (props) => {
    console.log('rerender');
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'}
                       placeholder={'Email'}
                       component={Input}
                       validate={[requiredField, maxLength30]}/>
            </div>
            <div>
                <Field name={'password'}
                       placeholder={'Password'}
                       component={Input}
                       validate={[requiredField, maxLength30]}
                       type={'password'}/>
            </div>
            <div>
                <Field name={'rememberMe'}
                       component={'input'}
                       type={'checkbox'}/>
                <label>remember me</label>
            </div>
            <div className={styles.form_summary_error}>
                {props.error}
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
        let {email, password, rememberMe} = formData;
        props.login(email, password, rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

let mapDispatchToProps = {
    login: loginThunkCreator,
    logout: logoutThunkCreator,
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);