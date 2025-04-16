import { SignInResTypes } from '@/domain/model/auth';
import { createContext, Dispatch, useContext } from 'react';

export interface AppState {
    user: {
        user_id: string,
        username: string,
        email: string,
        isGuest: boolean,
    }
}

export const initialState: AppState = {
    user: {
        user_id: "",
        username: "",
        email: "",
        isGuest: true,
    }
};

// Define your action types
export type AppAction = {
    type: 'SET_USER' | 'RESET';
    payload?: any | SignInResTypes;
};
export type AppDispatch = Dispatch<AppAction>;
export const AppContext = createContext<{
    state: AppState;
    dispatch: AppDispatch;
} | undefined>(undefined);

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'RESET':
            return { ...state, };
        default:
            return state;
    }
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};