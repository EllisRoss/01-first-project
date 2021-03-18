import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Sidebar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {setInitializedThunkCreator} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/reduxStore";
import {withSuspense} from "./hoc/withSuspence";
import {LoginPage} from "./components/Login/LoginPage";


const Profile = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Users = React.lazy(() => import('./components/Users/Users'));
// const News = React.lazy(() => import('./components/News/News'));
// const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

type PropsType = {
    initialized: boolean,
    initialize: () => void,
}

const UsersWithSuspense = withSuspense(Users);
const ProfileWithSuspense = withSuspense(Profile);
const SettingsWithSuspense = withSuspense(Settings);

class App extends React.Component<PropsType> {

    catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
        alert(event.reason);

    }

    componentDidMount() {
        this.props.initialize();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/news'/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileWithSuspense />}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <SettingsWithSuspense/>}/>
                        <Route path='/users' render={() => <UsersWithSuspense />}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})

let mapDispatchToProps = {
    initialize: setInitializedThunkCreator,
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

const SocialNetworkApp: React.FC = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default SocialNetworkApp;
