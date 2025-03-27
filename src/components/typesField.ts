export interface FieldProps {
  name: string
  required?: boolean
}

export interface Option {
  value: string | number
  label: string
}

export type Options = Option[]
