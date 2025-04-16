import { ReactNode, useReducer, Reducer } from "react";
import { AppState, AppAction, appReducer, initialState, AppContext } from ".";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};