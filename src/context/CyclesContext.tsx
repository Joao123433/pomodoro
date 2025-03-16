import { createContext, type ReactNode, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  MarkCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  CreateNewCycle: (data: CreateCycleData) => void
  InterruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode 
}

export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // FILTRA OS CYCLOS PARA ACHAR O CICLO ATIVO
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // MARCA O CICLO ATUAL COMO FINALIZADOs
  function MarkCurrentCycleAsFinished() {
    setCycles((prevState) => prevState.map(cycle => {
      if(cycle.id === activeCycleId) {
        return {...cycle, finishedDate: new Date()}
      }

      return cycle
    }))
  }

  function CreateNewCycle(data: CreateCycleData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((prevState) => [...prevState, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  // ZERA O CONTATOR
  function InterruptCurrentCycle() {
    setCycles((prevState) => prevState.map(cycle => {
      if(cycle.id === activeCycleId) {
        return {...cycle, interruptedDate: new Date()}
      }

      return cycle
    }))

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider value={{ activeCycle, activeCycleId, MarkCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, CreateNewCycle, InterruptCurrentCycle, cycles }}>
      {children}
    </CyclesContext.Provider>
  )
}