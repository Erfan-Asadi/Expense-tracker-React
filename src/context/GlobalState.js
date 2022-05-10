import { React, createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';




// Create Context
export const GlobalContext = createContext();


// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, [], ()=> {
        const transaction = localStorage.getItem('transactions');
       return transaction ? JSON.parse(transaction) : []
    });

    useEffect(()=> {
        localStorage.setItem('transactions', JSON.stringify(state))
    }, [state])


    // Actions
    const deleteTransaction = (id) => {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }
    const addTransaction = (transaction) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
        
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}