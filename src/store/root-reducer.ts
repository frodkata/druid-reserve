import { combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "./reducer-slices";

export const rootReducer = combineSlices(authSlice);

export type ReducerState = ReturnType<typeof rootReducer>;
