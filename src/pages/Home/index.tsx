import { Play, HandPalm } from "phosphor-react";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod"
import { CyclesContext } from "../../context/CyclesContext";

import { 
  HomeContainer,
  StartCountDownButton, 
  StopCountdownButton,
} from "./styles";

// OBJETO PARA VALIDACAO DO FORMULARIO
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O clico precisa ser de no minimpo 5 minutos")
    .max(60, "O clico precisa ser de no maximo 60 minutos")
})

// TIPAGEM DOS VALORES DO FORMULARIO
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>



export function Home() {
  const { activeCycle, CreateNewCycle, InterruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { // QUAL O VALOR PADRAO PARA OS INPUTS CASO SEJA RESETADO OU ATUALIZADO
      task: "",
      minutesAmount: 5
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data)
    reset()
  }

  // OBSERVA SE O INPUT TASK ESTA VAZIO, PARA DESABILITAR O BOTAO DE COMECAR
  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {/* CONTEXTO RESPONSAVEL POR PASSAR TODAS AS INFORMACOES DO FORM CONTEXT PARA O COMPONENTE  */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Comecar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}