import { useContext } from "react"
import { UserContext } from "../context/UsuarioContext"

export const useUsuario = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error('useUsuario debe ser usado dentro del ambito de un UserProvider')
    }

    return context
}