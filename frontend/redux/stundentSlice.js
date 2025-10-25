// redux/studentsSlice.js

'use client'  
// Indica que este arquivo será executado no client-side do Next.js.
// Necessário para usar localStorage e hooks do React.

// importa funções do Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// createSlice: cria um slice (pedaço do estado global)
// createAsyncThunk: cria ações assíncronas (requisições CRUD)

const BASE_URL = 'http://localhost:5000/api/students'
// URL base do backend para alunos

const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
// Função helper para pegar o token do localStorage
// Verifica se está no navegador (window) antes de acessar

/* ------------------------------
   Thunks assíncronos (CRUD)
------------------------------ */

export const fetchStudents = createAsyncThunk(
  'students/fetch', // nome da ação
  async (_, thunkAPI) => { // função assíncrona
    try {
      const token = getToken() // pega token do localStorage
      if (!token) return thunkAPI.rejectWithValue('Usuário não autenticado')
      // se não houver token, rejeita a ação com erro

      const res = await fetch(BASE_URL, { // faz requisição GET
        method: 'GET',
        headers: { 'x-auth-token': token }, // envia token no header
      })
      const data = await res.json() // transforma resposta em JSON
      if (!res.ok) return thunkAPI.rejectWithValue(data.msg || data.error || 'Erro ao listar alunos')
      // se o status não for 2xx, retorna erro
      return data // retorna lista de alunos
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Erro de rede')
      // captura erro de rede ou exceção
    }
  }
)

export const addStudent = createAsyncThunk(
  'students/add', // nome da ação
  async (student, thunkAPI) => { // student é o objeto do novo aluno
    try {
      const token = getToken() // pega token do localStorage
      if (!token) return thunkAPI.rejectWithValue('Usuário não autenticado')

      const res = await fetch(BASE_URL, { // faz requisição POST
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', // indica JSON
          'x-auth-token': token // token no header
        },
        body: JSON.stringify(student), // envia dados do novo aluno
      })
      const data = await res.json() // transforma resposta em JSON
      if (!res.ok) return thunkAPI.rejectWithValue(data.msg || data.error || 'Erro ao adicionar aluno')
      return data // retorna aluno criado
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Erro de rede')
    }
  }
)

export const updateStudent = createAsyncThunk(
  'students/update', // nome da ação
  async ({ id, updates }, thunkAPI) => { 
  // recebe objeto com id do aluno e campos a atualizar
    try {
      const token = getToken() // pega token
      if (!token) return thunkAPI.rejectWithValue('Usuário não autenticado')

      const res = await fetch(`${BASE_URL}/${id}`, { // faz PUT para o id específico
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', // indica JSON
          'x-auth-token': token // envia token
        },
        body: JSON.stringify(updates), // envia os campos a atualizar
      })
      const data = await res.json() // transforma resposta em JSON
      if (!res.ok) return thunkAPI.rejectWithValue(data.msg || data.error || 'Erro ao atualizar aluno')
      return data // retorna aluno atualizado
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Erro de rede')
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'students/delete', // nome da ação
  async (id, thunkAPI) => { // recebe id do aluno a deletar
    try {
      const token = getToken() // pega token
      if (!token) return thunkAPI.rejectWithValue('Usuário não autenticado')

      const res = await fetch(`${BASE_URL}/${id}`, { // faz DELETE
        method: 'DELETE',
        headers: { 'x-auth-token': token }, // envia token
      })
      const data = await res.json() // transforma resposta em JSON
      if (!res.ok) return thunkAPI.rejectWithValue(data.msg || data.error || 'Erro ao deletar aluno')
      return id // retorna id deletado para atualizar state
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Erro de rede')
    }
  }
)

/* ------------------------------
   Slice com estado inicial e reducers
------------------------------ */

const studentsSlice = createSlice({
  name: 'students', // nome do slice
  initialState: { list: [], loading: false, error: null }, 
  // estado inicial: lista vazia, não carregando, sem erro
  reducers: {
    clearStudents: (state) => { 
      // limpa lista de alunos (útil no logout)
      state.list = [] 
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => { 
    // adiciona casos para as actions assíncronas

    // fetchStudents
    builder.addCase(fetchStudents.pending, (state) => { 
      state.loading = true // inicia loading
      state.error = null // limpa erro
    })
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false // finaliza loading
      state.list = action.payload // atualiza lista com dados do backend
    })
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false // finaliza loading
      state.error = action.payload // guarda mensagem de erro
    })

    // addStudent
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.list.push(action.payload) // adiciona novo aluno à lista
    })
    builder.addCase(addStudent.rejected, (state, action) => {
      state.error = action.payload // guarda erro
    })

    // updateStudent
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      const idx = state.list.findIndex((s) => s._id === action.payload._id)
      // encontra índice do aluno atualizado
      if (idx !== -1) state.list[idx] = action.payload // atualiza dados do aluno
    })
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.error = action.payload // guarda erro
    })

    // deleteStudent
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.list = state.list.filter((s) => s._id !== action.payload)
      // remove aluno pelo id
    })
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.error = action.payload // guarda erro
    })
  },
})

// exporta action síncrona clearStudents
export const { clearStudents } = studentsSlice.actions

// exporta reducer para ser usado na store
export default studentsSlice.reducer
