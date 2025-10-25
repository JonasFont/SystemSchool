// redux/userSlice.js
'use client'                                       // client module (usa localStorage/hooks no client)

// importa função para criar slice do Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'

// estado inicial: tenta recuperar token do localStorage para persistência após reload
const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null, // token JWT (se houver)
  userInfo: null                                   // informações do usuário logado
}

// cria o slice 'user' com reducers para login/logout
const userSlice = createSlice({
  name: 'user',                                    // nome do slice
  initialState,                                    // estado inicial definido acima
  reducers: {
    // ação usada quando o login obtém sucesso: salva token e dados do usuário
    loginSuccess: (state, action) => {
      state.token = action.payload.token           // grava token no estado
      state.userInfo = action.payload.user         // grava info do usuário no estado
      if (typeof window !== 'undefined') {         // se estamos no browser
        localStorage.setItem('token', action.payload.token) // persiste o token
      }
    },
    // ação de logout: limpa token e informações do usuário
    logout: (state) => {
      state.token = null                           // remove token do estado
      state.userInfo = null                        // remove info do estado
      if (typeof window !== 'undefined') {         // se estamos no browser
        localStorage.removeItem('token')           // remove token do localStorage
      }
    },
    // ação opcional para setar userInfo sem tocar token (por exemplo, buscar perfil)
    setUserInfo: (state, action) => {
      state.userInfo = action.payload              // atualiza dados do usuário
    },
  },
})

// exporta actions para uso nos componentes
export const { loginSuccess, logout, setUserInfo } = userSlice.actions

// exporta o reducer default para a store
export default userSlice.reducer
