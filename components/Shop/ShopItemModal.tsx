import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LoadingButton from '../layout/LoadingButton'

type ShopItemModalProps = {
  showModal: boolean
  handleShowModal: () => void
  //   item:
}

const ShopItemModal = ({ showModal, handleShowModal }: ShopItemModalProps) => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />
      <div className="modal" onClick={() => handleShowModal()}>
        <div
          className="modal-box p-3 bg-base-200 max-w-5xl"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-12 md:border-b border-base-300">
              <div className="md:col-span-4 md:inline-grid hidden justify-center items-center pr-3">
                <Image
                  className="rounded-box"
                  alt="placeholderNFT"
                  src="/logo.png"
                  height={720}
                  width={1280}
                />
              </div>
              <div className="md:col-span-8 col-span-12 flex flex-col gap-y-4 md:border-l border-base-300 md:pl-3">
                <p className="text-2xl font-semibold">Collection items</p>
                <div className="whitespace-nowrap overflow-x-auto scrollbar">
                  {Array(8)
                    .fill(1)
                    .map((i, index) => (
                      <span key={index} className="mr-2">
                        <Image
                          className="rounded-box"
                          alt="placeholderNFT"
                          src="/logo.png"
                          layout="intrinsic"
                          height={160}
                          width={284}
                        />
                      </span>
                    ))}
                </div>
                <table className="table-auto md:w-4/6 w-full">
                  <tbody>
                    <tr>
                      <td className="md:text-lg text-base font-semibold">
                        Start time
                      </td>
                      <td className="md:text-lg text-base font-semibold">
                        26 Jul 2022
                      </td>
                    </tr>
                    <tr>
                      <td className="md:text-lg text-base font-semibold">
                        End time
                      </td>
                      <td className="md:text-lg text-base font-semibold">
                        28 Aug 2022
                      </td>
                    </tr>
                    <tr>
                      <td className="md:text-lg text-base font-semibold">
                        Available
                      </td>
                      <td className="md:text-lg text-base font-semibold">
                        100
                      </td>
                    </tr>
                    <tr>
                      <td className="md:text-lg text-base font-semibold">
                        Max mint per address
                      </td>
                      <td className="text-lg font-semibold">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col items-center pt-4 gap-y-3">
              <div>
                <label className="label">Input quantity</label>
                <div className="flex input-group-md drop-shadow-md">
                  <input
                    type="number"
                    placeholder="0"
                    className={`input input-md w-full rounded-l-md rounded-r-none`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                  />
                  <span
                    className="btn btn-md btn-ghost bg-base-100 border-0 rounded-r-md rounded-l-none"
                    onClick={() => setAmount(10)}
                  >
                    MAX
                  </span>
                </div>
              </div>
              <div className="sm:w-52 w-35 self-end">
                <LoadingButton loading={loading} onClick={() => {}}>
                  <span className="mr-2">Mint for 10 ASTR</span>
                  <Image
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                    alt="token"
                    height={20}
                    width={20}
                  />
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopItemModal
