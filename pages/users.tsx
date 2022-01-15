import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../lib/components/Main'
import Head from '../lib/system/PageHead'
import { api, organizationLogo, titleSuffix } from '../lib/system/settings'
import Typography from '@mui/material/Typography'
import WhiteBox from '../lib/components/WhiteBox'
import PagePreloader from '../lib/components/PagePreloader'
import httpPostRequest from '../lib/network/httpPostRequest'
import httpServerPostRequest from '../lib/server/httpPostRequest'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import Button from '@mui/material/Button'
import ImageAvatar from '../lib/components/ImageAvatar'
import getCookie from '../lib/server/getCookie'

const Page: NextPage = (props: any) => {

	return (
		<>
			<Head>
				<title>Users | { titleSuffix }</title>
			</Head>

			<Main>
                <div>
					<WhiteBox style={{ width: "500px" }}>  
						<Typography variant='h5'>Users</Typography>
						
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
							{((props.users) as User[]).map(user=>{
								return (	
									<ListItem key={ user.userId } alignItems="flex-start" sx={{ marginBottom: "20px" }}>
										<ListItemAvatar>
											<ImageAvatar src={ user.passport } />
										</ListItemAvatar>

										<div style={{ marginLeft: "10px" }}>
											<Typography variant="body1">{ user.name }</Typography>
											<div style={{ fontSize: "14px", color: "gray", marginBottom: "5px" }}>{ user.title }</div>
											<div className="spaced-links">
												<Link href={`/admin/users/profile/${user.userId}`} passHref>
													<a className='blue-link small-link'>Update profile</a>
												</Link>

												<Link href={`/admin/manage-roles/${user.userId}`} passHref>
													<a className='blue-link small-link'>Manage Roles</a>
												</Link>

											</div>
										</div>
									</ListItem>

								);	
							})}
						</List>	
					</WhiteBox>
				</div>
			</Main>
		</>
	)
}


export async function getServerSideProps({ req }: any){
	let cookie = req.headers.cookie;
	let users = {};
	if (cookie){
		let token = getCookie("token",req.headers.cookie) || "";
		let response = await httpServerPostRequest(`${api}/users`,token);
		users = response.data;
	}

	return {
		props: {
			users
		}
	}
}

export default Page;
