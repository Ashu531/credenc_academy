import Document, { Html, Head, Main, NextScript } from "next/document";


class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // initialProps.head.forEach((value, index) => {
    // });

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        {/* <title>Ed-Tech</title> */}
        <meta name="ed-tech" content="Ed-Tech Credenc" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap"
          rel="stylesheet"
        />
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