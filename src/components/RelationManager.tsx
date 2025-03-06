import React, { useState, useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import "../styles/relationManager.css";
import Modal from "./Modal";

const RelationManager = () => {
  const { state, dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fromObjectId: "",
    toObjectId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const objectOptions = useMemo(
    () =>
      state.objects.map((obj) => (
        <option key={obj.id} value={obj.id}>
          {obj.name}
        </option>
      )),
    [state.objects]
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRelation = () => {
    if (!formData.fromObjectId || !formData.toObjectId) {
      alert("Please select both objects to create a relation.");
      return;
    }

    dispatch({
      type: "ADD_RELATION",
      payload: { id: uuidv4(), ...formData },
    });

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
