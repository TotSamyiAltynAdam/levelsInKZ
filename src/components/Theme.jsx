import { createTheme } from "@mui/material";

const Theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "blackBold"
                    },
                    style: {
                        color: "black",
                        fontSize: 11,
                        fontWeight: 500,
                    }
                }
            ]
        }
    }
});

export default Theme;