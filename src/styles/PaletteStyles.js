import sizes from "./sizes";

export default {
    Palette: {
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    goBack: {
        position: "relative",
        backgroundColor: "black",
        display: "inline-block",
        width: "20%",
        height: "50%",
        margin: "0 auto",
        cursor: "pointer",
        marginBottom: "-3.5px",
        opacity: 1,
        "& a": {
            color: "white",
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
            background: "rgba(255, 255, 255, 0.3)",
            lineHeight: "30px",
            textTransform: "uppercase",
            textDecoration: "none"
        }
    },
    [sizes.down("lg")]: {
        width: "50%",
        height: "33.3333%"
    },
    [sizes.down("md")]: {
        width: "50%",
        height: "20%"
    },
    [sizes.down("xs")]: {
        width: "100%",
        height: "10%"
    },
    colors: {
        height: "89vh"
    }
}
