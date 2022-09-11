export type TargetBlankLinkProps = {
  href?: string;
};

export const TargetBlankLink = ({
  href = "",
  ...restProps
}: TargetBlankLinkProps) => <a href={href} target="__blank" {...restProps}></a>;

export type TargetBlankLinkH2Props = {
  heading?: string;
};

export const TargetBlankLinkH2 = ({
  heading = "",
  ...restProps
}: TargetBlankLinkH2Props) => (
  <h2>
    {heading} <TargetBlankLink {...restProps} />
  </h2>
);
