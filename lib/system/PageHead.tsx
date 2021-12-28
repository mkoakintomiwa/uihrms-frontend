import Head from "next/head"

export default function PageHead(props: any){
    return (
        <Head>
            { props.children }
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
    )
}