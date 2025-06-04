export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <img src="/storage/logo/logo.png" alt="" className="w-full" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm md:text-base">
                <span className="from-primary via-foreground to-foreground/10 animate-gradient-x mb-0.5 truncate bg-gradient-to-r bg-clip-text leading-none font-semibold text-transparent">
                    Editor Amplifier
                </span>
            </div>
        </>
    );
}
