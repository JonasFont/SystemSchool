'use client'
//redux/store.js
//cria o store global do Redux, juntando todos os slice

import { configureStore } from "@reduxjs/toolkit"
import useReducer from "./userSlice"
import studentsReducer from "./stundentSlice"

export const store = configureStore({
    reducer: {
        user: useReducer, //controla de autenticação e token
        students: studentsReducer //CRUD dos alunos
    },
})