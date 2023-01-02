import { useRouter } from 'next/router'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import globalContext from './GlobalState'

type InitialStateProps = {
  searchInput: string
}

const initialState = {
  searchInput: ''
}

type ContextProviderProps = {
  children: ReactNode
}

type ContextProps = {
  useStore: <SelectorOutput>(
    selector: (store: InitialStateProps) => SelectorOutput
  ) => [SelectorOutput, (value: Partial<InitialStateProps>) => void]
  back: () => void
}

const GlobalState = createContext({} as ContextProps)

export function useGlobalContext (): ContextProps {
  return useContext(GlobalState)
}

const { Provider, useStore } = globalContext(initialState as InitialStateProps)

export default function ContextProvider ({ children }: ContextProviderProps) {
  const { asPath, push, pathname } = useRouter()
  const [history, setHistory] = useState<string[]>([])

  function back () {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i]
      if (!route.includes('#') && route !== pathname) {
        push(route)

        const newHistory = history.slice(0, i)
        setHistory(newHistory)

        break
      }
    }
  }

  useEffect(() => {
    setHistory((previous) => [...previous, asPath])
  }, [asPath])

  return (
    <GlobalState.Provider value={{ useStore, back }}>
      <Provider>{children}</Provider>
    </GlobalState.Provider>
  )
}
