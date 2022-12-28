import './App.css';
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from './seedColors'
import {generatePalette} from "./colorHelpers";
import {Route,Switch} from "react-router-dom";
import {Component} from "react";
import UniqueColorPalette from "./UniqueColorPalette";
import NewPaletteForm from "./NewPaletteForm";

class App extends Component {
    constructor(props) {
        super(props);
        const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
        this.state = {palettes: savedPalettes || seedColors}
        this.savePalette = this.savePalette.bind(this)
        this.findPalette = this.findPalette.bind(this)
        this.syncLocalStorage = this.syncLocalStorage.bind(this)
        this.deletePalette = this.deletePalette.bind(this)
    }
    deletePalette (id) {
        this.setState(
            state => ({palettes: state.palettes.filter(palette => palette.id !== id)}),
            this.syncLocalStorage
        )
    }
    findPalette (id) {
        return this.state.palettes.find((palette) => {
            return palette.id === id
        })
    }
    savePalette (newPalette) {
        this.setState({palettes: [...this.state.palettes, newPalette]},
            this.syncLocalStorage
        )
    }
    syncLocalStorage () {
        window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
    }
    render () {
        return (
            <Switch>
                <Route
                    exact
                    path="/palette/new"
                    render={(routerProps) => (
                        <NewPaletteForm
                            palettes={this.state.palettes}
                            savePalette={this.savePalette}
                            {...routerProps}
                        />
                    )}>
                </Route>
                <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={(routeProps) =>
                        <UniqueColorPalette
                            colorId={routeProps.match.params.colorId}
                            palette={generatePalette(
                                this.findPalette(routeProps.match.params.paletteId)
                            )}
                        />}>
                </Route>
                <Route
                    exact
                    path="/"
                    render={(routeProps) =>
                        <PaletteList
                            palettes={this.state.palettes}
                            deletePalette={this.deletePalette}
                            {...routeProps}
                        />
                    }>
                </Route>
                <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) =>
                        <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                    }>
                </Route>
            </Switch>
        );
    }
}

export default App;
