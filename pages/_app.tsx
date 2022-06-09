import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.scss";
import { initializeApollo } from "@services/graphql";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const apolloClient = initializeApollo();
    const queryClient = new QueryClient();
    return (
        <ApolloProvider client={apolloClient}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Hydrate>
            </QueryClientProvider>
        </ApolloProvider>
    );
}

export default MyApp;
