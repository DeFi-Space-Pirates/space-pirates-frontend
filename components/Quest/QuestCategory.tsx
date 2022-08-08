type QuestCategoryProps = {
  title: string
  description: string
  claimable: boolean
  children: React.ReactNode
}

const QuestCategory = ({
  title,
  description,
  claimable,
  children,
}: QuestCategoryProps) => {
  return (
    <div className="indicator lg:w-9/12 w-full">
      {claimable && (
        <span className="indicator-item badge badge-secondary"></span>
      )}
      <div className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box drop-shadow">
        <input type="checkbox" />
        <div className="collapse-title">
          <p className="text-xl font-bold">{title}</p>
          <small className="text-sm">{description}</small>
        </div>
        <div className="collapse-content flex flex-col justify-center ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default QuestCategory
