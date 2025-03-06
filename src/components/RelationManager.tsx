import React, { useState, useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import "../styles/relationManager.css";
import Modal from "./Modal";

const RelationManager = () => {
  // Accessing state and dispatch from the AppContext
  const { state, dispatch } = useContext(AppContext);

  // State to manage the form data for selecting objects for the relation
  const [formData, setFormData] = useState({
    fromObjectId: "",
    toObjectId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized list of object options for the select inputs
  const objectOptions = useMemo(
    () =>
      state.objects.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      )),
    [state.objects]
  );

  // Handler to update formData when a select input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler to add a new relation between two objects
  const handleAddRelation = () => {
    // Check if both objects are selected
    if (!formData.fromObjectId || !formData.toObjectId) {
      alert("Please select both objects to create a relation.");
      return;
    }

    // Dispatch action to add a new relation
    dispatch({
      type: "ADD_RELATION",
      payload: { id: uuidv4(), ...formData },
    });

    // Reset the form data after the relation is added
    setFormData({ fromObjectId: "", toObjectId: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="relation-manager">
      <h2>Manage Relations</h2>

      <select
        name="fromObjectId"
        value={formData.fromObjectId}
        onChange={handleChange}
      >
        <option value="">Select From Object</option>
        {objectOptions}
      </select>

      <select
        name="toObjectId"
        value={formData.toObjectId}
        onChange={handleChange}
      >
        <option value="">Select To Object</option>
        {objectOptions}
      </select>

      <button className="submit-button" onClick={handleAddRelation}>
        Add Relation
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Relation added successfully!</p>
      </Modal>
    </div>
  );
};

export default RelationManager;
