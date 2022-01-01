import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../../lib/components/Main'
import Head from '../../lib/system/PageHead'
import { titleSuffix } from '../../lib/system/settings'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Edit Leave | { titleSuffix }</title>
			</Head>

			<Main>
			
			</Main>
		</>
	)
}

export default Home
