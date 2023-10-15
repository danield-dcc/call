import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarAction,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'

const WEEK_DAYS = 7

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface BlockedDates {
  blockedWeekDaysList: number[]
  blockedDates: number[]
}

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ onDateSelected, selectedDate }: CalendarProps) {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1) // altera da data do mês ATUAL para 1
  })

  const username = String(router.query.username)

  const { data: blockedDates } = useQuery<BlockedDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month') + 1,
        },
      })

      return response.data
    },
  )

  const shortWeekdays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  // No dayjs
  // day = 'weekDay' dia da semana
  // date = 'day' dia do mês
  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const daysInMontArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => currentDate.set('date', i + 1))

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: WEEK_DAYS - (lastWeekDay + 1),
    }).map((_, i) => lastDayInCurrentMonth.add(i + 1, 'day'))

    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({ date, disabled: true })),
      ...daysInMontArray.map((date) => ({
        date,
        disabled:
          date.endOf('day').isBefore(new Date()) ||
          blockedDates.blockedWeekDaysList.includes(date.get('day')) ||
          blockedDates.blockedDates.includes(date.get('date')),
      })),
      ...nextMonthFillArray.map((date) => ({ date, disabled: true })),
    ]

    // weeks(acc) = cada interação do reduce, array de retorno final que estamos alterando
    // _ = cada um dos dias, cada um dos objetos dentro do objeto, no entanto, não estamos interessados em trabalhar com eles
    // i = index
    // original = o array original de calendarDays
    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          // criando nova semana
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarAction>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarAction>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekdays.map((weekDay) => {
              return <th key={weekDay}>{weekDay}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    onClick={() => onDateSelected(date.toDate())}
                    disabled={disabled}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
