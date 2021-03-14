import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../common/FormsControls/FormControls.module.css";

const maxLength30 = maxLengthCreator(30);


const LoginForm = (props) => {

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
                <Field name='rememberMe'
                       component='input'
                       type='checkbox'/>
                <label>remember me</label>
            </div>
            {
                props.captchaUrl && <div>
                    <div>
                        <img className={styles.captcha} src={props.captchaUrl} alt="captcha"/>
                    </div>
                    <Field name='captcha'
                           component={Input}
                           validate={[requiredField]}/>
                </div>
            }
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
        let {email, password, rememberMe, captcha} = formData;
        props.login(email, password, rememberMe, captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
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
        captchaUrl: state.auth.captchaUrl,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);