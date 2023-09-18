import Providers from "providers/Providers";
import "../styles/globals.css";
import Navbar from "@components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="three"></div>

        <Providers>
          <Navbar />
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
