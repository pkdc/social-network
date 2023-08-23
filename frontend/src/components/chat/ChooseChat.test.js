import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ChooseChat from "./ChooseChat";

describe("Choose Chat", () => {
    test("render choose user chat btn", () => {
        // Arange
        render(
            <MemoryRouter>
                <ChooseChat/>
            </MemoryRouter>
        );
        // Assert
        const userChatBtn = screen.getByRole("button");

    });
    test("render hoose group chat btn");
});