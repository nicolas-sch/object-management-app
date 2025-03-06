import { v4 as uuidv4 } from "uuid";

export interface ObjectItem {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface Relation {
  id: string;
  fromObjectId: string;
  toObjectId: string;
}

export interface AppState {
  objects: ObjectItem[];
  relations: Relation[];
  searchTerm: string;
}

export type Action =
  | { type: "ADD_OBJECT"; payload: ObjectItem }
  | { type: "EDIT_OBJECT"; payload: ObjectItem }
  | { type: "DELETE_OBJECT"; payload: string }
  | { type: "ADD_RELATION"; payload: Relation }
  | { type: "DELETE_RELATION"; payload: string }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "LOAD_STATE"; payload: AppState };

export const initialState: AppState = {
  objects: [],
  relations: [],
  searchTerm: "",
};

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
