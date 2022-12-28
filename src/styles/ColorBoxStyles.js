import chroma from "chroma-js";
import sizes from "./sizes";

export default {
    ColorBox: {
        position: "relative",
        display: "inline-block",
        width: "20%",
        height: props => props.isFullPaletteShown ? '25%' : "50%",
        margin: "0 auto",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: 1
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => props.isFullPaletteShown ? '20%' : "50%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => props.isFullPaletteShown ? '10%' : "20%"
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => props.isFullPaletteShown ? '5%' : "10%"
        }
    },
    copyText: {
        color: props =>
            chroma(props.background).luminance() >= 0.7 ? "black" : "light"
    },
    colorName: {
        color: props =>
            chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0, 0.6)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        width: "60px",
        height: "30px",
        lineHeight: "30px",
        textAlign: "center",
        right: "0",
        bottom: "0",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0, 0.6)" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        border: "none",
        fontSize: "1rem",
        opacity: "0",
        background: "rgba(255, 255, 255, 0.3)",
        lineHeight: "30px",
        textTransform: "uppercase",
        textDecoration: "none"
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: 0,
        bottom: 0,
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.3)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "10px",
            textTransform: "uppercase",
            [sizes.down["sm"]]: {
                fontSize: "6rem"
            }
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
    }
}
