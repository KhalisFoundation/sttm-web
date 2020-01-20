import React from 'react';
import CrossIcon from './Icons/Times';
import cx from 'classnames';

export default class Banner extends React.PureComponent {

    state = {
        message: '',
        toggleBannerVisibilty: false
    };

    componentDidMount() {
        fetch(`${SYNC_API_URL}messages/web`)
            .then(r => r.json())
            .then(messages =>
                this.setState({
                    message: messages.rows[0].Title,
                    type: messages.rows[0].Type,
                })
            );
    }

    toggleBanner = () => {
        this.setState({
            toggleBannerVisibilty: !this.state.toggleBannerVisibilty
        })
    }

    render() {
        const { toggleBannerVisibilty } = this.state;
        const classNames = cx({
            'banner': true,
            'attention': true,
            'toggled': toggleBannerVisibilty
        });
        return <div className={classNames}>{!toggleBannerVisibilty && this.state.message}
            <button
                type="button"
                className="clear-search-toggle"
                onClick={this.toggleBanner}
            >
                <CrossIcon />
            </button>
        </div>
    }
}
