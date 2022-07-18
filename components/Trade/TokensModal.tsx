import Image from 'next/image'

import { Token } from '../../typings/Token'

type TokensModalProps = {
  showModal: boolean
  handleShowModal: () => void
  handleTokenChange: (token: Token) => void
  tokensList: Token[]
}

const TokensModal = ({
  showModal,
  handleShowModal,
  handleTokenChange,
  tokensList,
}: TokensModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />
      <div
        className="modal modal-bottom sm:modal-middle"
        onClick={() => handleShowModal()}
      >
        <div
          className="modal-box bg-base-100"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Select token</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost text-lg font-extrabold"
              onClick={() => handleShowModal()}
            >
              ✕
            </button>
          </div>
          <div className="mt-4 overflow-y-auto max-h-96 scrollbar">
            {tokensList.map((token: Token, index) => (
              <button
                key={index}
                className="w-full flex justify-between items-center px-4 py-4 first:pt-2 last:pb-2 hover:bg-base-200 hover:rounded-md"
                onClick={() => handleTokenChange(token)}
              >
                <div className="flex items-center">
                  <Image
                    className="rounded-full"
                    src={token.logoURI}
                    alt={token.name}
                    height={25}
                    width={25}
                    layout="fixed"
                  />
                  <div className="ml-3 font-semibold text-left">
                    {token.name}
                    <p className="text-left text-base-content text-sm text-opacity-60 font-normal">
                      {token.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TokensModal
