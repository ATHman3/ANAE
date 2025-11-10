import Navigation from "./Navigation";
import TopBar from "./TopBar";

interface HeaderProps {
    is404?: boolean;
}

export default function Header({ is404 = false }: HeaderProps) {
    return (
        <header>
            <TopBar />
            <Navigation is404={is404} />
        </header>
    )
}