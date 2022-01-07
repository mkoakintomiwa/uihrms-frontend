import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../lib/components/Main'
import Head from '../lib/system/PageHead'
import { organizationLogo, titleSuffix } from '../lib/system/settings'
import Typography from '@mui/material/Typography'
import WhiteBox from '../lib/components/WhiteBox'
import PagePreloader from '../lib/components/PagePreloader'
import httpPostRequest from '../lib/network/httpPostRequest'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import Button from '@mui/material/Button'

const Page: NextPage = () => {

	const [pageContent, setPageContent] = useState(<PagePreloader height="80vh" />)
	const [backgroundColor, setBackgroundColor] = useState("white");

	useEffect(function(){
		httpPostRequest("https://uihrms.icitifysolution.com/api/users").then(response=>{
			setBackgroundColor("");
			
			const users: User[] = response.data;
			
			setPageContent(
				<WhiteBox style={{ width: "500px" }}>  
					<Typography variant='h5'>Users</Typography>
					
					<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
						{users.map(user=>{
							return (	
								<ListItem key={ user.userId } alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt={ user.name } src={ organizationLogo } />
									</ListItemAvatar>

									<div>
										<Typography variant="body1">{ user.name }</Typography>
										<Link href={`/admin/manage-roles/${user.userId}`} passHref>
											<a className='blue-link small-link'>Manage Roles</a>
										</Link>
									</div>
								</ListItem>

							);	
						})}
					</List>	
				</WhiteBox>
			)
		});
	},[]);

	return (
		<>
			<Head>
				<title>Users | { titleSuffix }</title>
			</Head>

			<Main backgroundColor={ backgroundColor }>
                <div>
					{ pageContent }
				</div>
			</Main>
		</>
	)
}

export default Page;
