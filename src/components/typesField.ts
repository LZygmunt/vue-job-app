export interface FieldProps {
  name: string
  required?: boolean
}

export interface Option<TValue extends string | number = string | number> {
  value: TValue
  label: string
}

export type Options = Option[]
