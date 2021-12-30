import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../lib/components/Main'
import Head from '../lib/system/PageHead'
import { titleSuffix } from '../lib/system/settings'
import Typography from '@mui/material/Typography'

const Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>Users | { titleSuffix }</title>
			</Head>

			<Main>
                <Typography variant='h4'>Users</Typography>
                <div style={{ height: "1000vh" }}></div>
			</Main>
		</>
	)
}

export default Page;
