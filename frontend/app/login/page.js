'use client'
// app/login/page.js
// Tela de login — envia email e senha ao backend e salva token no Redux.

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/userSlice'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.msg || 'Erro no login')
      dispatch(loginSuccess(data))
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          className="border rounded w-full p-2 mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="border rounded w-full p-2 mb-3"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
