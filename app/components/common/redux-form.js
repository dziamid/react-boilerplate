export function mapError({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }, errorProp = 'errorText') {
  return touched && error ? { ...props, ...inputProps, [errorProp]: error } : { ...inputProps, ...props };
}
