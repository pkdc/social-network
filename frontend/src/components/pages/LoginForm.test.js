import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import LoginForm from "./LoginForm";


describe("Login Form compo", () => {  
    test("renders Email Input", () => {
        // Arrange
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // Act
        // Assert
        const emailInput = screen.getByLabelText("Email");
        expect(emailInput).toBeInTheDocument();
    });
    
    test("renders Password Input", () => {
        // Arrange
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // Act
        // Assert
        const pwInput = screen.getByLabelText("Password", {exact: true});
        expect(pwInput).toBeInTheDocument();
    });
    
    test("render login btn", () => {
        // Arrange
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        // Act
        //Assert
        const loginBtn = screen.getByRole("button", { name: /login/i});
        expect(loginBtn).toBeInTheDocument();
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
        const regLinkEl = screen.getByRole("link", { name: /Register/i});
        expect(regLinkEl).toBeInTheDocument();
    });

    test("normal login success", () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        

    });
});
