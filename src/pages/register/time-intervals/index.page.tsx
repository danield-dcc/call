import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import {
  Container,
  Header,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'
import { ArrowRight } from 'phosphor-react'

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong"> Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep currentStep={3} size={4} />
      </Header>

      <IntervalBox as="form">
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-Feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="sm" type="time" crossOrigin="" step={60} />
              <TextInput size="sm" type="time" crossOrigin="" step={60} />
            </IntervalInputs>
          </IntervalItem>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Terça-Feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size="sm" type="time" crossOrigin="" step={60} />
              <TextInput size="sm" type="time" crossOrigin="" step={60} />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>

        <Button>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
