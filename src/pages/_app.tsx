import styled, { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { GlobalStyle } from "@styles/global-styles";
import { theme } from "@styles/theme";
import CustomHead from "src/components/CustomHead";
import Header from "@components/Header";
import Footer from "@components/Footer";
import axios from "axios";
import Notice from "@components/Notice";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CustomHead />
        <GlobalStyle />
        <AppContainer>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <Notice />
        </AppContainer>
      </ThemeProvider>
      <div id="modal" />
    </RecoilRoot>
  );
}

const AppContainer = styled.main`
  width: 100%;
  max-width: 1024px;
  height: 100%;

  margin: 0 auto;
`;

export default MyApp;
