import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../context/CyclesContext";

export function Countdown() {
  const { activeCycle, activeCycleId, MarkCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext)

  // CONVERTE OS MINUTOS E SEGUNDOS
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // VERIFICA QUANTO TEMPO PASSOU COM BASE NO ESTADO DE SEGUNDOS
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // CALCULA O MINUTOS E SEGUNDOS
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  // FORMATA OS MINUTOS E SEGUNDOS PARA TER O ZERO ANTES
  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  // ATUALIZA O TITULO DA PAGINA
  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number;

    if(activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds (new Date(), activeCycle.startDate)

        // VERIFICA SE O TOTAL DE SEGUNDO E MAIOR QUE A QUANTIDADE DE SEGUNDOS DA TASK
        if(secondsDifference >= totalSeconds) {
          MarkCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          // SETA O ESTADO A DIFERENCA DOS MINUTOS ATUAIS PARA O HORARIO QUE FOI COMECADO A TASK
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, setSecondsPassed, MarkCurrentCycleAsFinished])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}