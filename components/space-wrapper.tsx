export default function SpaceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // This component is used to wrap content with a consistent padding
  // https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
  return <div className="px-4 md:px-8">{children}</div>;
}
