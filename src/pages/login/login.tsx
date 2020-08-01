import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import API from '../../service/service';
import utils from '../../utils';
import history from '../../history';
import Constant from '../../constant/constant';
import $ from "jquery";
import constant from '../../constant/constant';
import axios from 'axios';
import apiUrl from '../../apicontroller/apicontrollers';
import { loginCreateRequest } from '../../modelController/loginModel';
import Swal from 'sweetalert2';
const interceptor =  require('../../intercepter');
const publicIp = require('public-ip');


class Login extends React.Component<{ history: any }> {

    state = {
        email: '',
        emailerror: '',
        password: '',
        passworderror: '',
        ipAddress:''
    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChangeEventPassword = this.handleChangeEventPassword.bind(this);
        this.login = this.login.bind(this);
        this.forgotpassword = this.forgotpassword.bind(this);
    }

    async componentDidMount() {
        document.title = constant.loginTitle + utils.getAppName();
        // console.log("interceptor",interceptor)
        const ipaddress = publicIp.v4();
        this.setState({
            ipAddress : this.state.ipAddress =  await ipaddress
        })
    }

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleChangeEventPassword(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    validate() {
        let emailerror = "";
        let passworderror = "";

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email) {
            emailerror = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailerror = "please enter valid email";
        }

        if (!this.state.password) {
            passworderror = "please enter password";
        }

        if (emailerror || passworderror) {
            this.setState({ emailerror, passworderror });
            return false;
        }
        return true;
    };

    validatePassword() {
        let emailerror = "";

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email) {
            emailerror = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailerror = "please enter valid email";
        }

        if (emailerror) {
            this.setState({ emailerror });
            return false;
        }
        return true;
    };

   async forgotpassword() {
        const isValid = this.validatePassword();
        if (isValid) {
            this.setState({
                emailerror: this.state.emailerror = ''
            })
            if (this.state.email) {
                const obj = {
                    email: this.state.email
                }

                var forgotPassword = await API.forgotPassword(obj);
                console.log("forgotPassword",forgotPassword);

                // if (this.state.email === obj.email) {
                //     const msg = "Password Reset Successfully";
                //     utils.showSuccess(msg);
                //     // $('#modal-12').modal('hide');
                //     // this.props.history.push('/');
                // } else {
                //     const msg1 = "Error";
                //     utils.showError(msg1);
                // }
            }
        };
    }

   async login() {
        // this.props.history.push('/dashboard');
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                emailerror: this.state.emailerror = '',
                passworderror: this.state.passworderror = ''
            })
            if (this.state.email && this.state.password) {
                const obj : loginCreateRequest = {
                    email: this.state.email,
                    password: this.state.password,
                    deviceType:1,
                    deviceId:'',
                    ipAddress:this.state.ipAddress,
                    userId:0
                }

                axios.post(Constant.apiUrl + apiUrl.userController.createData, obj).then((res:any) => {
                    console.log("res",res);
                    var userData=res.data.resultObject;
                    localStorage.setItem('user',JSON.stringify(userData));
                    localStorage.setItem('token',userData.token);
                    const msg = "Login Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/dashboard');
                }).catch((err:any) => {
                    console.log("err",err);
                    // Swal.fire({
                    //     title: 'Cancelled',
                    //     text: msg,
                    //     icon: 'error'
                    // });
                });

                // var loginUser:any = await API.loginUser(obj);
                // console.log("loginuser",loginUser);

                // if(loginUser.resultObject != null) {
                //     var userData=loginUser.resultObject;
                //     localStorage.setItem('user',JSON.stringify(userData));
                //     localStorage.setItem('token',userData.token);
                //     const msg = "Login Successfully";
                //     utils.showSuccess(msg);
                // } else {
                //     const msg1 = loginUser.explanation;
                //     utils.showError(msg1);
                // }

                // if(loginUser.data.resultObject !== undefined) {
                  
                // } else {
                //         const msg1 = loginUser.data.explanation;
                //         utils.showError(msg1);
                //     }

            }
        };
    }



    render() {
        return (
            <div className="ms-body ms-primary-theme ms-logged-out">
                <div id="preloader-wrap">
                    <div className="spinner spinner-8">
                        <div className="ms-circle1 ms-child"></div>
                        <div className="ms-circle2 ms-child"></div>
                        <div className="ms-circle3 ms-child"></div>
                        <div className="ms-circle4 ms-child"></div>
                        <div className="ms-circle5 ms-child"></div>
                        <div className="ms-circle6 ms-child"></div>
                        <div className="ms-circle7 ms-child"></div>
                        <div className="ms-circle8 ms-child"></div>
                        <div className="ms-circle9 ms-child"></div>
                        <div className="ms-circle10 ms-child"></div>
                        <div className="ms-circle11 ms-child"></div>
                        <div className="ms-circle12 ms-child"></div>
                    </div>
                </div>

                <div className="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft"></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight"></div>


                <main className="body-content">
                    <div className="ms-content-wrapper ms-auth">
                        <div className="ms-auth-container">
                            <div className="ms-auth-col">
                                <div className="ms-auth-bg"></div>
                            </div>
                            <div className="ms-auth-col">
                                <div className="ms-auth-form">
                                    <form className="needs-validation">
                                        <h3><b>{Constant.account}</b></h3>
                                        <p>{Constant.loginpage}</p>
                                        <div className="mb-3">
                                            <label><b>{Constant.email}</b></label>
                                            <div className="input-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    id="validationCustom08"
                                                    placeholder="Email Address"
                                                    onChange={this.handleChangeEvent}
                                                />
                                            </div>
                                            <div className="mb-4 text-danger">
                                                {this.state.emailerror}
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <label><b>{Constant.password}</b></label>
                                            <div className="input-group">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="validationCustom09"
                                                    placeholder="Password"
                                                    onChange={this.handleChangeEvent}
                                                />
                                            </div>
                                            <div className="mb-4 text-danger">
                                                {this.state.passworderror}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="ms-checkbox-wrap">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                />
                                                <i className="ms-checkbox-check"></i>
                                            </label> <span><b> Remember Password </b></span>
                                            <label className="d-block mt-3"><a href="" className="btn-link" data-toggle="modal" data-target="#modal-12"><b style={{ color: '#eea218' }}>{Constant.forgot} </b></a>
                                            </label>
                                        </div>
                                        <button
                                            className="btn mt-4 d-block w-100"
                                            type="button"
                                            style={{ backgroundColor: '#eea218', color: '#fff',fontWeight: 500 }}
                                            onClick={this.login}
                                        >
                                            {Constant.signin}
                                        </button>
                                        {/* <p className="mb-0 mt-3 text-center">{Constant.notmember} <b className="btn-link"><Link to="/signup" style={{ color: 'rgb(238, 162, 24)',fontWeight:600 }}>{Constant.signup}</Link></b>
                                        </p> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="modal-12" tabIndex={1} role="dialog" aria-labelledby="modal-12">
                        <div className="modal-dialog modal-dialog-centered modal-min" role="document">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                                    </button> <i className="flaticon-secure-shield d-block"></i>
                                    <h1><b>{Constant.reset}</b></h1>
                                    <p><b>Enter your email to recover your password</b></p>
                                    <form method="post">
                                        <div className="ms-form-group has-icon">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                className="form-control"
                                                onChange={this.handleChangeEventPassword}
                                            />
                                            <i className="material-icons">
                                                email
                                            </i>
                                        </div>
                                        <div className="mb-4 text-danger">
                                            {this.state.emailerror}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary shadow-none"
                                            onClick={this.forgotpassword}
                                        >
                                            {Constant.reset}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Login;
