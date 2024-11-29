interface ContainerProps {
  bgColor?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  bgColor,
  children,
}: ContainerProps) => {
  return (
    <section
      className={`min-w-screen mx-auto flex min-h-screen flex-col items-center justify-start font-primary text-teal-900 ${bgColor}`}
    >
      <div className="min-h-full w-full max-w-screen-2xl px-2">{children}</div>
    </section>
  );
};

export default Container;
