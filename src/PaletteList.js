import React, {Component} from 'react';
import MiniPalette from "./MiniPalette";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PaletteListStyles"
import {Link} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {List, ListItem } from "@material-ui/core";
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from "@material-ui/core/Avatar";

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleteDialogOpen: false,
            paletteToDelete: ''
        }
        this.openDeleteDialog = this.openDeleteDialog.bind(this)
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.goToPalette = this.goToPalette.bind(this)
    }
    openDeleteDialog (id) {
        this.setState({isDeleteDialogOpen: true, paletteToDelete: id})
    }
    closeDeleteDialog () {
        this.setState({isDeleteDialogOpen: false, paletteToDelete: ""})
    }
    goToPalette (id) {
        this.props.history.push(`/palette/${id}`)
    }
    handleDelete() {
        this.props.deletePalette(this.state.paletteToDelete)
        this.closeDeleteDialog()
    }
    render() {
        const { palettes, classes } = this.props
        const { isDeleteDialogOpen } = this.state
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">New Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map((palette) => (
                                <CSSTransition key={palette.id} classNames='fade' timeout={5000}>
                                    <MiniPalette
                                        key={palette.id}
                                        id={palette.id}
                                        {...palette}
                                        goToPalette={this.goToPalette}
                                        handleDelete={this.openDeleteDialog}
                                    />
                                </CSSTransition>
                            ))}
                    </TransitionGroup>
                </div>
                <Dialog open={isDeleteDialogOpen} onClose={this.closeDeleteDialog} aria-labelledby="delete-dialog-title">
                    <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}                                >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel"/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);
