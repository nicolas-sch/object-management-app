import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import { AppContext } from "../context/AppContext";
import ObjectForm from "../components/ObjectForm";
import { v4 as uuidv4 } from "uuid";

const mockDispatch = jest.fn();

const mockState = {
  objects: [],
  relations: [],
  searchTerm: "",
};

const renderWithContext = (component: ReactNode) => {
  return render(
    <AppContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
      {component}
    </AppContext.Provider>
  );
};

describe("ObjectForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input fields for name, description, and type", () => {
    renderWithContext(<ObjectForm />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type")).toBeInTheDocument();
  });

  it("should allow the user to type in the input fields", () => {
    renderWithContext(<ObjectForm />);

    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Test Object" } });

    expect(nameInput.value).toBe("Test Object");
  });

  it("should show error message if required fields are empty and submit is clicked", async () => {
    renderWithContext(<ObjectForm />);

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() =>
      expect(screen.getByText("All fields are required.")).toBeInTheDocument()
    );
  });

  it("should submit the form and call dispatch with correct action for adding a new object", async () => {
    renderWithContext(<ObjectForm />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test Object" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "This is a test." },
    });
    fireEvent.change(screen.getByPlaceholderText("Type"), {
      target: { value: "Type A" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "ADD_OBJECT",
        payload: expect.objectContaining({
          name: "Test Object",
          description: "This is a test.",
          type: "Type A",
          id: expect.any(String),
        }),
      });
    });
  });

  it("should submit the form and call dispatch with correct action for editing an existing object", async () => {
    const existingObject = {
      id: "existing-id",
      name: "Existing Object",
      description: "Existing description",
      type: "Type B",
    };

    renderWithContext(<ObjectForm object={existingObject} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Updated Object" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Updated description." },
    });
    fireEvent.change(screen.getByPlaceholderText("Type"), {
      target: { value: "Type C" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "EDIT_OBJECT",
        payload: {
          id: "existing-id",
          name: "Updated Object",
          description: "Updated description.",
          type: "Type C",
        },
      });
    });
  });

  it("should open a modal and show feedback message after submitting", async () => {
    renderWithContext(<ObjectForm />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test Object" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "This is a test." },
    });
    fireEvent.change(screen.getByPlaceholderText("Type"), {
      target: { value: "Type A" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(
        screen.getByText("Object added successfully!")
      ).toBeInTheDocument();
    });
  });
});
