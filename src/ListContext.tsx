import axios from 'axios';
import React, { useContext, useState} from 'react'
import { SERVER_URL } from './utils/config';
import {ListItemType, listLoginType, ListType} from './utils/types'


type ListProviderProps = {
    children: React.ReactNode,
}

type ListValue = {
    login: Function,
    createList: Function,
    list?: ListType,
    createItem: Function,
    deleteItem: Function,
    updateItem: Function,
    deleteAllItems: Function,
};



const ListContext = React.createContext<ListValue>({
    login: () => {},
    createList: () => {},
    deleteItem: () => {},
    updateItem: () => {},
    createItem: () => {},
    deleteAllItems: () => {},
});

export function useList() {
    return useContext(ListContext);
}


export function ListProvider({ children}: ListProviderProps) {
    const [list, setList] = useState<ListType>();

    function changeList(data: any) {
        setList((l: any) => {
            let newList: ListType = {...l, items: data.items, updatedAt: data.updatedAt}
            return newList
        })
    }


    async function login(login: listLoginType) {
        let err: any;
        try {
            const res = await axios({
                method: 'POST',
                url: SERVER_URL + '/lists/open',
                data: {
                    ...login
                }
            })
            console.log(res)
            window.localStorage.setItem('lastList', JSON.stringify({name: res.data.name, password: res.data.password}));
            setList(res.data);
        } catch (e) {
            err = e
        }
        return err ? err.response.data.error : undefined;
    }
    
    async function createList(create: listLoginType) {
        let err: any;
        
        try {
            const res = await axios({
                method: 'POST',
                url: SERVER_URL + '/lists/create',
                data: {
                    ...create
                }
            })
            console.log(res)
            window.localStorage.setItem('lastList', JSON.stringify({name: res.data.name, password: res.data.password}));
            setList(res.data);
            console.log("creating");
        } catch (e) {
            err = e
        }
    
        return err ? err.response.data.error : undefined;
    }

    async function createItem(item: ListItemType) {
        let err: any;
        
        if (list) {

        
        try {
            const res = await axios({
                method: 'POST',
                url: SERVER_URL + '/lists/edit',
                data: {
                    name: list?.name,
                    password: list?.password,
                    itemName: item.name,
                    quantity: item.qty,
                }
            })
            
            changeList(res.data);
        } catch (e) {
            err = e
        }
        }
        return err ? err.response.data.error : undefined;
    }

    async function deleteItem(item: ListItemType) {
        let err: any;

        try {
            const res = await axios({
                method: 'DELETE',
                url: SERVER_URL + '/lists/edit',
                data: {
                    name: list?.name,
                    password: list?.password,
                    id: item._id,
                }
            })
            changeList(res.data);
        } catch (e) {
            err = e
        }

        return err ? err.response.data.error : undefined;
    }

    async function updateItem(item: ListItemType) {
        let err: any;

        try {
            const res = await axios({
                method: 'PUT',
                url: SERVER_URL + '/lists/edit',
                data: {
                    name: list?.name,
                    password: list?.password,
                    id: item._id,
                    itemName: item.name,
                    quantity: item.qty,
                }
            })
            changeList(res.data);
        } catch (e) {
            err = e
        }

        return err ? err.response.data.error : undefined;
    }

    async function deleteAllItems(item: ListItemType) {
        let err: any;

        try {
            const res = await axios({
                method: 'DELETE',
                url: SERVER_URL + '/lists/edit/clear',
                data: {
                    name: list?.name,
                    password: list?.password,
                }
            })
            changeList(res.data);
        } catch (e) {
            err = e
        }

        return err ? err.response.data.error : undefined;
    }

    const value: ListValue = {
        login,
        createList,
        list,
        createItem,
        deleteItem,
        updateItem,
        deleteAllItems,
    }
  return (
    <ListContext.Provider value={value}>
        {children}
    </ListContext.Provider>
  )
}
