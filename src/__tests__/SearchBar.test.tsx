import { render, screen, fireEvent } from "@testing-library/react";
import React, { ReactNode } from "react";
import { AppContext } from "../context/AppContext";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  const mockDispatch = jest.fn();

  const renderWithContext = (component: ReactNode) => {
    return render(
      <AppContext.Provider
        value={{
          state: { objects: [], relations: [], searchTerm: "" },
          dispatch: mockDispatch,
        }}
      >
        {component}
      </AppContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the search input field", () => {
    renderWithContext(<SearchBar />);

    expect(
      screen.getByPlaceholderText("Search objects...")
    ).toBeInTheDocument();
  });

  it("should call dispatch when user types in the search input", () => {
    renderWithContext(<SearchBar />);

    const input = screen.getByPlaceholderText(
      "Search objects..."
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Test search" } });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SEARCH_TERM",
      payload: "Test search",
    });
  });
});
