interface HeadingProps {
  title: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
}) => {
  return (
    <div className=" pb-3">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
};
