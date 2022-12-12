import Document, { Html, Head, Main, NextScript } from "next/document";
import Navbar from "../components/layout/navbar"
import Footer from "../components/layout/footer"
function MyDocument() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon/favicon.ico"/>
      </Head>
      <body className='max-w-7xl mx-auto bg-stone-200'>
        {/* <Navbar/> */}
        <Main />
        <NextScript />
        {/* <Footer/> */}
      </body>
    </Html>
  );
}

export default MyDocument;