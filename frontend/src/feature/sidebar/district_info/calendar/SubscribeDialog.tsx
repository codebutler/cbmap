import { Component, default as React } from 'react';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { bind } from 'lodash-decorators/bind';
import { DialogContent, DialogContentText, InputAdornment } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import TextField from 'material-ui/TextField';
import SubscribeText from './subscribe-text.html';
import Html from '../../../../shared/components/Html';

interface Props {
    subscribeUrl: string;
    onDialogExited: () => void;
}

interface State {
    isOpen: boolean;
}

class SubscribeDialog extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { isOpen: true };
    }

    render() {
        return (
            <Dialog
                open={this.state.isOpen}
                onClose={this.onDialogClose}
                onExited={this.props.onDialogExited}
            >
                <DialogTitle>Add to Calendar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Html html={SubscribeText} />
                    </DialogContentText>
                    <TextField
                        fullWidth={true}
                        disabled={true}
                        value={this.props.subscribeUrl}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.onDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>
        );
    }

    @bind()
    private onDialogClose() {
        this.setState({ isOpen: false });
    }
}

export default SubscribeDialog;
