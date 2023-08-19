import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

describe("Login Form compo", () => {
    // Arrange
    test("renders Login btn", () => {
        render(
            <MemoryRouter>
                <LoginForm />)
            </MemoryRouter>
        );
        // Act
        // Assert
        const loginBtnEl = screen.getByRole("button");
        expect(loginBtnEl).toBeInTheDocument();
    });
    
    test("renders Email Label", () => {
        // Arrange
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // Act
        // Assert
        const emailLabelEl = screen.getByLabelText("Email");
        expect(emailLabelEl).toBeInTheDocument();
    });
    
    test("renders Password Label", () => {
        // Arrange
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // Act
        // Assert
        const pwLabelEl = screen.getByLabelText("Password", {exact: true});
        expect(pwLabelEl).toBeInTheDocument();
    });
    
    test("renders reg link", () => {
        // Arrange
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // Act
        // Assert
        const regLinkEl = screen.getByText("Register");
        expect(regLinkEl).toBeInTheDocument();
    });
});
