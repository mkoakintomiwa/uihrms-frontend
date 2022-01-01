import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../lib/components/Main'
import Head from '../lib/system/PageHead'
import { titleSuffix } from '../lib/system/settings'
import Typography from '@mui/material/Typography'
import WhiteBox from '../lib/components/WhiteBox'

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Users | { titleSuffix }</title>
			</Head>

			<Main>
                <WhiteBox style={{ width: "300px" }}>  
                    <Typography variant='h4'>Users</Typography>
                    <div style={{ height: "1000vh" }}></div>
                </WhiteBox>
			</Main>
		</>
	)
}

export default Page;
