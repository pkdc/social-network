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
const SmallButton_1 = __importDefault(require("../UI/SmallButton"));
const ChatMainArea_1 = __importDefault(require("./ChatMainArea"));
const ChooseChat_module_css_1 = __importDefault(require("./ChooseChat.module.css"));
const ChooseChat = (props) => {
    const [grpActive, setGrpActive] = (0, react_1.useState)(false);
    const showUserListHandler = () => {
        console.log("User list");
        setGrpActive(false);
    };
    const showGrpListHandler = () => {
        console.log("Grp list");
        setGrpActive(true);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: ChooseChat_module_css_1.default["switch-bar"] },
            react_1.default.createElement(SmallButton_1.default, { className: `${!grpActive && ChooseChat_module_css_1.default["active"]} ${ChooseChat_module_css_1.default["switch-bar-btn"]}`, onClick: showUserListHandler }, "Users"),
            react_1.default.createElement(SmallButton_1.default, { className: `${grpActive && ChooseChat_module_css_1.default["active"]} ${ChooseChat_module_css_1.default["switch-bar-btn"]}`, onClick: showGrpListHandler }, "Groups")),
        react_1.default.createElement(ChatMainArea_1.default, { grpChat: grpActive })));
};
exports.default = react_1.default.memo(ChooseChat);
