'use client'
// app/layout.js
// Layout global — aplica o Redux Provider em todas as páginas.

import './globals.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
