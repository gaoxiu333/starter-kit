const Hero = () => {
    return (
        <main className="mt-[-4rem] min-h-screen text-primary-content hero">
            <div className="place-items-center from-primary to-base-100 bg-gradient-to-bl hero-overlay" />
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Starter Kit</h1>
                    <p className="py-6">Typescript + Tailwind + Vite 入门套件</p>
                    <button className="btn btn-primary">开始使用</button>
                </div>
            </div>
        </main>
    );
};
export { Hero };
