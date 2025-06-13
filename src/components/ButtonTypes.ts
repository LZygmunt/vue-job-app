import type { ClassNameValue } from 'tailwind-merge'

/**
 * Defines button color variant - determines the color scheme and semantic meaning.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'

/**
 * Defines button visual appearance style - solid (filled), outline (bordered) or text (text-only).
 */
export type ButtonAppearance = 'outline' | 'text' | 'solid'

/**
 * Defines button size with associated padding and font-size values.
 */
export type ButtonSize = 'small' | 'medium' | 'large'

/**
 * Base properties for all button components.
 * Contains common styling and functional options shared across button variants.
 */
export interface BaseButtonProps {
  /** Visual appearance style of the button (solid, outline, text) */
  appearance?: ButtonAppearance
  /** Color variant of the button (primary, secondary, danger, success, warning, info) */
  variant?: ButtonVariant
  /** Size of the button (small, medium, large) */
  size?: ButtonSize
  /** Whether the button is disabled */
  disabled?: boolean
  /** Additional CSS classes - can be anything that be evaluated by Vue compiler */
  class?: ClassNameValue
}

/**
 * Properties for standard HTML button element.
 * Extends BaseButtonProps with additional options specific to button element.
 */
export interface ButtonProps extends BaseButtonProps {
  /** HTML button type attribute (button, submit, reset) */
  type?: 'button' | 'submit' | 'reset'
}
