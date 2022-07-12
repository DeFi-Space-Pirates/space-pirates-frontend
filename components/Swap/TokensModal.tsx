type TokensModalProps = {}

const TokensModal = (props: TokensModalProps) => {
  return (
    <>
      <input type="checkbox" id="swap-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You have been selected for a chance to get one year of subscription
            to use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="swap-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default TokensModal
