type LoadingButtonProps = {
  text: string
  loading: boolean
  onClick: () => void
  disabled?: boolean
  customClasses?: string
  children?: React.ReactNode
}

const LoadingButton = ({
  text,
  loading,
  onClick,
  disabled = false,
  customClasses,
  children,
}: LoadingButtonProps) => {
  return (
    <button
      className={`btn bg-primary btn-block hover:bg-primary-focus border-0 drop-shadow-md text-primary-content ${
        loading && 'loading'
      } ${customClasses}`}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {text ? text : children}
    </button>
  )
}

export default LoadingButton
