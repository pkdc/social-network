import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Chatbox from "./Chatbox";

describe("Old Chat Msg", () => {
	test("Loading Old Msgs (New Chat)", async () => {
		// Assign
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [],
		});
		// Act
		//Assert
		const newChatMsg = await screen.findByText(
			/Start Chatting/i,
			{ exact: false },
			{ timeout: 3000 }
		);
		expect(newChatMsg).toBeInTheDocument();
	});

	// test("Loading Old Msgs (Old Msg >= 1 )", async () => {
	// 	// Assign
	// 	// Act
	// 	//Assert
	// });
});
