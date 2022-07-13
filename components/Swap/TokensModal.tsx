import Image from 'next/image'

import tokensList from '../../config/constants/tokensList.json'
import { Token } from '../../typings/Token'

type TokensModalProps = {
  showModal: boolean
  handleShowModal: () => void
  handleTokenChange: (token: Token) => void
}

const TokensModal = ({
  showModal,
  handleShowModal,
  handleTokenChange,
}: TokensModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Select token</h3>
            <button
              className="btn btn-sm btn-circle"
              onClick={() => handleShowModal()}
            >
              ✕
            </button>
          </div>
          <div className="mt-4 overflow-y-auto max-h-96 scrollbar">
            {tokensList.tokens.map((token: Token, index) => (
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
                    {token.symbol}
                    <p className="text-left text-gray-400 text-sm">
                      {token.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => handleShowModal()}
            >
              Yay!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TokensModal
