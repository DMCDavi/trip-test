import { render, screen } from '@testing-library/react'

import { TripPlannerPage } from '../../../pages/TripPlannerPage'

describe('Trip Planner Page', () => {
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
})
