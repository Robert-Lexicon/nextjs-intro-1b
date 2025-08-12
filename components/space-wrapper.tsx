export default function SpaceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-4 md:px-8">{children}</div>;
}
