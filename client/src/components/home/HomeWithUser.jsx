import Navbar from "./NavbarSection.jsx";
import ContentHome from "./ContentHome";
const HomeWithUser = () => {
    return (
        <main className="bg-[#0e0e10] min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className=" pt-10 text-white flex flex-col items-center justify-between ">
                <ContentHome />
            </main>
        </main>
    );
}

export default HomeWithUser;