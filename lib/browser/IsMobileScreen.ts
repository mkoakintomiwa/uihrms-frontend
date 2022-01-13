import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function IsMobileScreen(){
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

    return isMobileScreen;
}