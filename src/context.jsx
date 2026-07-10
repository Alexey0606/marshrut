import { createContext, useContext, useState, useEffect } from 'react'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('dmLang') || 'ru')
  const [theme, setTheme] = useState(() => localStorage.getItem('dmTheme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dmTheme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('dmLang', lang)
  }, [lang])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleLang  = () => setLang(l => l === 'ru' ? 'en' : 'ru')

  return (
    <AppCtx.Provider value={{ lang, theme, toggleTheme, toggleLang }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)
