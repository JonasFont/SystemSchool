'use client' 
// Indica que este componente será renderizado no lado do cliente no Next.js.

import React, { useEffect, useState } from 'react' 
// Importa React e os hooks useEffect e useState. useState para gerenciar estados locais, useEffect para efeitos colaterais.

import { useDispatch, useSelector } from 'react-redux' 
// Importa hooks do Redux. useDispatch para disparar ações, useSelector para acessar o estado global.

import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../../redux/studentsSlice' 
// Importa as ações do slice de alunos: buscar, adicionar, atualizar e deletar alunos.

import { logout } from '../../redux/userSlice' 
// Importa a ação de logout do slice de usuário.

import { useRouter } from 'next/navigation' 
// Importa useRouter para navegação entre páginas do Next.js.

export default function Dashboard() { 
// Define o componente funcional Dashboard.

  const dispatch = useDispatch() 
  // Inicializa o dispatch para enviar ações ao Redux.

  const router = useRouter() 
  // Inicializa o router para navegação.

  const { list, loading } = useSelector((s) => s.students) 
  // Acessa a lista de alunos e o estado de carregamento do Redux.

  const { token } = useSelector((s) => s.user) 
  // Acessa o token do usuário no Redux para verificar se está logado.

  const [form, setForm] = useState({ name: '', age: '', grade: '' }) 
  // Estado local para armazenar os dados do formulário de aluno.

  const [editId, setEditId] = useState(null) 
  // Estado para armazenar o ID do aluno que está sendo editado.

  useEffect(() => {
    if (!token) {
      router.push('/login') 
      // Se não houver token, redireciona para a página de login.
    } else {
      dispatch(fetchStudents()) 
      // Se houver token, busca a lista de alunos do backend.
    }
  }, [token, dispatch, router]) 
  // Executa o efeito sempre que token, dispatch ou router mudarem.

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value }) 
  // Atualiza o estado do formulário conforme o usuário digita.

  const handleSubmit = (e) => { 
  // Função chamada ao enviar o formulário.

    e.preventDefault() 
    // Previne o comportamento padrão do formulário (recarregar a página).

    if (editId) {
      dispatch(updateStudent({ id: editId, updates: form })) 
      // Se editId existe, atualiza o aluno com os dados do form.
      setEditId(null) 
      // Reseta o estado de edição.
    } else {
      dispatch(addStudent(form)) 
      // Se não estiver editando, adiciona um novo aluno.
    }

    setForm({ name: '', age: '', grade: '' }) 
    // Limpa os campos do formulário.
  }

  const handleEdit = (student) => { 
  // Função chamada ao clicar em "Editar" de um aluno.

    setEditId(student._id) 
    // Define o ID do aluno que está sendo editado.

    setForm(student) 
    // Preenche o formulário com os dados do aluno.
  }

  const handleDelete = (id) => dispatch(deleteStudent(id)) 
  // Função para deletar um aluno enviando a ação deleteStudent.

  const handleLogout = () => { 
  // Função chamada ao clicar em "Logout".

    dispatch(logout()) 
    // Dispara ação de logout para limpar o estado do usuário.

    router.push('/login') 
    // Redireciona para a página de login.
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6"> 
    // Container principal, ocupa toda a altura da tela com fundo cinza e padding.

      <header className="flex justify-between items-center mb-6"> 
      // Cabeçalho com título e botão de logout, usando flexbox para espaçamento.

        <h1 className="text-3xl font-bold">Painel de Alunos</h1> 
        // Título do painel.

        <button
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        // Botão de logout com cor vermelha e efeito hover.
      </header>

      <form
        onSubmit={handleSubmit} 
        className="bg-white p-4 rounded shadow flex flex-wrap gap-3 mb-8"
      >
      // Formulário de criação/edição de aluno com fundo branco, padding, bordas arredondadas e sombra.

        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded flex-1 min-w-[180px]"
          required
        />
        // Campo de texto para nome do aluno.

        <input
          type="number"
          name="age"
          placeholder="Idade"
          value={form.age}
          onChange={handleChange}
          className="border p-2 rounded w-24"
          required
        />
        // Campo numérico para idade do aluno.

        <input
          type="text"
          name="grade"
          placeholder="Série"
          value={form.grade}
          onChange={handleChange}
          className="border p-2 rounded flex-1 min-w-[120px]"
          required
        />
        // Campo de texto para série do aluno.

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {editId ? 'Atualizar' : 'Adicionar'}
        </button>
        // Botão para enviar o formulário. O texto muda dependendo se está editando ou adicionando.
      </form>

      {loading ? (
        <p>Carregando...</p> 
        // Exibe mensagem enquanto os dados estão sendo carregados.
      ) : (
        <ul className="space-y-4"> 
        // Lista de alunos com espaçamento entre os itens.

          {list.map((s) => ( 
          // Mapeia cada aluno da lista para um item da lista.

            <li
              key={s._id} 
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
            // Cada item possui fundo branco, padding, sombra e layout flexbox para separar informações e botões.

              <div>
                <p className="font-semibold text-lg">{s.name}</p> 
                // Nome do aluno em negrito.

                <p className="text-sm text-gray-600">
                  Idade: {s.age} • Série: {s.grade}
                </p>
                // Informações adicionais do aluno (idade e série) em texto menor.
              </div>

              <div className="space-x-2"> 
              // Container dos botões de ação com espaçamento horizontal.

                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                // Botão para editar aluno.

                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
                // Botão para deletar aluno.
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
