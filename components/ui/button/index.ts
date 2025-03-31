import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex gap-2 items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
        default: 'h-12 rounded-md px-5 text-sm [&>svg]:size-5',
        xs: 'h-8 rounded px-2.5 text-sm [&>svg]:size-4',
        sm: 'h-10 rounded-md px-4 text-sm [&>svg]:size-5',
        lg: 'h-14 rounded-md px-6 text-base [&>svg]:size-6',
        icon: 'h-12 w-12 rounded-md [&>svg]:size-5',
        'icon-xs': 'h-8 w-8 rounded [&>svg]:size-4',
        'icon-sm': 'h-10 w-10 rounded-md [&>svg]:size-5',
        'icon-lg': 'h-14 w-14 rounded-md [&>svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
