import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../context/CyclesContext";


export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        id="task"
        type="text"
        list="taskSuggestions"
        placeholder="De um nome para o seu projeto"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}