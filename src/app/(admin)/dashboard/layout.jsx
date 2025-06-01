import Navbar from "./components/Navbar"

export const metadata = {
    title: "Dashboard"
}

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                { children }
            </body>
        </html>
    )
}