export default function BadgesPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl text-foreground">
        Badges
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Badges you've earned on Colbe.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {/* Badge grid renders here */}
      </div>
    </div>
  );
}