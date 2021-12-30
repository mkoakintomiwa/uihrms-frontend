/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head"

export default function PageHead(props: any){
    return (
        <Head>
            { props.children }
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            <link
                rel='stylesheet'
                href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            />
        </Head>
    )
}