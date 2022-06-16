import Document, { Html, Head, Main, NextScript } from "next/document";



class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
   
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        <meta name="ed-tech" content="Ed-Tech Credenc" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <body style={{ fontFamily: "Roboto" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;