import React, {Component} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Link} from "react-router-dom"
import styles from "./styles/PaletteStyles"
import {withStyles} from "@material-ui/styles";

class UniqueColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.getShades(this.props.palette, this.props.colorId)
        this.state = {format: 'hex'}
        this.changeColorFormat = this.changeColorFormat.bind(this)
    }

    changeColorFormat (value) {
        this.setState({format: value})
    }
    getShades (palette, colorToFilterBy) {
        let shades = []
        let allColors = palette.colors

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1)
    }
    render() {
        const { format } = this.state
        const { classes } = this.props
        const { paletteName, emoji, id } = this.props.palette
        const colorBoxes = this._shades.map(shade => (
            <ColorBox
                background={shade[format]}
                name={shade.name}
                key={shade.name}
                isFullPaletteShown={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar
                    isLevelSliderShown={false}
                    handleFormatChange={this.changeColorFormat}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <Footer paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(UniqueColorPalette);
