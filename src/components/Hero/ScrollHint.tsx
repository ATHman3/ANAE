type ScrollHintProps = {
    text: string;
};

export default function ScrollHint({ text }: ScrollHintProps) {
    return (
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-[9px] uppercase tracking-[0.2em] text-amber-100/70 sm:bottom-4 sm:text-[10px] sm:tracking-[0.3em] lg:bottom-6 lg:text-[11px] lg:tracking-[0.4em]">
            <span className="block">{text}</span>
            <div className="mx-auto mt-1 h-6 w-[1px] bg-gradient-to-b from-amber-100 via-white/30 to-transparent sm:mt-2 sm:h-8 lg:mt-4 lg:h-12" />
        </div>
    );
}
