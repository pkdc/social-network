"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Form_1 = __importDefault(require("../UI/Form"));
const FormInput_1 = __importDefault(require("../UI/FormInput"));
const FormLabel_1 = __importDefault(require("../UI/FormLabel"));
const LgButton_1 = __importDefault(require("../UI/LgButton"));
const auth_context_1 = require("../store/auth-context");
const LoginForm_module_css_1 = __importDefault(require("./LoginForm.module.css"));
const LoginForm = () => {
    const [enteredEmail, setEnteredEmail] = (0, react_1.useState)("");
    const [enteredPw, setEnteredPw] = (0, react_1.useState)("");
    const [loginErrMsg, setLoginErrMsg] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const ctx = (0, react_1.useContext)(auth_context_1.AuthContext);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setLoginErrMsg(ctx.errMsg);
        navigate("/login", { replace: true });
    }, [ctx.errMsg]);
    (0, react_1.useEffect)(() => {
        setIsLoading(ctx.loginIsLoading);
        setError(ctx.loginError);
    }, [ctx.loginIsLoading, ctx.loginError]);
    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
        console.log(enteredEmail);
    };
    const pwChangeHandler = (e) => {
        setEnteredPw(e.target.value);
        console.log(enteredPw);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        const loginPayloadObj = {
            email: enteredEmail,
            pw: enteredPw
        };
        console.log(loginPayloadObj);
        ctx.onLogin(loginPayloadObj);
        setEnteredEmail("");
        setEnteredPw("");
        ctx.setErrMsg("");
        navigate("/", { replace: true });
    };
    return (react_1.default.createElement("div", { className: LoginForm_module_css_1.default.container },
        react_1.default.createElement("h1", { className: LoginForm_module_css_1.default["title"] }, "Login"),
        react_1.default.createElement("h2", null, loginErrMsg),
        !isLoading && react_1.default.createElement(Form_1.default, { className: LoginForm_module_css_1.default["login-form"], onSubmit: submitHandler },
            react_1.default.createElement(FormLabel_1.default, { htmlFor: "email" }, "Email"),
            react_1.default.createElement(FormInput_1.default, { className: LoginForm_module_css_1.default["login-input"], name: "email", id: "email", placeholder: "abc@mail.com", value: enteredEmail, onChange: emailChangeHandler }),
            react_1.default.createElement(FormLabel_1.default, { htmlFor: "password" }, "Password"),
            react_1.default.createElement(FormInput_1.default, { className: LoginForm_module_css_1.default["login-input"], type: "password", name: "password", id: "password", placeholder: "Password", value: enteredPw, onChange: pwChangeHandler }),
            react_1.default.createElement(LgButton_1.default, { className: LoginForm_module_css_1.default["sub-btn"], type: "submit" }, "Login"),
            react_1.default.createElement("p", null,
                "Don't have an account? ",
                react_1.default.createElement(react_router_dom_1.Link, { to: "/reg" }, "Register"))),
        !isLoading && error && react_1.default.createElement("h2", null, error),
        isLoading && react_1.default.createElement("h2", null, "Logging in...")));
};
exports.default = LoginForm;
