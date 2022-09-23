import Document, { Html, Head, Main, NextScript } from "next/document";


class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    initialProps.head.forEach((value, index) => {
    });

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        {/* <title>Ed-Tech</title> */}
        <meta name="ed-tech" content="Ed-Tech Credenc" />
        <meta name="viewport" content="user-scalable=no,initial-scale=1.0,maximum-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <body style={{ fontFamily: "Poppins" }} >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;