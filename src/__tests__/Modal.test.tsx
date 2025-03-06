import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Modal from "../components/Modal";

describe("Modal Component", () => {
  it("should render the modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("should not render the modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <p>Modal content</p>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: /×/i });

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose if the modal is not open", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <p>Modal content</p>
      </Modal>
    );

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
