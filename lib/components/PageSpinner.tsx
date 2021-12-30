/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Center from "./Center";
import { organizationLogo } from "../system/settings";

export default function PageSpinner(props: PageSpinnerProps){ 
    const antIcon = <LoadingOutlined style={{ fontSize: 20, color: "black" }} spin />;
    return <div>
        <Center style={{ marginBottom: "10px" }}>
            <img alt="Origanization Logo" src={ organizationLogo } style={{ height: "100px" }} />
        </Center>
        
        <Center>
            <Spin indicator={antIcon} />
        </Center>
    </div>
}


interface PageSpinnerProps{

    children?: any;

    style?: React.CSSProperties;
}