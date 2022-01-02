/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head"
import { organizationLogo, themeColor } from "./settings"

export default function PageHead(props: any){
    return (
        <Head>
            { props.children }
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name='theme-color' content={ themeColor } />


            <link
                rel='stylesheet'
                href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />

            <link rel='shortcut icon' href={ organizationLogo } />
        </Head>
    )
}