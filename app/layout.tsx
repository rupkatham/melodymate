import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UseProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MelodyMate",
    description: "The world of Melody",
};

export const revalidate = 0;

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const userSongs = await getSongsByUserId();

    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <SideBar songs={userSongs}>
                            {children}
                        </SideBar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
