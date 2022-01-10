import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Main from '../../../lib/components/Main'
import Head from '../../../lib/system/PageHead'
import { api, organizationLogo, titleSuffix } from '../../../lib/system/settings'
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
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import cloneDeep from 'lodash.clonedeep'
import Flex from '../../../lib/components/Flex'
import ImageAvatar from '../../../lib/components/ImageAvatar'
import UserDescription from '../../../lib/components/UserDescription'

const Page: NextPage = () => {

	const [pageContent, setPageContent] = useState(<PagePreloader height="80vh" />)
	const [backgroundColor, setBackgroundColor] = useState("white");
    const [checkboxChecked, checkCheckbox] = useState(true);
    const [checkboxesState, setCheckboxesState] = useState({} as Record<string,any>);
    const [checkboxIsLoadingState, setCheckboxIsLoadingState] = useState({} as Record<string,boolean>);
    const [pageIsLoading, setPageIsLoading] = useState(true);
    const [user, setUser] = useState({} as User);
    const [roleGroups, setRoleGroups] = useState({} as Record<string,any>);

    const router = useRouter();

    const { userId } = router.query;


	useEffect(function(){

        var pageApiData = async () => {
            let userData = await httpGetRequest(`${api}/user-data`,{
                "user-id": userId
            });
    
            let userRoles = await httpGetRequest(`${api}/user-roles`,{
                "user-id": userId
            });
    
            return { userData, userRoles }
        }

        if (userId){
            pageApiData().then(pageData=>{
                const { userData, userRoles } = pageData;
                setPageIsLoading(false);
                setBackgroundColor("");
                setUser(userData.data);
                setRoleGroups(userRoles.data);
            });
        }
	},[userId]);


	return (
		<>
			<Head>
				<title>Manage Roles | { titleSuffix }</title>
			</Head>

			<Main backgroundColor={ backgroundColor }>
                <div>
					{ pageIsLoading? (
                        <PagePreloader height="80vh" />
                    ) : (
                        <WhiteBox style={{ width: "500px" }}>  
                            <Typography variant='h6' sx={{ fontSize: "18px !important", marginBottom: "15px" }}>Manage Roles</Typography>

                            <div style={{ marginBottom: "30px" }}>
                                <UserDescription user={ user } />
                            </div>
                            
                            {Object.keys(roleGroups).map(roleGroupId=>{
                                let roleGroup = roleGroups[roleGroupId];

                                if (typeof checkboxesState["all_roles"] === "undefined") checkboxesState["all_roles"] = roleGroup.hasPermission;

                                if (typeof checkboxIsLoadingState["all_roles"] === "undefined") checkboxIsLoadingState["all_roles"] = false;

                                return (
                                    <div key={`div-${roleGroupId}`} style={{ marginBottom: "30px" }}>
                                        <Typography variant="body1" sx={{ marginBottom: "5px", fontSize: "18px" }}>{ roleGroup.title }</Typography>

                                        { roleGroupId==="all_roles"? (
                                            <div>
                                                <FormControlLabel control={<Checkbox checked={ checkboxesState["all_roles"] } />} disabled={ checkboxIsLoadingState["all_roles"] } label={ "Grant permission to all roles" }  onChange={e=>{
                                                    
                                                    setCheckboxIsLoadingState(prev=>{
                                                        for(const [_roleGroupId,_roleGroup] of Object.entries(roleGroups)){
                                                            if (_roleGroupId != "all_roles"){
                                                                for(const [_roleId, _role] of Object.entries(_roleGroup.roles) as any){
                                                                    prev[_roleId] = true;
                                                                }
                                                            }else{
                                                                prev["all_roles"] = true;
                                                            }
                                                        }
                                                        return cloneDeep(prev);
                                                    });

                                                    let isChecked = (e.target as any).checked;

                                                    httpPostRequest(`${api}/update-user-role`,{
                                                        user_id: userId,
                                                        role_id: "all_roles",
                                                        has_permission: isChecked ? 1 : 0
                                                    }).then(response=>{

                                                        httpGetRequest(`${api}/user-roles`,{
                                                            "user-id": userId
                                                        }).then(userRolesResponse=>{

                                                            setCheckboxIsLoadingState(prev=>{
                                                                for(const [_roleGroupId,_roleGroup] of Object.entries(roleGroups)){
                                                                    if (_roleGroupId != "all_roles"){
                                                                        for(const [_roleId, _role] of Object.entries(_roleGroup.roles) as any){
                                                                            prev[_roleId] = false;
                                                                        }
                                                                    }else{
                                                                        prev["all_roles"] = false;
                                                                    }
                                                                }
                                                                return cloneDeep(prev);
                                                            });

                                                            
                                                            if (!response.data.error && !userRolesResponse.data.error){
                                                                
                                                                setCheckboxesState(prev=>{
                                                                    for(const [_roleGroupId,_roleGroup] of Object.entries(userRolesResponse.data) as any){
                                                                        if (_roleGroupId != "all_roles"){
                                                                            for(const [_roleId, _role] of Object.entries(_roleGroup.roles) as any){
                                                                                prev[_roleId] = _role.hasPermission;
                                                                            }
                                                                        }else{
                                                                            prev["all_roles"] = _roleGroup.hasPermission;
                                                                        }
                                                                    }
                                                                    return cloneDeep(prev);
                                                                }); 
                                                            }
                                                        });

                                                    })
                                                }} />
                                            </div>
                                        ) : (

                                            <div>
                                                {Object.keys(roleGroup.roles).map(roleId=>{
                                                    let role = roleGroup.roles[roleId];

                                                    if (typeof checkboxesState[roleId] === "undefined") checkboxesState[roleId] = role.hasPermission;

                                                    if (typeof checkboxIsLoadingState[roleId] === "undefined") checkboxIsLoadingState[roleId] = false;

                                                    return (
                                                        <div key={ `checkbox-container-${roleId}` }>
                                                            <FormControlLabel control={<Checkbox checked={ checkboxesState[roleId] } />} label={ role.title } disabled= { checkboxIsLoadingState[roleId] } onChange={e=>{

                                                                setCheckboxIsLoadingState(prev=>{
                                                                    prev[roleId] = true;
                                                                    return cloneDeep(prev);
                                                                });

                                                                let isChecked = (e.target as any).checked;

                                                                httpPostRequest(`${api}/update-user-role`,{
                                                                    user_id: userId,
                                                                    role_id: roleId,
                                                                    has_permission: isChecked ? 1 : 0
                                                                }).then(response=>{

                                                                    setCheckboxIsLoadingState(prev=>{
                                                                        prev[roleId] = false;
                                                                        return cloneDeep(prev);
                                                                    });
                                                                    
                                                                    if (!response.data.error){

                                                                        setCheckboxesState(prev=>{
                                                                            prev[roleId] = isChecked;
                                                                            return cloneDeep(prev);
                                                                        }); 
                                                                    }
                                                                })
                                                            }}/>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                        ) }
                                    </div>
                                );
                            })}
                        </WhiteBox>
                    ) }
				</div>
			</Main>
		</>
	)
}

export default Page;
