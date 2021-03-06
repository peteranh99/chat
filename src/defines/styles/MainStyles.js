import { createStyles, makeStyles } from "@material-ui/core";

const colors = {
    lightGray: '#F0F2F5',
}

const mainStyles = makeStyles(theme => createStyles({
    table: {
        minWidth: 650
    },
    chatSection: {
        width: '100%',
        height: '400px',
        overflow: 'auto'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    borderLeft500: {
        borderLeft: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    RoundLightGrayInputStyle: {
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: colors.lightGray,
        borderRadius: '50px',
    },
    buttonStyle: {
        textTransform: 'none',
    },
    flexCenterVerticalStyle: {
        display: 'flex',
        alignItems: 'center',
    },
    flexCenterStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultContainerPaddingStyle: {
        root: {
            '& > *': {
                padding: theme.spacing(2),
            }
        }
    }
}));

export default mainStyles;