import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../page";
import useGetUser from "@/utils/hooks/useGetUser";
import useFetch from "@/utils/hooks/useFetch";
import userEvent from "@testing-library/user-event";
import PhotoLists from "../components/PhotoLists";

// Mock Supabase & Hooks
jest.mock("../../../../utils/hooks/useGetUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../../utils/hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Google Drive", () => {
  describe("Rendering", () => {
    beforeEach(() => {
      useGetUser.mockReturnValue({
        user: { id: "123", email: "test@example.com" },
        supabase: {},
      });

      useFetch.mockReturnValue({
        isLoading: false,
        photos: [{ id: 1, storage_name: "photo1.png", url: "photo_url" }],
        setPhotos: jest.fn(),
      });
    });
    it("Should render Google Drive Page", () => {
      render(<Page />);

      //Heading Text
      expect(screen.getByText("Google Drive Lite")).toBeInTheDocument();

      //File Input
      const file = screen.getByLabelText("fileInput");
      expect(file).toBeInTheDocument();

      //Upload Button
      const uploadButton = screen.getByRole("button", {
        name: "Upload Image",
      });
      expect(uploadButton).toBeInTheDocument();

      //Select
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      //Options
      expect(
        screen.getByRole("option", { name: "by name" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "by date" })
      ).toBeInTheDocument();

      //Search Input
      const searchInput = screen.getByRole("textbox");
      expect(searchInput).toBeInTheDocument();

      //Search button
      const searchButton = screen.getByRole("button", { name: /search/i });
      expect(searchButton).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should upload photo when file is selected", async () => {
      render(<Page />);
      const fileInput = screen.getByLabelText("fileInput");
      const testFile = new File(["test"], "test.png", { type: "image/png" });

      await userEvent.upload(fileInput, testFile);

      expect(fileInput.files[0]).toBe(testFile);
    });

    it("should delete photo when delete button is clicked", async () => {
      const mockHandleDeleteFunction = jest.fn();
      const photo = {
        id: "1",
        url: "test-image.jpg",
        name: "Sample Photo",
        updated_at: new Date().toISOString(),
      };

      render(
        <PhotoLists
          supabase={jest.fn()}
          handleClickDelete={mockHandleDeleteFunction}
          handleClickEdit={jest.fn()}
          photos={[photo]}
          isLoading={false}
        />
      );

      const deleteButton = screen.getByRole("button", { name: "Delete" });

      userEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockHandleDeleteFunction).toHaveBeenCalledWith(photo);
      });
    });
  });
});
