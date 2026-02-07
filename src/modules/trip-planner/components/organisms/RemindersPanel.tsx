import { ReminderForm } from '../molecules/ReminderForm'
import { ReminderList } from '../molecules/ReminderList'
import { useTripPlannerStore } from '../../stores/tripPlanner.store'

export const RemindersPanel = () => {
  const reminders = useTripPlannerStore((state) => state.reminders)
  const addReminder = useTripPlannerStore((state) => state.addReminder)
  const toggleReminder = useTripPlannerStore((state) => state.toggleReminder)
  const removeReminder = useTripPlannerStore((state) => state.removeReminder)

  return (
    <div className="reminders-panel">
      <ReminderForm onSubmit={addReminder} />
      <ReminderList
        reminders={reminders}
        onToggle={toggleReminder}
        onRemove={removeReminder}
      />
    </div>
  )
}
