import InfoCircle from '../icons/InfoCircle'

type InfoBannerProps = {
  children: React.ReactNode
}

const InfoBanner = ({ children }: InfoBannerProps) => {
  return (
    <div className="alert flex flex-col mb-5 max-w-lg">
      <div>
        <InfoCircle />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default InfoBanner
