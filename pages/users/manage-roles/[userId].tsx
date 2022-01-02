import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../../../lib/components/Main'
import Head from '../../../lib/system/PageHead'
import { organizationLogo, titleSuffix } from '../../../lib/system/settings'
import Typography from '@mui/material/Typography'
import WhiteBox from '../../../lib/components/WhiteBox'
import PagePreloader from '../../../lib/components/PagePreloader'
import httpPostRequest from '../../../lib/network/httpPostRequest'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Title from '../../../lib/components/Title'
import axios from 'axios'
import httpGetRequest from '../../../lib/network/httpGetRequest'

const Page: NextPage = () => {

	const [pageContent, setPageContent] = useState(<PagePreloader height="80vh" />)
	const [backgroundColor, setBackgroundColor] = useState("white");

    const router = useRouter();

    const { userId } = router.query;

	useEffect(function(){
        if (userId){
            httpGetRequest("https://uihrms.icitifysolution.com/api/user-data",{
                "user-id": userId
            }).then(response=>{
                setBackgroundColor("");
                console.log(response);
                
                const user: User = response.data;
                
                setPageContent(
                    <WhiteBox style={{ width: "500px" }}>  
                        <Typography variant='h6'>Manage Roles</Typography>

                        <Title style={{ fontSize: "20px" }}>{ user.name }</Title>
                        
                            
                    </WhiteBox>
                )
            });
        }
	},[userId]);

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
