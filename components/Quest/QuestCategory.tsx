type QuestCategoryProps = {
  tabIndex: number
  title: string
  description: string
  claimable: boolean
  children: React.ReactNode
}

const QuestCategory = ({
  tabIndex,
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
      <div
        tabIndex={tabIndex}
        className="w-full collapse collapse-open border border-base-300 bg-base-100 rounded-box drop-shadow"
      >
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
