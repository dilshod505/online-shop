import React, {
    createContext,
    useReducer,
    ReactNode,
    useEffect,
} from "react";
import axios from "axios";

interface IState {
    cart: Record<string, any>[];
    categories: Record<string, any>[];
    favourites: Record<string, any>[];
    products: Record<string, any>[];
    status: "loading" | "success" | "error";
}

interface IContextProps {
    state: IState;
    dispatch: React.Dispatch<any>;
}

const initialState: IState = {
    cart: JSON.parse(localStorage.getItem("cart") ||"[]"),
    categories: [],
    favourites: [],
    products: [],
    status: "loading",
};

const reducer = (state: IState, action: any) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {...state, products: action.payload};
        case "SET_BRANDS":
            return {...state, brands: action.payload};
        case "SET_CATEGORIES":
            return {...state, categories: action.payload};
        case "SET_STATUS":
            return {...state, status: action.payload};
        case "ADD_TO_CART":
            return {...state, cart: [action.payload, ...state.cart]};
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
            };
        case "ADD_TO_FAVORITE":
            return {
                ...state,
                favourites: [...state.favourites, action.payload],
            };
        case "REMOVE_FROM_FAVORITE":
            return {
                ...state,
                products: state.favourites.map((product) =>
                    product.id === action.payload
                        ? {...product, isSaved: false}
                        : product,
                ),
            };
        default:
            return state;
    }
};

const ReducerContext = createContext<IContextProps | undefined>(undefined);

interface ReducerContextProviderProps {
    children: ReactNode;
}

const ReducerContextProvider: React.FC<ReducerContextProviderProps> = ({children,}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchDataHandler = async () => {
            try {
                dispatch({type: "SET_STATUS", payload: "loading"});
                const resProducts = await axios.get("https://dummyjson.com/products");
                const resCategories = await axios.get(
                    "https://dummyjson.com/products/categories",
                );
                console.log(resProducts);
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: resProducts.data.products.map(
                        (product: Record<string, any>) => ({
                            ...product,
                            isSaved: false,
                        }),
                    ),
                });
                dispatch({type: "SET_CATEGORIES", payload: resCategories.data});
                dispatch({type: "SET_BRANDS"});
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                dispatch({type: "SET_STATUS", payload: "success"});
            }
        };
        fetchDataHandler();
    }, []);

    return (
        <ReducerContext.Provider value={{state, dispatch}}>
            {children}
        </ReducerContext.Provider>
    );
};

export {ReducerContext, ReducerContextProvider};