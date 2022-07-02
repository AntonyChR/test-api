import { createContext } from "react";
import { RequestState } from "./types";

export const RequestContext = createContext({} as RequestState);