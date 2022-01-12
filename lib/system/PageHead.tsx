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

            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />

            <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=swap" rel="stylesheet" />

            <link rel='shortcut icon' href={ organizationLogo } />
        </Head>
    )
}