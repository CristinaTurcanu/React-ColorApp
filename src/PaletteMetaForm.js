import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Picker from '@emoji-mart/react'


class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: "name",
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.showEmojiPicker = this.showEmojiPicker.bind(this)
        this.savePalette = this.savePalette.bind(this)
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        })
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    showEmojiPicker () {
        this.setState({stage: "emoji"})
    }

    savePalette (emoji) {
        this.props.handleSubmit({
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        })
    }

    render() {
        const { newPaletteName } = this.state
        const { hideForm } = this.props
        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
                    <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
                    <Picker title="Pick a Palette Emoji" onEmojiSelect={this.savePalette} />
                </Dialog>
                <Dialog open={this.state.stage === 'name'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for the palette. Make sure it is unique.
                            </DialogContentText>
                                <TextValidator
                                    label="Palette Name"
                                    name="newPaletteName"
                                    value={newPaletteName}
                                    onChange={this.handleChange}
                                    fullWidth
                                    margin="normal"
                                    validators={["required", "isPaletteNameUnique"]}
                                    errorMessages={["Enter Palette Name"]}
                                />
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={hideForm} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type="submit"
                                >
                                    Save Palette
                                </Button>
                            </DialogActions>
                        </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;
