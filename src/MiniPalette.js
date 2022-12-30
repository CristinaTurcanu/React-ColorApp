import {withStyles} from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles"
import DeleteIcon from "@material-ui/icons/Delete"
import React, {Component} from "react";

class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    deletePalette (event) {
        event.stopPropagation()
        this.props.handleDelete(this.props.id)
    }
    handleClick () {
        this.props.goToPalette(this.props.id)
    }
    render () {
        const {classes, paletteName, emoji, colors } = this.props
        const miniColorBoxes = colors.map(color => (
            <div
                key={color.name}
                className={classes.miniColor}
                style={{backgroundColor: color.color}}
            ></div>
        ))
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <div className={classes.delete}>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        style={{transition: "all 0.3s ease-in-out"}}
                        onClick={this.deletePalette}
                    />
                </div>
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h6 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h6>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette)
