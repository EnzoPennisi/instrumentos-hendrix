import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UsuarioContextProvider } from './context/UsuarioContext'
import Sidebar from './components/SideBar'
import { Login } from './components/Login'
import { DondeEstamos } from './components/DondeEstamos'
import { Producto } from './components/Producto'
import { InstrumentoDetalle } from './components/InstrumentoDetalle'
import { ChartsGoogle } from './components/ChartsGoogle'
import { RutaPrivada } from './controlAcceso/RutaPrivada'
import { GrillaInstrumentos } from './components/GrillaInstrumentos'
import { Formulario } from './components/Formulario'
import { Home } from './components/Home'
import { RolUsuario } from './controlAcceso/RolUsuario'
import { NavBar } from './components/NavBar'
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsuarioContextProvider>
        <Sidebar />
        <div className='h-100 w-100 flex-grow-1'>
          <NavBar />
          <div className='content' style={{ marginLeft: "60", marginRight: "60" }}>

            <Routes>

            //---- Rutas publicas ----
              <Route index element={<Home />} />

              <Route path='/login' element={<Login />} />

              <Route path='/home' element={<Home />} />

              <Route path='/dondeEstamos' element={<DondeEstamos />} />

              <Route path='/producto' element={<Producto />} />

              <Route path='/producto/:idInstrumento' element={<InstrumentoDetalle />} />

            //---- Rutas privadas ----
              <Route path='/grilla' element={
                <RutaPrivada>
                  <GrillaInstrumentos />
                </RutaPrivada>
              } />

              <Route path='/chartsGoogle' element={
                <RutaPrivada>
                  <ChartsGoogle />
                </RutaPrivada>
              } />

            //ruta privada y con Rol Administrador
              <Route element={<RolUsuario />}>
                <Route path="/formulario/:idInstrumento" element={
                  <Formulario />
                } />
              </Route>

            </Routes>

          </div>
        </div>
      </UsuarioContextProvider>
    </BrowserRouter>
  </React.StrictMode >
)
