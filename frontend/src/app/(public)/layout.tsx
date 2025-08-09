export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <h1>public</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
