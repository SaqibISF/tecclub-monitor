import React, { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  isHeroSection?: boolean;
  heading?: ReactNode;
  description?: ReactNode;
  bgDefault?: boolean;
  classNames?: {
    section?: string;
    container?: string;
    title?: string;
    heading?: string;
    subtitle?: string;
    description?: string;
  };
};

const SectionHeading: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) =>
  children ? (
    <h3 className={cn("text-2xl font-bold mb-2", className)} {...props}>
      {children}
    </h3>
  ) : null;

const SectionDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) =>
  children ? (
    <p className={cn("text-default-500 text-lg mb-2", className)} {...props}>
      {children}
    </p>
  ) : null;

const Section: FC<SectionProps> = ({
  isHeroSection,
  heading,
  description,
  bgDefault,
  classNames,
  className,
  children,
  ...props
}) => (
  <section
    className={cn(
      "w-full flex flex-col items-center justify-center",
      bgDefault ? "bg-default-100" : "",
      classNames?.section
    )}
    {...props}
  >
    <div
      className={cn(
        "container w-full max-w-7xl flex flex-col",
        isHeroSection ? "p-4 min-h-[calc(100vh-4rem)]" : "px-4 py-12 lg:py-14",
        classNames?.container,
        className
      )}
    >
      {heading && (
        <SectionHeading className={classNames?.heading}>
          {heading}
        </SectionHeading>
      )}
      {description && (
        <SectionDescription className={classNames?.description}>
          {description}
        </SectionDescription>
      )}
      {children}
    </div>
  </section>
);

export { SectionHeading, SectionDescription };

export default Section;
