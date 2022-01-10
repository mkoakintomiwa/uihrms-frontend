/* eslint-disable @next/next/no-img-element */
export default function WhiteBarSpinner(props: WhiteBarSpinnerProps){
    return <img src={`/assets/images/white-bar-spinner-4.gif`} alt="image" style={{ width: props.width || "60px", height: props.height || "60px" }} />
}


interface WhiteBarSpinnerProps{
    width?: string;

    height?: string;
}