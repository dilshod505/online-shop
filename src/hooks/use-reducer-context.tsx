import {useContext} from 'react';
import {ReducerContext} from "../use-context/reducer-context.tsx";

function useReducerContext() {
    const context = useContext(ReducerContext);

    if (context === undefined) {
        throw new Error('useReducerContext must be used within a ReducerContextProvider');
    }
    return context;
}

export default useReducerContext;