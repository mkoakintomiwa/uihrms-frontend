/* eslint-disable @next/next/no-img-element */
export default function ImageAvatar(props: ImageAvatarProps){
    let imgStyle: typeof props.style = { width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", objectPosition: "top center", boxShadow: "0 0 5px rgba(0,0,0,0.3)" };
    return (
        <div>
            <img src={ props.src } alt="image" style={ imgStyle }/>
        </div>
    );
}


interface ImageAvatarProps{
    src: string

    style?: React.CSSProperties;
}