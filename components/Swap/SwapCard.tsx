import DoubleArrows from '../icons/DoubleArrows'
import SelectToken from './SelectToken'

type SwapCardProps = {}

const SwapCard = (props: SwapCardProps) => {
  return (
    <div className="card  m-3 p-2 drop-shadow-lg bg-base-200 sm:min-w-[420px]">
      <div className="text-center my-4">
        <p className="text-2xl font-bold mb-2">Swap</p>
        <p>Swap instantly Space Pirates tokens</p>
      </div>
      <div className="divider m-0 p-0"></div>
      <div className="card-body">
        <SelectToken />
        <div className="flex justify-center">
          <button
            className="btn btn-circle btn-outline border-0 my-4"
            onClick={() => {}}
          >
            <DoubleArrows />
          </button>
        </div>
        <SelectToken />
        <button
          className={`btn glass bg-primary hover:bg-primary-focus border-0 drop-shadow-md mt-8 ${
            false && 'loading'
          }`}
        >
          SWAP
        </button>
      </div>
    </div>
  )
}

export default SwapCard
