import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TripPlannerPage } from '../../../pages/TripPlannerPage'
import { useTripPlannerStore } from '../../../modules/trip-planner/stores/tripPlanner.store'
import { formatDateKey } from '../../../modules/trip-planner/utils/date.utils'

describe('Trip Planner Page', () => {
  beforeEach(() => {
    useTripPlannerStore.getState().reset()
  })

  it('renders reminders and calendar sections', () => {
    render(<TripPlannerPage />)

    expect(
      screen.getByRole('heading', { name: /trip events & reminders/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /reminders list/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /trip calendar/i })
    ).toBeInTheDocument()
  })

  it('adds a reminder and toggles it', async () => {
    const user = userEvent.setup()
    render(<TripPlannerPage />)

    await user.type(
      screen.getByLabelText(/reminder/i),
      'Buy travel adapters'
    )
    await user.click(screen.getByRole('button', { name: /add reminder/i }))

    const reminder = screen.getByText('Buy travel adapters')
    expect(reminder).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('adds an event and shows it in the selected date list', async () => {
    const user = userEvent.setup()
    render(<TripPlannerPage />)

    const today = formatDateKey(new Date())

    await user.type(
      screen.getByLabelText(/event/i),
      'Flight check-in opens'
    )
    await user.type(screen.getByLabelText(/^date$/i), today)
    await user.click(screen.getByRole('button', { name: /add event/i }))

    expect(screen.getByText('Flight check-in opens')).toBeInTheDocument()
  })
})
