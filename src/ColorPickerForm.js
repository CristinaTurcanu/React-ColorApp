import React, {Component} from 'react';
import {ChromePicker} from "react-color";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import styles from './styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newColorName: "",
            currentColor: "teal"
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        })
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return this.props.colors.every(
                ({color}) => color !== this.state.currentColor
            )
        })
    }
    updateCurrentColor (color) {
        this.setState({ currentColor: color.hex });
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    handleSubmit () {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({newColorName: ""})
    }

    render() {
        const { paletteIsFull, classes } = this.props
        const { newColorName, currentColor } = this.state
        return (
            <div>
                <ChromePicker
                    className={classes.picker}
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
                    <TextValidator
                        className={classes.colorNameInput}
                        value={newColorName}
                        variant="filled"
                        onChange={this.handleChange}
                        margin="normal"
                        name="newColorName"
                        placeholder="Color Name"
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["This field is required", "Color name must be unique", "Color already used"]}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}
                    >
                        {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);
