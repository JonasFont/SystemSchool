@echo off
REM ==========================================
REM SCRIPT PARA INICIAR O BACKEND E O FRONTEND
REM ==========================================

REM Define o título da janela
title Sistema Escolar - Inicialização

REM Mostra uma mensagem inicial
echo ==========================================
echo Iniciando o sistema escolar...
echo ==========================================

REM Define o caminho do backend e do frontend
set BACKEND_PATH=%cd%\backend
set FRONTEND_PATH=%cd%\frontend

REM Verifica se o MongoDB está rodando (opcional)
echo Verificando se o MongoDB está ativo...
REM Tenta pingar o localhost na porta 27017
netstat -ano | find "27017" >nul
if errorlevel 1 (
    echo ⚠️  MongoDB não detectado na porta 27017.
    echo Certifique-se de que o MongoDB está rodando.
) else (
    echo ✅ MongoDB detectado!
)

REM Abre o BACKEND em uma nova janela do cmd
echo Iniciando servidor backend...
start cmd /k "cd /d %BACKEND_PATH% && npm install && node server.js"

REM Aguarda alguns segundos para o backend inicializar
timeout /t 5 /nobreak >nul

REM Abre o FRONTEND em uma nova janela do cmd
echo Iniciando cliente frontend (React)...
start cmd /k "cd /d %FRONTEND_PATH% && npm install && npm start"

REM Mensagem final
echo ==========================================
echo Tudo pronto! Servidor e cliente iniciados.
echo ==========================================

REM Mantém a janela principal aberta
pause
