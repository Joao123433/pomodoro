import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmountInput, 
  Separator, 
  StartCountDownButton, 
  TaskInput 
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
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5
    }
  })

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)

    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            type="text" 
            list="taskSuggestions"
            placeholder="De um nome para o seu projeto" 
            {...register("task")}
          />
          <datalist id="taskSuggestions">
            <option value="Projeto 1">Projeto 1</option>
            <option value="Projeto 2">Projeto 2</option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number"  
            id="minutesAmount" 
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Comecar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}