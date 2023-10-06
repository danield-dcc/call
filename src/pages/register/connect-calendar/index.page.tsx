import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'
import { ConnectBox, ConnectItem, Container, Header } from './styles'
import { signIn, useSession } from 'next-auth/react'

export default function Register() {
  const router = useRouter()
  const session = useSession()

  //   async function handleRegister(data: RegisterFormData) {}

  return (
    <Container>
      <Header>
        <Heading as="strong"> Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep currentStep={2} size={4} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
