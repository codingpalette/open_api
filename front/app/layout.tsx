import './globals.css';
import DefaultWrapper from "../components/wrapper/DefaultWrapper";
import ReactQueryWrapper from "../components/wrapper/ReactQueryWrapper";


export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <ReactQueryWrapper>
          <DefaultWrapper>
            {children}
          </DefaultWrapper>
        </ReactQueryWrapper>
      </body>
    </html>
)}