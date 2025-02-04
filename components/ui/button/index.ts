import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-dark',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-dark',
        outline:
          'border border-border bg-background hover:bg-muted',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-dark',
        ghost: 'hover:bg-muted',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-4 py-2 text-sm',
        xs: 'h-8 rounded px-2 text-sm',
        sm: 'h-10 rounded-md px-3 text-sm',
        lg: 'h-12 rounded-md px-5 text-base',
        xl: 'h-14 rounded-md px-6 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-9 w-9',
        'icon-lg': 'h-12 w-12',
        'icon-xl': 'h-14 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
