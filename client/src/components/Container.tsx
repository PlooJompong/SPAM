interface ContainerProps {
  bgColor?: string;
  children: React.ReactNode;
}

const Container = ({ bgColor, children }: ContainerProps) => {
  return (
    <div
      className={`min-w-screen  mx-auto flex min-h-screen flex-col items-center justify-start font-primary text-teal-900 ${bgColor}`}
    >
      <section className="min-h-full w-full max-w-screen-2xl px-2">
        {children}
      </section>
    </div>
  );
};

export default Container;
