import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export function ConfirmStep() {
  async function handleConfirmSchedule(data) {
    console.log(data)
  }
  return (
    <ConfirmForm as="form" onSubmit={handleConfirmSchedule}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          12 de Outubro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label htmlFor="">
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" crossOrigin="" />
      </label>

      <label htmlFor="">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          crossOrigin=""
        />
      </label>

      <label htmlFor="">
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
