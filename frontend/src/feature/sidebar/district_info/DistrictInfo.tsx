import { WithStyles } from 'material-ui';
import CloseIcon from 'material-ui-icons/Close';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import { Theme } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import Tabs, { Tab } from 'material-ui/Tabs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DISTRICTS from '../../../shared/data/districts-info.json';
import District from '../../../shared/models/District';
import { RootState } from '../../../shared/models/RootState';
import SwipeableViews from 'react-swipeable-views';
import districtIdFromRoute from '../../../shared/selectors/district-id-from-route';
import ContactTab from './ContactTab';
import CalendarTab from './calendar/CalendarTab';
import LeadershipTab from './LeadershipTab';

interface OwnProps {
    onCloseInfoClicked: () => void;
}

interface StateProps {
    district: District;
}

type ClassKey =
    | 'card'
    | 'cardHeader'
    | 'cardContent'
    | 'title'
    | 'tab';

type Props = OwnProps & StateProps;
type PropsWithStyles = Props & WithStyles<ClassKey>;

interface State {
    selectedTab: number;
}

const SHOW_LEADERSHIP = false; // This feature isn't quite ready

class DistrictInfo extends Component<PropsWithStyles, State> {

    constructor(props: PropsWithStyles) {
        super(props);
        this.state = { selectedTab: 0 };
    }

    render() {
        const { classes, district } = this.props;
        if (district) {
            return (
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHeader}
                        action={(
                            <IconButton onClick={this.props.onCloseInfoClicked}>
                                <CloseIcon/>
                            </IconButton>
                        )}
                        title={`${district.borough} CB${district.number}`}
                        subheader={district.neighborhoods}
                    />
                    <CardContent className={classes.cardContent}>
                        <Tabs
                            value={this.state.selectedTab}
                            onChange={(event, value) => this.setState({ selectedTab: value })}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth={true}
                        >
                            <Tab classes={{root: classes.tab}} label="Contact" />
                            {SHOW_LEADERSHIP && <Tab classes={{root: classes.tab}} label="Leadership"/>}
                            <Tab classes={{root: classes.tab}} label="Meetings" />
                        </Tabs>
                        {SHOW_LEADERSHIP ? (
                            <SwipeableViews
                                animateHeight={true}
                                index={this.state.selectedTab}
                                onChangeIndex={(index) => { this.setState({selectedTab: index}); }}
                            >
                                <ContactTab district={district}/>
                                <LeadershipTab district={district}/>
                                <CalendarTab district={district}/>
                            </SwipeableViews>
                        ) : (
                            <SwipeableViews
                                animateHeight={true}
                                index={this.state.selectedTab}
                                onChangeIndex={(index) => { this.setState({selectedTab: index}); }}
                            >
                                <ContactTab district={district}/>
                                <CalendarTab district={district}/>
                            </SwipeableViews>
                        )}
                    </CardContent>
                </Card>
            );
        } else {
            return (
                <Card className={classes.card}>
                    <CardHeader
                        action={(
                            <IconButton onClick={this.props.onCloseInfoClicked}>
                                <CloseIcon/>
                            </IconButton>
                        )}
                        title="No Community Board"
                    />
                </Card>
            );
        }
    }
}

const styles = (theme: Theme) => (
    {
        card: {
            marginBottom: theme.spacing.unit
        },
        cardHeader: {
            paddingBottom: 0,
        },
        cardContent: {
            padding: 0,
            '&:last-child': {
                paddingBottom: theme.spacing.unit
            }
        },
        title: {
            marginBottom: 16,
            fontSize: 14,
            color: theme.palette.text.secondary
        },
        tab: {
            [theme.breakpoints.up('md')]: {
                minWidth: 'inherit',
            },
        }
    }
);

const mapStateToProps = (state: RootState): StateProps => {
    const selectedDistrictId = districtIdFromRoute(state)!;
    return {
        district: DISTRICTS[selectedDistrictId]
    };
};

export default connect(
    mapStateToProps
)(withStyles(styles)<Props>(DistrictInfo));
