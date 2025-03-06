import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import { AppContext } from "../context/AppContext";
import RelationManager from "../components/RelationManager";
import { v4 as uuidv4 } from "uuid";

const mockDispatch = jest.fn();

const mockState = {
  objects: [
    {
      id: "1",
      name: "Object A",
      description: "Description of Object A",
      type: "Type A",
    },
    {
      id: "2",
      name: "Object B",
      description: "Description of Object B",
      type: "Type B",
    },
  ],
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

describe("RelationManager Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show an alert if 'Add Relation' is clicked without selecting both objects", () => {
    renderWithContext(<RelationManager />);

    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    fireEvent.click(screen.getByText("Add Relation"));

    expect(alertMock).toHaveBeenCalledWith(
      "Please select both objects to create a relation."
    );
  });

  it("should dispatch the correct action when a relation is added", () => {
    renderWithContext(<RelationManager />);

    fireEvent.change(screen.getAllByRole("combobox")[0], {
      target: { value: "1" },
    });
    fireEvent.change(screen.getAllByRole("combobox")[1], {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByText("Add Relation"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_RELATION",
      payload: {
        id: expect.any(String),
        fromObjectId: "1",
        toObjectId: "2",
      },
    });
  });
});
