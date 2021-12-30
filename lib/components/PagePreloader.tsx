/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Center from "./Center";
import { organizationLogo } from "../system/settings";

export default function PagePreloader(props: PageSpinnerProps){ 
    const antIcon = <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />;
    
    return <Center fullscreen style={{ height: "90vh" }}>
        <div>
            <Center style={{ marginBottom: "20px" }}>
                <img alt="Origanization Logo" src={ organizationLogo } style={{ height: "100px" }} />
            </Center>
            
            <Center>
                <Spin indicator={antIcon} />
            </Center>
        </div>
    </Center>
}


interface PageSpinnerProps{

    children?: any;

    style?: React.CSSProperties;
}