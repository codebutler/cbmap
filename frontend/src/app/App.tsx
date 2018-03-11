import MapboxClient from 'mapbox';
import Reboot from 'material-ui/Reboot';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './App.css';
import Map from '../feature/map/Map';
import Sidebar from '../feature/sidebar/Sidebar';
import { MAPBOX_TOKEN } from '../shared/constants';
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';
import { componentResized, RootAction } from '../shared/actions';
import { Dispatch } from 'redux';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import About from '../feature/about/About';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';
import jssExtend from 'jss-extend';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import indigo from 'material-ui/colors/indigo';
import deepOrange from 'material-ui/colors/deepOrange';

const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

export interface AppContext {
    mapboxClient: MapboxClient;
}

interface DispatchProps {
    onResize: (width: number, height: number) => void;
}

type Props = DispatchProps;
type PropsWithRoute = Props & RouteComponentProps<{}>;

// Configure JSS
const jss = create({ plugins: [jssExtend(), ...jssPreset().plugins] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
    palette: {
        primary: {...indigo},
        secondary: {...deepOrange}
    }
});

class App extends Component<PropsWithRoute> {

    static childContextTypes = {
        mapboxClient: PropTypes.instanceOf(MapboxClient).isRequired
    };

    constructor(props: PropsWithRoute) {
        super(props);
        this.state = {};
    }

    getChildContext(): AppContext {
        return { mapboxClient };
    }

    render() {
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <div className="App">
                        <Reboot/>
                        <Sidebar/>
                        <Map/>
                        <Route exact={true} path="/about" component={About} />
                        <ReactResizeDetector
                            handleWidth={true}
                            handleHeight={true}
                            onResize={this.props.onResize}
                        />
                    </div>
                </MuiThemeProvider>
            </JssProvider>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
    return {
        onResize: (width: number, height: number) => {
            dispatch(componentResized('app', { width, height }));
        }
    };
};

export default withRouter(connect(
    null,
    mapDispatchToProps
)<PropsWithRoute>(App));
