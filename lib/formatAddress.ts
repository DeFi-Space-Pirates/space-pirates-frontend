const formatAddress = (address: string): string => {
  return `${address.substring(0, 5)}....${address.substring(
    address.length - 5,
    address.length - 0,
  )}`
}

export default formatAddress
