const pad = (value: number) => String(value).padStart(2, '0')

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  return `${year}-${month}-${day}`
}

export const parseDateKey = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

export const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)

export const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)

export const getMonthGrid = (date: Date) => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)

  const startWeekday = start.getDay()
  const daysInMonth = end.getDate()

  const cells: { date: Date; isCurrentMonth: boolean }[] = []

  for (let i = 0; i < startWeekday; i += 1) {
    const day = new Date(start)
    day.setDate(start.getDate() - (startWeekday - i))
    cells.push({ date: day, isCurrentMonth: false })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: new Date(date.getFullYear(), date.getMonth(), day), isCurrentMonth: true })
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1]?.date ?? end
    const next = new Date(last)
    next.setDate(last.getDate() + 1)
    cells.push({ date: next, isCurrentMonth: false })
  }

  return cells
}

export const formatMonthLabel = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
