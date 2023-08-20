import { createTheme } from '@mui/material/styles';
import * as theme from './theme';

const materialTheme = createTheme({
    typography: {
        useNextVariants: true,
    } as any,
    palette: theme.colors.material,
});

export default materialTheme;
