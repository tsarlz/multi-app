import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../page";
import TodoLists from "../Components/TodoLists";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

// Mock the useGetUser hook
jest.mock("../../../../utils/hooks/useGetUser", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: { id: "123", email: "test@example.com" },
  })),
}));

// Mock toast error
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("Todo List", () => {
  describe("Rendering", () => {
    it("should render Todo List", async () => {
      render(<Page />);

      // Rendered Heading named My Todos
      const heading = screen.getByRole("heading", { name: "My Todos" });
      expect(heading).toBeInTheDocument();

      // Rendered input
      const inputElement = screen.getByPlaceholderText("Todo..");
      expect(inputElement).toHaveAttribute("type", "text");

      //Rendered Button
      const addButton = screen.getByRole("button", { name: "add" });
      expect(addButton).toBeInTheDocument();

      //Loading State
      const loading = screen.getByText("Loading ....");
      expect(loading).toBeInTheDocument();
    });

    it("should display (You don't have todo yet..) if no TODO", async () => {
      render(
        <TodoLists
          todos={[]}
          isLoading={false}
          handleDeleteTodo={jest.fn()}
          handleEditButtonCLick={jest.fn()}
        />
      );

      expect(
        await screen.findByText("You don't have todo yet..")
      ).toBeInTheDocument();
    });

    it("should display the Todos", async () => {
      render(
        <TodoLists
          todos={[
            { id: 123, task: "Sample Todo1" },
            { id: 321, task: "Sample Todo2" },
          ]}
          isLoading={false}
          handleDeleteTodo={jest.fn()}
          handleEditButtonCLick={jest.fn()}
        />
      );
      expect(await screen.findByText("Sample Todo1")).toBeInTheDocument();
      expect(await screen.findByText("Sample Todo2")).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should toast error messsage when added invalid todo", async () => {
      render(<Page />);

      //Rendered Button
      const addButton = screen.getByRole("button", { name: "add" });
      const inputElement = screen.getByPlaceholderText("Todo..");
      // Ensure input is empty
      await userEvent.clear(inputElement);
      // Try adding empty todo
      await userEvent.click(addButton);
      // Expect toast error to be called
      expect(toast.error).toHaveBeenCalledWith("Invalid todo");
    });
  });
});
