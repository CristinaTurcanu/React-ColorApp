import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button"
import styles from "./styles/PaletteFormNavStyles"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PaletteMetaForm from "./PaletteMetaForm";

class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPaletteName: "",
            isFormShown: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    showForm() {
        this.setState({ isFormShown: true });
    }

    hideForm(){
        this.setState({ isFormShown: false })
    }
    handleSubmit (newPalette) {
        this.props.handleSubmit(newPalette)
    }

    render() {
        const { classes, open, palettes, handleDrawerOpen, handleSubmit } = this.props
        const { isFormShown } = this.state

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: open
                            })}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/" className={classes.link}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                            >
                                Go Back
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.showForm}
                            className={classes.button}
                        >
                            Save
                        </Button>
                    </div>
                </AppBar>
                {isFormShown && (<PaletteMetaForm
                    palettes={palettes}
                    handleSubmit={handleSubmit}
                    hideForm={this.hideForm}
                />
                )}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)
