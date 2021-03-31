import { createContext, ReactNode, useState } from 'react'

interface SideBarContextData {
    home: boolean;
    ranking: boolean;
    openHome: () => void;
    openRanking: () => void;
}

interface SideBarProviderProps {
    children: ReactNode;
    home: boolean;
    ranking: boolean;
}

export const SideBarContext = createContext({} as SideBarContextData)

export function SideBarProvider({ children }: SideBarProviderProps) {
    const [home, setHome] = useState(true);
    const [ranking, setRanking] = useState(false);
  
    function openHome() {
      setHome(true)
      setRanking(false)
    }
  
    function openRanking() {
      setHome(false)
      setRanking(true)
    }
    
    return (
        <SideBarContext.Provider 
            value={{
                home,
                ranking,
                openHome,
                openRanking
            }}
        >
            {children}
            
        </SideBarContext.Provider>
    )
}