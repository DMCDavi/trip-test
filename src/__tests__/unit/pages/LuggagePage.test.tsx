import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../../../App'
import { usePackingStore } from '../../../modules/packing/stores/packing.store'

const resetStore = () => {
  usePackingStore.getState().reset()
}

describe('Luggage MVP', () => {
  beforeEach(() => {
    resetStore()
  })

  it('renders the main structure and buckets', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /trip luggage planner/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /keep/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /give away/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /take away/i })
    ).toBeInTheDocument()
  })

  it('adds a new item into the selected bucket', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/item/i), 'Spoon')
    await user.selectOptions(screen.getByLabelText(/category/i), 'kitchen')
    await user.selectOptions(screen.getByLabelText(/bucket/i), 'take-away')
    await user.click(screen.getByRole('button', { name: /add item/i }))

    const takeAwayBucket = screen.getByRole('heading', { name: /take away/i })
      .closest('section')

    expect(takeAwayBucket).toBeTruthy()

    if (!takeAwayBucket) return

    const bucketScope = within(takeAwayBucket)

    expect(bucketScope.getByText('Spoon')).toBeInTheDocument()
    expect(bucketScope.getByText('Kitchen')).toBeInTheDocument()
  })

  it('prevents adding empty items', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add item/i }))

    expect(
      screen.getByText(/please enter an item name/i)
    ).toBeInTheDocument()
  })

  it('supports drag and drop between buckets', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/item/i), 'Camera')
    await user.selectOptions(screen.getByLabelText(/bucket/i), 'keep')
    await user.click(screen.getByRole('button', { name: /add item/i }))

    const keepBucket = screen.getByRole('heading', { name: /keep/i }).closest(
      'section'
    )
    const takeAwayBucket = screen.getByRole('heading', { name: /take away/i })
      .closest('section')

    expect(keepBucket).toBeTruthy()
    expect(takeAwayBucket).toBeTruthy()

    if (!keepBucket || !takeAwayBucket) return

    const itemCard = within(keepBucket).getByText('Camera').closest('li')
    expect(itemCard).toBeTruthy()
    if (!itemCard) return

    const data = new Map<string, string>()
    const dataTransfer = {
      setData: (key: string, value: string) => {
        data.set(key, value)
      },
      getData: (key: string) => data.get(key) ?? '',
      effectAllowed: 'move',
    } as unknown as DataTransfer

    fireEvent.dragStart(itemCard, { dataTransfer })
    fireEvent.dragOver(takeAwayBucket, { dataTransfer })
    fireEvent.drop(takeAwayBucket, { dataTransfer })

    expect(within(takeAwayBucket).getByText('Camera')).toBeInTheDocument()
  })

  it('imports items from a JSON file', async () => {
    const user = userEvent.setup()
    render(<App />)

    const payload = JSON.stringify([
      { name: 'Notebook', category: 'work', bucket: 'keep' },
      { name: 'Socks', category: 'laundry', bucket: 'take-away' },
    ])
    const file = new File([payload], 'items.json', {
      type: 'application/json',
    })

    const input = screen.getByLabelText(/choose json file/i)
    await user.upload(input, file)

    expect(screen.getByText(/imported 2 items/i)).toBeInTheDocument()

    const keepBucket = screen.getByRole('heading', { name: /keep/i }).closest(
      'section'
    )
    const takeAwayBucket = screen.getByRole('heading', { name: /take away/i })
      .closest('section')

    expect(keepBucket).toBeTruthy()
    expect(takeAwayBucket).toBeTruthy()

    if (!keepBucket || !takeAwayBucket) return

    expect(within(keepBucket).getByText('Notebook')).toBeInTheDocument()
    expect(within(takeAwayBucket).getByText('Socks')).toBeInTheDocument()
  })
})
