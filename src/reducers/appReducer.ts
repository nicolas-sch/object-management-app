import { v4 as uuidv4 } from "uuid";

// Defining the structure of an object item
export interface ObjectItem {
  id: string;
  name: string;
  description: string;
  type: string;
}

// Defining the structure of a relation between two objects
export interface Relation {
  id: string;
  fromObjectId: string;
  toObjectId: string;
}

// Defining the structure of the app state
export interface AppState {
  objects: ObjectItem[];
  relations: Relation[];
  searchTerm: string;
}

// Defining possible actions that can update the state
export type Action =
  | { type: "ADD_OBJECT"; payload: ObjectItem }
  | { type: "EDIT_OBJECT"; payload: ObjectItem }
  | { type: "DELETE_OBJECT"; payload: string }
  | { type: "ADD_RELATION"; payload: Relation }
  | { type: "DELETE_RELATION"; payload: string }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "LOAD_STATE"; payload: AppState };

// Initial state of the application
export const initialState: AppState = {
  objects: [],
  relations: [],
  searchTerm: "",
};

// Reducer function to handle different actions and update the state accordingly
export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_OBJECT":
      return { ...state, objects: [...state.objects, action.payload] };

    case "EDIT_OBJECT":
      return {
        ...state,
        objects: state.objects.map((obj) =>
          obj.id === action.payload.id ? action.payload : obj
        ),
      };

    case "DELETE_OBJECT":
      return {
        ...state,
        objects: state.objects.filter((obj) => obj.id !== action.payload),
        relations: state.relations.filter(
          (rel) =>
            rel.fromObjectId !== action.payload &&
            rel.toObjectId !== action.payload
        ),
      };

    case "ADD_RELATION":
      return { ...state, relations: [...state.relations, action.payload] };

    case "DELETE_RELATION":
      return {
        ...state,
        relations: state.relations.filter((rel) => rel.id !== action.payload),
      };

    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };

    case "LOAD_STATE":
      return action.payload;

    default:
      return state;
  }
};
