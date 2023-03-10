import React, {Component} from 'react';
import { CopyToClipboard }  from 'react-copy-to-clipboard'
import { Link } from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import classNames from "classnames";
import styles from "./styles/ColorBoxStyles"

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {isCopied: false}
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState () {
        this.setState({isCopied: true}, () => {
            setTimeout(() => this.setState({isCopied: false}), 1500)
        })
    }
    render() {
        const { classes, background, name, moreUrl, isFullPaletteShown } = this.props
        const { isCopied } = this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={ { background } } className={classes.ColorBox}>
                    <div
                        style={ { background } }
                        className={classNames(classes.copyOverlay, {
                            [classes.showOverlay]: isCopied
                        })}
                    />
                    <div className={classNames(classes.copyMessage, {
                        [classes.showMessage]: isCopied
                    })}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {isFullPaletteShown &&
                        (<Link to={moreUrl} onClick={e => e.stopPropagation}>
                                <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox)
