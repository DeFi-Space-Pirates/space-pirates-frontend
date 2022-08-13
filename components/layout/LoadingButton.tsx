import { useState } from 'react'
import { useTronWeb } from '../../contexts/TronWebContext'

type LoadingButtonProps = {
  text?: string
  onClick?: () => Promise<void>
  onSyncClick?: () => void
  disabled?: boolean
  customClasses?: string
  children?: React.ReactNode
}

const LoadingButton = ({
  text,
  onClick,
  onSyncClick,
  disabled = false,
  customClasses,
  children,
}: LoadingButtonProps) => {
  const { tronWeb } = useTronWeb()

  const [loading, setLoading] = useState(false)

  const handleOnClick = async () => {
    setLoading(true)

    await onClick!()

    setLoading(false)
  }

  return (
    <button
      className={`btn bg-primary btn-block hover:bg-primary-focus border-0 drop-shadow-md text-primary-content ${
        loading && 'loading'
      } ${customClasses}`}
      disabled={!tronWeb || disabled}
      onClick={() =>
        onClick ? handleOnClick() : onSyncClick ? onSyncClick() : {}
      }
    >
      {text ? text : children}
    </button>
  )
}

export default LoadingButton
