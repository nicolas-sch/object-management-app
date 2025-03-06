import {
  appReducer,
  initialState,
  Action,
  AppState,
} from "../reducers/appReducer";
import { v4 as uuidv4 } from "uuid";

describe("appReducer", () => {
  it("should return the initial state for unknown actions", () => {
    const unknownAction: Action = {
      type: "UNKNOWN_ACTION" as any,
      payload: {} as any,
    };
    const state = appReducer(initialState, unknownAction);
    expect(state).toEqual(initialState);
  });

  it("should handle ADD_OBJECT action", () => {
    const newObject = {
      id: uuidv4(),
      name: "New Object",
      description: "New object description",
      type: "type1",
    };

    const action: Action = {
      type: "ADD_OBJECT",
      payload: newObject,
    };

    const state = appReducer(initialState, action);
    expect(state.objects).toHaveLength(1);
    expect(state.objects[0]).toEqual(newObject);
  });

  it("should handle EDIT_OBJECT action", () => {
    const existingObject = {
      id: uuidv4(),
      name: "Old Object",
      description: "Old description",
      type: "type1",
    };

    const newObject = { ...existingObject, name: "Updated Object" };

    const stateAfterAdd = appReducer(initialState, {
      type: "ADD_OBJECT",
      payload: existingObject,
    });

    const action: Action = {
      type: "EDIT_OBJECT",
      payload: newObject,
    };

    const updatedState = appReducer(stateAfterAdd, action);

    expect(updatedState.objects).toHaveLength(1);
    expect(updatedState.objects[0].name).toBe("Updated Object");
  });

  it("should handle DELETE_OBJECT action", () => {
    const objectToDelete = {
      id: uuidv4(),
      name: "Object to delete",
      description: "Object description",
      type: "type1",
    };

    const stateAfterAdd = appReducer(initialState, {
      type: "ADD_OBJECT",
      payload: objectToDelete,
    });

    const action: Action = {
      type: "DELETE_OBJECT",
      payload: objectToDelete.id,
    };

    const newState = appReducer(stateAfterAdd, action);
    expect(newState.objects).toHaveLength(0);
  });

  it("should handle DELETE_OBJECT action with relations", () => {
    const object1 = {
      id: uuidv4(),
      name: "Object 1",
      description: "Description 1",
      type: "type1",
    };
    const object2 = {
      id: uuidv4(),
      name: "Object 2",
      description: "Description 2",
      type: "type2",
    };

    const relation = {
      id: uuidv4(),
      fromObjectId: object1.id,
      toObjectId: object2.id,
    };

    const stateAfterAddObject1 = appReducer(initialState, {
      type: "ADD_OBJECT",
      payload: object1,
    });

    const stateAfterAddObject2 = appReducer(stateAfterAddObject1, {
      type: "ADD_OBJECT",
      payload: object2,
    });

    const stateAfterAddRelation = appReducer(stateAfterAddObject2, {
      type: "ADD_RELATION",
      payload: relation,
    });

    const action: Action = {
      type: "DELETE_OBJECT",
      payload: object1.id,
    };

    const newState = appReducer(stateAfterAddRelation, action);

    expect(newState.objects).toHaveLength(1);
    expect(newState.objects[0]).toEqual(object2);

    expect(newState.relations).toHaveLength(0);
  });

  it("should handle ADD_RELATION action", () => {
    const object1 = {
      id: uuidv4(),
      name: "Object 1",
      description: "Description 1",
      type: "type1",
    };
    const object2 = {
      id: uuidv4(),
      name: "Object 2",
      description: "Description 2",
      type: "type2",
    };

    const relation = {
      id: uuidv4(),
      fromObjectId: object1.id,
      toObjectId: object2.id,
    };

    const action: Action = {
      type: "ADD_RELATION",
      payload: relation,
    };

    const state = appReducer(initialState, action);
    expect(state.relations).toHaveLength(1);
    expect(state.relations[0]).toEqual(relation);
  });

  it("should handle DELETE_RELATION action", () => {
    const object1 = {
      id: uuidv4(),
      name: "Object 1",
      description: "Description 1",
      type: "type1",
    };
    const object2 = {
      id: uuidv4(),
      name: "Object 2",
      description: "Description 2",
      type: "type2",
    };

    const relation = {
      id: uuidv4(),
      fromObjectId: object1.id,
      toObjectId: object2.id,
    };

    const stateAfterAddRelation = appReducer(initialState, {
      type: "ADD_RELATION",
      payload: relation,
    });

    const action: Action = {
      type: "DELETE_RELATION",
      payload: relation.id,
    };

    const newState = appReducer(stateAfterAddRelation, action);
    expect(newState.relations).toHaveLength(0);
  });

  it("should handle SET_SEARCH_TERM action", () => {
    const action: Action = {
      type: "SET_SEARCH_TERM",
      payload: "search term",
    };

    const state = appReducer(initialState, action);
    expect(state.searchTerm).toBe("search term");
  });

  it("should handle LOAD_STATE action", () => {
    const newState: AppState = {
      objects: [
        {
          id: "1",
          name: "Loaded Object",
          description: "Description",
          type: "type1",
        },
      ],
      relations: [],
      searchTerm: "test",
    };

    const action: Action = {
      type: "LOAD_STATE",
      payload: newState,
    };

    const state = appReducer(initialState, action);
    expect(state).toEqual(newState);
  });
});
