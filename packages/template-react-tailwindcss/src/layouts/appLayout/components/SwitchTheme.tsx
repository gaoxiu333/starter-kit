import { THEMES } from "../../../lib/storages/themes";
import { Palette } from "lucide-react";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const SwitchTheme = () => {
    useEffect(() => {
        themeChange(false);
    }, []);
    return (
        <div className="dropdown dropdown-end hidden [@supports(color:oklch(0%_0_0))]:block">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                <Palette />
            </div>
            <div tabIndex={0} className="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[28.6rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16">
                <div className="grid grid-cols-1 gap-3 p-3">
                    {THEMES.map((theme) => (
                        <button key={theme} data-set-theme={theme} className="outline-base-content text-start outline-offset-4 [&_svg]:visible">
                            <span data-theme={theme} className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans">
                                <span className="grid grid-cols-5 grid-rows-3">
                                    <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                        <span className="flex-grow text-sm">{theme}</span>
                                        <span className="flex h-full shrink-0 flex-wrap gap-1">
                                            <span className="w-2 rounded bg-primary" />
                                            <span className="w-2 rounded bg-secondary" />
                                            <span className="w-2 rounded bg-accent" />
                                            <span className="w-2 rounded bg-neutral" />
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
export { SwitchTheme };
