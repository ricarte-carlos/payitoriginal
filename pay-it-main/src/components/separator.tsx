import { forwardRef } from "react";

import { type VariantProps, tv } from "mizuhara/utils";

export const SeparatorStyles = tv({
  base: ["shrink-0 bg-border"],
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
export type SeparatorProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof SeparatorStyles> & {
    decorative?: boolean;
  };

export const Separator = forwardRef<React.ElementRef<"div">, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    const semanticProps = decorative
      ? { role: "none" }
      : { "aria-orientation": orientation, role: "separator" };
    return (
      <div
        ref={ref}
        className={SeparatorStyles({ className, orientation })}
        {...semanticProps}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";
