import { sbAdminThemeColors } from "../themes/sb-admin/colors";

export default function ChartBox(props: ChartBoxProps){
    return (
        <div>
            <div style={{ borderRadius: "calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0", padding: "0.75rem 1.25rem", marginBottom: 0, backgroundColor: "#f8f9fc", borderBottom: "1px solid #e3e6f0" }}>
                <div style={{ color: sbAdminThemeColors.primary, fontWeight: "bold" }}>{ props.title }</div>
            </div>

            <div style={{ backgroundColor: "white" }}>
                <div>
                    { props.chart }
                </div>

                <div>
                    { props.labelBelow || <div></div> }
                </div>
            </div>
        </div>
    );
}


interface ChartBoxProps{
    chart: JSX.Element;

    title: string;

    labelBelow?: JSX.Element;
}