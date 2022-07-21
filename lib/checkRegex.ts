const checkRegex = (
  value: string,
  regex: string = '^[0-9]*[.]?[0-9]*$',
): boolean => {
  return value.match(regex) != null
}

export default checkRegex
