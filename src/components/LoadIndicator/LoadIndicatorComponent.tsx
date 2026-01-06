import { CircularProgress } from "@mui/material";

export default function LoadIndicatorComponent(props: {visible: boolean}){
    if (!props.visible) return null;

    return (
        <>
        <div style={{width:"100%", height:"100%", left:0, display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"rgba(0,0,0,.3)", position:"absolute"}}>
            <CircularProgress enableTrackSlot/>
        </div>
        </>
    )

}