import './globals.css';
import ReactQueryWrapper from "../components/wrapper/ReactQueryWrapper";
import DefaultWrapper from "../components/wrapper/DefaultWrapper";


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