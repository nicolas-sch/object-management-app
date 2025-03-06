import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/objectList.css";
import Modal from "./Modal";

const ObjectList = () => {
  // Accessing state and dispatch from the AppContext
  const { state, dispatch } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized value to filter objects based on the search term
  const filteredObjects = useMemo(() => {
    const searchTerm = state.searchTerm.toLowerCase();
    return state.objects.filter(
      (obj) =>
        obj.name.toLowerCase().includes(searchTerm) ||
        obj.description.toLowerCase().includes(searchTerm)
    );
  }, [state.objects, state.searchTerm]);

  // Memoized value to create a map of related objects based on the relations
  const relatedObjectsMap = useMemo(() => {
    const map: Record<string, string> = {};
    state.relations.forEach(({ fromObjectId, toObjectId }) => {
      const relatedObject = state.objects.find((obj) => obj.id === toObjectId);
      map[fromObjectId] = relatedObject
        ? relatedObject.name
        : "No object relations";
    });
    return map;
  }, [state.objects, state.relations]);

  // Function to get the related object name for a specific object ID
  const getRelatedObject = (objectId: string) =>
    relatedObjectsMap[objectId] || "No object relations";

  // Handler for deleting an object
  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_OBJECT", payload: id });
    setIsModalOpen(true);
  };

  return (
    <div className="object-list">
      <h2>Objects</h2>

      {filteredObjects.length === 0 ? (
        <p>You don't have any registered objects yet.</p>
      ) : (
        <div className="object-table-wrapper">
          <table className="object-table">
            <thead>
              <tr>
                {["Name", "Description", "Type", "Relation", "Action"].map(
                  (header) => (
                    <th key={header}>{header}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredObjects.map((obj) => (
                <tr key={obj.id}>
                  <td>{obj.name}</td>
                  <td>{obj.description}</td>
                  <td>{obj.type}</td>
                  <td>{getRelatedObject(obj.id)}</td>
                  <td>
                    <button onClick={() => handleDelete(obj.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Object deleted successfully!</p>
      </Modal>
    </div>
  );
};

export default ObjectList;
