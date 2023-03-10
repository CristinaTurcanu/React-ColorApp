import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer"
import styles from "./styles/PaletteStyles"
import {withStyles} from "@material-ui/styles"

class Palette extends Component {
    constructor(props) {
        super(props)
        this.state = { level: 500, format: 'hex'}
        this.changeLevel = this.changeLevel.bind(this)
        this.changeColorFormat = this.changeColorFormat.bind(this)
    }
    changeLevel (newLevel) {
        this.setState({level: newLevel})
    }
    changeColorFormat (value) {
        this.setState({format: value})
    }
    render() {
        const { classes } = this.props
        const { colors, paletteName, id, emoji } = this.props.palette
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                moreUrl={`/palette/${id}/${color.id}`}
                isFullPaletteShown
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar
                    level={level}
                    isLevelSliderShown
                    changeLevel={this.changeLevel}
                    handleFormatChange={this.changeColorFormat}
                />
                <div className={classes.colors}>{colorBoxes}</div>
                <Footer paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette)
