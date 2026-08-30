export function DocsContent({ children }: { children: React.ReactNode }) {
  return (
    <article className="min-w-0 flex-1 text-muted-foreground [&_h1]:font-[family-name:var(--font-instrument-serif)] [&_h1]:text-4xl [&_h1]:tracking-tight [&_h1]:text-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
      {children}
    </article>
  );
}