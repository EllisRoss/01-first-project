import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
// import styles from "../ProfileInfo.module.css";

const ProfileDataForm = (props) => {

    // let err = (errors, key) => {
    //     debugger
    //     props.profileErrors.map(e => {
    //         errors[key] = e.toLowerCase().includes(key.toLowerCase())
    //     })
    //     return errors;
    // }

    return (
        <div>
            <Formik
                initialValues={{
                    fullName: props.profile.fullName,
                    aboutMe: props.profile.aboutMe,
                    lookingForAJob: props.profile.lookingForAJob,
                    lookingForAJobDescription: props.profile.lookingForAJobDescription,
                    contacts: props.profile.contacts,
                }}
                // validate={values => {
                //     const errors = {};
                //     return errors;
                // }}
                onSubmit={(values, {setSubmitting}) => {
                    console.log(values);
                    props.saveProfile(values);
                    // if (props.profileErrors.length === 0) {
                    //     props.deactivateEditMode();
                    // }
                    setSubmitting(false);
                }}
            >
                {({isSubmitting, values}) => (
                    <Form>
                        {props.profileErrors.length > 0 && props.profileErrors.map((err) => {
                            return <div key={err}>{err}</div>
                        })}
                        <div>
                            <b>Full name: </b>
                            <Field type="text" name="fullName"/>
                            <ErrorMessage name="fullName" component="div"/>
                        </div>

                        <div>
                            <b>About me: </b>
                            <Field type="text" name="aboutMe"/>
                            {/*<ErrorMessage name="email" component="div" />*/}
                        </div>

                        <div>
                            <b>Looking for a job: </b>
                            <Field type="checkbox" name="lookingForAJob"/>
                            {/*<ErrorMessage name="email" component="div" />*/}
                        </div>

                        <div>
                            <b>My professional skills: </b>
                            <Field component='textarea' name="lookingForAJobDescription"/>
                            {/*<ErrorMessage name="email" component="div" />*/}
                        </div>
                        <div>
                            <b>Contacts:</b>
                            {Object.keys(props.profile.contacts).map((key) => {
                                if (!values.contacts[key]) {
                                    values.contacts[key] = '';
                                }
                                return <div key={key}>
                                    {key}: <Field type="text" name={"contacts." + key}/>
                                </div>
                            })}
                        </div>
                        <br/>
                        <button type="submit" disabled={isSubmitting}>
                            Save
                        </button>
                        <label> </label>
                        <button type="cancel" onClick={props.deactivateEditMode}>
                            Cancel
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ProfileDataForm;