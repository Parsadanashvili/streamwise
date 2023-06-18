const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center gap-2 min-h-[100svh] bg-page-gradient">
      {children}
    </main>
  );
};

export default AuthLayout;
