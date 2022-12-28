import React, { Component } from "react"
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "./PaletteFormNav"
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button"
import styles from "./styles/NewPaletteFormStyles"
import DraggableColorList from "./DraggableColorList";
import {arrayMoveImmutable} from 'array-move';
import ColorPickerForm from "./ColorPickerForm";

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }

    constructor(props) {
        super(props)
        this.state = {
            open: true,
            colors: this.props.palettes[0].colors
        }
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeColor = this.removeColor.bind(this)
        this.clearColors = this.clearColors.bind(this)
        this.addRandomColor = this.addRandomColor.bind(this)
        this.removeColor = this.removeColor.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor(newColor) {
        this.setState({
            colors: [...this.state.colors, newColor]
        })
    }

    removeColor (colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName )
        })
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    clearColors() {
        this.setState({ colors: [] })
    }

    addRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat()
        let randomNumber
        let randomColor
        let isDuplicateColor = true
        while(isDuplicateColor){
            randomNumber = Math.floor(Math.random() * allColors.length)
            randomColor = allColors[randomNumber]
            isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name)
        }
        this.setState({ colors: [...this.state.colors, randomColor] })
    }

    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }

    onSortEnd ({oldIndex, newIndex}) {
        this.setState(({colors}) => ({
            colors: arrayMoveImmutable(colors, oldIndex, newIndex)
        }));
    };

    handleSubmit (newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
        newPalette.colors = this.state.colors

        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography
                            variant="h4"
                            gutterBottom
                        >
                            Design Your Palette
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.clearColors}
                                className={classes.button}>
                                Clear Palette
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addRandomColor}
                                disabled={paletteIsFull}
                                className={classes.button}
                            >
                                Random Color
                            </Button>
                        </div>
                        <ColorPickerForm
                            colors={colors}
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                        />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm)
