import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({id, children}) {
    const [ socket, setSocket ] = useState();

    useEffect(() => {
        const newSocket = io('/',
        { secure: true },
        { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
