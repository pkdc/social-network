"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const auth_context_1 = require("./components/store/auth-context");
const Root_1 = __importDefault(require("./components/pages/Root"));
const Landingpage_1 = __importDefault(require("./components/pages/Landingpage"));
const LoginForm_1 = __importDefault(require("./components/pages/LoginForm"));
const RegForm_1 = __importDefault(require("./components/pages/RegForm"));
const PostsPage_1 = __importDefault(require("./components/pages/PostsPage"));
const GroupPage_1 = __importDefault(require("./components/pages/GroupPage"));
const GroupProfilePage_1 = __importDefault(require("./components/pages/GroupProfilePage"));
const ProfilePage_1 = __importDefault(require("./components/pages/ProfilePage"));
const LoadingTestPage_1 = __importDefault(require("./components/pages/LoadingTestPage"));
function App() {
    const authCtx = (0, react_2.useContext)(auth_context_1.AuthContext);
    let router = (0, react_router_dom_1.createBrowserRouter)([
        { path: "/", element: react_1.default.createElement(Landingpage_1.default, null) },
        { path: "/login", element: react_1.default.createElement(LoginForm_1.default, null) },
        { path: "/reg", element: react_1.default.createElement(RegForm_1.default, null) },
        { path: "/loading", element: react_1.default.createElement(LoadingTestPage_1.default, null) }
    ]);
    if (authCtx.isLoggedIn)
        router = (0, react_router_dom_1.createBrowserRouter)([
            {
                path: "/",
                element: react_1.default.createElement(Root_1.default, null),
                children: [
                    { path: "/", element: react_1.default.createElement(PostsPage_1.default, null) },
                    { path: "/:userId", element: react_1.default.createElement(PostsPage_1.default, null) },
                    { path: "/profile", element: react_1.default.createElement(ProfilePage_1.default, null) },
                    { path: "/group", element: react_1.default.createElement(GroupPage_1.default, null) },
                    { path: "/groupprofile", element: react_1.default.createElement(GroupProfilePage_1.default, null) },
                    { path: "/groups", element: react_1.default.createElement(GroupPage_1.default, null) },
                    { path: "/profile/:userId", element: react_1.default.createElement(ProfilePage_1.default, null) }
                    // {path: "/user/:userId", element <UserProfilePage />},
                ],
            }
        ]);
    return (react_1.default.createElement(react_router_dom_1.RouterProvider, { router: router }));
}
exports.default = App;
