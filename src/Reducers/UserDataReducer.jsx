import axios from "axios"

export function reducer(userDatas, action) {
    switch (action.type) {
        case 'GET':
            return action.payload;
        case 'UPDATE':
            return userDatas.map(userData => (
                userData.id === action.id ? { ...action.payload,id:action.id} : userData
            ));
        case 'DELETE':
            return userDatas.filter(userData => userData.id != action.id);
        case 'ADD':
            return [...userDatas, { ...action.payload }];
        case 'DELETEALL':
            return [];
        default:
            return userDatas;
    }
}