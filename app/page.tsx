export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="hero bg-base-200 min-h-screen p-4">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Insert product title here
            </h1>
            <p className="py-6">
              Insert product description here
            </p>
          </div>
        </div>
      </div>
      <section className="text-center p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Quick links here</h2>
        <p className="max-w-lg mb-10">
          SEO descirption
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          Links list
        </div>
      </section>
    </main>
  );
}
