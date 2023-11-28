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
const FormTextarea_1 = __importDefault(require("../UI/FormTextarea"));
const LgButton_1 = __importDefault(require("../UI/LgButton"));
const ImgUpload_1 = __importDefault(require("../UI/ImgUpload"));
const LoadingSpinner_1 = __importDefault(require("../UI/LoadingSpinner"));
const auth_context_1 = require("../store/auth-context");
const RegForm_module_css_1 = __importDefault(require("./RegForm.module.css"));
const RegForm = () => {
    const imageSrc = "../../images/";
    let defaultImagePath = "default_avatar.jpg";
    const ctx = (0, react_1.useContext)(auth_context_1.AuthContext);
    const [enteredEmail, setEnteredEmail] = (0, react_1.useState)("");
    const [enteredPw, setEnteredPw] = (0, react_1.useState)("");
    const [enteredFName, setEnteredFName] = (0, react_1.useState)("");
    const [enteredLName, setEnteredLName] = (0, react_1.useState)("");
    const [enteredDob, setEnteredDob] = (0, react_1.useState)("");
    const [uploadedImg, setUploadedImg] = (0, react_1.useState)("");
    const [enteredNickname, setEnteredNickname] = (0, react_1.useState)("");
    const [enteredAbout, setEnteredAbout] = (0, react_1.useState)("");
    // const [regErrMsg, setRegErrMsg] = useState("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        ctx.regSuccess && navigate("/login", { replace: true });
    }, [ctx.regSuccess]);
    // useEffect(() => {
    //     setRegErrMsg(ctx.errMsg);
    //     // navigate("/reg", { replace: true });
    // }, [ctx.errMsg]);
    (0, react_1.useEffect)(() => {
        setIsLoading(ctx.regIsLoading);
        setError(ctx.regError);
    }, [ctx.regIsLoading, ctx.regError]);
    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
        console.log(enteredEmail);
    };
    const pwChangeHandler = (e) => {
        setEnteredPw(e.target.value);
        console.log(enteredPw);
    };
    const fNameChangeHandler = (e) => {
        setEnteredFName(e.target.value);
        console.log(enteredFName);
    };
    const lNameChangeHandler = (e) => {
        setEnteredLName(e.target.value);
        console.log(enteredLName);
    };
    const dobChangeHandler = (e) => {
        setEnteredDob(e.target.value);
        console.log(enteredDob);
    };
    const avatarHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            console.log(reader.result);
            setUploadedImg(reader.result);
        });
        setUploadedImg(e.target.value);
        console.log(uploadedImg);
    };
    const nicknameChangeHandler = (e) => {
        setEnteredNickname(e.target.value);
        console.log(enteredNickname);
    };
    const aboutChangeHandler = (e) => {
        setEnteredAbout(e.target.value);
        console.log(enteredAbout);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        const regPayloadObj = {
            email: enteredEmail,
            pw: enteredPw,
            fname: enteredFName,
            lname: enteredLName,
            Dob: enteredDob,
            avatar: uploadedImg,
            nname: enteredNickname,
            about: enteredAbout,
        };
        console.log(regPayloadObj);
        ctx.onReg(regPayloadObj);
        setEnteredEmail("");
        setEnteredPw("");
        setEnteredFName("");
        setEnteredLName("");
        setEnteredDob("");
        setUploadedImg("");
        setEnteredNickname("");
        setEnteredAbout("");
        // navigate("/login", {replace: true});
        ctx.setErrMsg("");
    };
    const resetHandler = () => {
        setError(false);
    };
    return (react_1.default.createElement("div", { className: RegForm_module_css_1.default.container },
        react_1.default.createElement("h1", { className: RegForm_module_css_1.default["title"] }, "Register"),
        console.log(isLoading),
        !isLoading && error &&
            react_1.default.createElement(react_1.default.Fragment, null,
                error && react_1.default.createElement("h2", { className: RegForm_module_css_1.default["error-msg"] }, error),
                react_1.default.createElement("div", { className: RegForm_module_css_1.default["try-again"] },
                    react_1.default.createElement(LgButton_1.default, { onClick: resetHandler }, "Try Again"))),
        !isLoading && !error && react_1.default.createElement(Form_1.default, { className: RegForm_module_css_1.default["reg-form"], onSubmit: submitHandler },
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"], htmlFor: "email" }, "Email"),
            react_1.default.createElement(FormInput_1.default, { className: RegForm_module_css_1.default["reg-input"], type: "email", name: "email", id: "email", placeholder: "abc@mail.com", value: enteredEmail, onChange: emailChangeHandler }),
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"], htmlFor: "password" }, "Password"),
            react_1.default.createElement(FormInput_1.default, { className: RegForm_module_css_1.default["reg-input"], type: "password", name: "password", id: "password", placeholder: "Password", value: enteredPw, onChange: pwChangeHandler }),
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"], htmlFor: "fname" }, "First Name"),
            react_1.default.createElement(FormInput_1.default, { className: RegForm_module_css_1.default["reg-input"], type: "text", name: "fname", id: "fname", placeholder: "John", value: enteredFName, onChange: fNameChangeHandler }),
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"], htmlFor: "lname" }, "Last Name"),
            react_1.default.createElement(FormInput_1.default, { className: RegForm_module_css_1.default["reg-input"], type: "text", name: "lname", id: "lname", placeholder: "Smith", value: enteredLName, onChange: lNameChangeHandler }),
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"], htmlFor: "Dob" }, "Date of Birth"),
            react_1.default.createElement(FormInput_1.default, { className: RegForm_module_css_1.default["reg-input"], type: "date", name: "Dob", id: "Dob", value: enteredDob, onChange: dobChangeHandler }),
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"] }, "Avatar (Optional)"),
            react_1.default.createElement("figure", null,
                !uploadedImg && react_1.default.createElement("img", { src: require("../../images/" + defaultImagePath), alt: "Default Image", className: RegForm_module_css_1.default["img-preview"], width: "250px" }),
                uploadedImg && react_1.default.createElement("img", { src: uploadedImg, className: RegForm_module_css_1.default["img-preview"], width: "250px" })),
            react_1.default.createElement(ImgUpload_1.default, { className: RegForm_module_css_1.default["reg-input"], name: "avatar", id: "avatar", accept: ".jpg, .jpeg, .png, .gif", text: "Upload Image", onChange: avatarHandler }),
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"], htmlFor: "nname" }, "Nickname (Optional)"),
            react_1.default.createElement("input", { className: RegForm_module_css_1.default["reg-input"], type: "text", name: "nname", id: "nname", placeholder: "Pikachu", value: enteredNickname, onChange: nicknameChangeHandler }),
            react_1.default.createElement(FormLabel_1.default, { className: RegForm_module_css_1.default["reg-label"], htmlFor: "about" }, "About Me (Optional)"),
            react_1.default.createElement(FormTextarea_1.default, { className: RegForm_module_css_1.default["reg-input"], name: "about", id: "about", placeholder: "About me...", rows: 5, value: enteredAbout, onChange: aboutChangeHandler }),
            react_1.default.createElement(LgButton_1.default, { className: RegForm_module_css_1.default["sub-btn"], type: "submit" }, "Register"),
            react_1.default.createElement("p", null,
                "Already have an account? ",
                react_1.default.createElement(react_router_dom_1.Link, { to: "/login" }, "Login"))),
        isLoading && react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: RegForm_module_css_1.default["loading-spinner-div"] },
                react_1.default.createElement(LoadingSpinner_1.default, null)),
            react_1.default.createElement("h2", { className: RegForm_module_css_1.default["loading"] }, "Registering New User..."))));
};
exports.default = RegForm;
