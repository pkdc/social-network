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
const LgButton_1 = __importDefault(require("../UI/LgButton"));
const LoadingSpinner_1 = __importDefault(require("../UI/LoadingSpinner"));
const Landingpage_module_css_1 = __importDefault(require("./Landingpage.module.css"));
const auth_context_1 = require("../store/auth-context");
const vanta_net_min_1 = __importDefault(require("vanta/dist/vanta.net.min"));
const Landingpage = () => {
    const [loginIsLoading, setLoginIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const authCtx = (0, react_1.useContext)(auth_context_1.AuthContext);
    const [vantaEffect, setVantaEffect] = (0, react_1.useState)(null);
    const vantaRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!vantaEffect) {
            setVantaEffect((0, vanta_net_min_1.default)({
                el: vantaRef.current,
                color: 0x52489c,
                backgroundColor: 0xebebeb,
                points: 15.0, // amount of dots
                maxDistance: 25.0, // line-boldness
                spacing: 15.0, // crowdness or area
                // lineColor: 0x52489c,
            }));
            return () => {
                if (vantaEffect)
                    vantaEffect.destroy();
            };
        }
    }, [vantaEffect]);
    (0, react_1.useEffect)(() => {
        setLoginIsLoading(authCtx.loginIsLoading);
        setError(authCtx.loginError);
    }, [authCtx.loginIsLoading, authCtx.loginError]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: Landingpage_module_css_1.default.background, ref: vantaRef }),
        react_1.default.createElement("div", { className: Landingpage_module_css_1.default.wrapper },
            !loginIsLoading && (react_1.default.createElement("div", { className: Landingpage_module_css_1.default["container"] },
                react_1.default.createElement("h1", { className: Landingpage_module_css_1.default["title"] }, "Welcome"),
                error && react_1.default.createElement("h2", { className: Landingpage_module_css_1.default["error-msg"] }, error),
                react_1.default.createElement(react_router_dom_1.Link, { className: Landingpage_module_css_1.default["nav-link"], to: "/login" },
                    react_1.default.createElement(LgButton_1.default, { className: `${Landingpage_module_css_1.default["nav-link-btn"]} ${Landingpage_module_css_1.default["login-btn"]}` }, "Login")),
                react_1.default.createElement(react_router_dom_1.Link, { className: Landingpage_module_css_1.default["nav-link"], to: "/reg" },
                    react_1.default.createElement(LgButton_1.default, { className: `${Landingpage_module_css_1.default["nav-link-btn"]} ${Landingpage_module_css_1.default["reg-btn"]}` }, "Register")))),
            loginIsLoading && (react_1.default.createElement("div", null,
                react_1.default.createElement(LoadingSpinner_1.default, null),
                react_1.default.createElement("h2", { className: Landingpage_module_css_1.default["loading"] }, "Logging In..."))))));
};
exports.default = Landingpage;
