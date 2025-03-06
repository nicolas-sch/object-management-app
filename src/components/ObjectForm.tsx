import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import "../styles/objectForm.css";

const ObjectForm = ({ object }: { object?: any }) => {
  const { dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: object?.name || "",
    description: object?.description || "",
    type: object?.type || "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim() || !formData.type.trim()) {
      setFeedbackMessage("All fields are required.");
      setIsModalOpen(true);
      return;
    }

    dispatch({
      type: object ? "EDIT_OBJECT" : "ADD_OBJECT",
      payload: { id: object?.id || uuidv4(), ...formData },
    });

    setFormData({ name: "", description: "", type: "" });
    setFeedbackMessage("Object added successfully!");
    setIsModalOpen(true);
  };

  return (
    <div className="object-form">
      <form onSubmit={handleSubmit}>
        {["name", "description", "type"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
          />
        ))}
        <button className="submit-button" type="submit">
          {object ? "Save" : "Add"}
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{feedbackMessage}</p>
      </Modal>
    </div>
  );
};

export default ObjectForm;
