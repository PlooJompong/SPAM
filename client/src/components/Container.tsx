interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="min-w-screen mx-auto flex min-h-screen flex-col items-center justify-start bg-orange-100 py-5 font-primary text-teal-900">
      <section className="min-h-full w-full max-w-screen-2xl">
        {children}
      </section>
    </div>
  );
};

export default Container;
