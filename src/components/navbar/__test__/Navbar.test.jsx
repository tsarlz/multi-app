import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import useGetUser from "@/utils/hooks/useGetUser";

jest.mock("../../../utils/supabase/admin", () => ({
  __esModule: true,
  adminAuthClient: {
    deleteUser: jest.fn().mockResolvedValue({ data: {}, error: null }),
  },
}));

// Mock the useGetUser hook
jest.mock("../../../utils/hooks/useGetUser", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: { id: "123", email: "test@example.com" },
    supabase: { auth: { signOut: jest.fn() } },
  })),
}));

// Mock the usePathName and useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  it("should render navbar with Home link", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should show All Nav Menu when user is logged in", () => {
    useGetUser.mockReturnValue({ user: { id: "123456" } });
    render(<Navbar />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();

    const pokemonReviewLink = screen.getByRole("link", {
      name: "Pokemon Review App",
    });
    const markdownLink = screen.getByRole("link", {
      name: "Markdown Notes App",
    });
    const foodReviewLink = screen.getByRole("link", {
      name: "Food Review App",
    });
    const googleDriveLink = screen.getByRole("link", {
      name: "Goggle Drive Lite",
    });
    const todoListLink = screen.getByRole("link", {
      name: "Todo Lists App",
    });
    expect(pokemonReviewLink).toHaveAttribute("href", "/pokemon-review-app");
    expect(markdownLink).toHaveAttribute("href", "/markdown-note-app");
    expect(foodReviewLink).toHaveAttribute("href", "/food-review-app");
    expect(googleDriveLink).toHaveAttribute("href", "/google-drive-lite");
    expect(todoListLink).toHaveAttribute("href", "/todo-lists");
  });
});
