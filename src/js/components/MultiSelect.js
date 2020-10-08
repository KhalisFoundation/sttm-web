import React from 'react';
import PropTypes from 'prop-types';
import { DownArrowIcon } from '@/components/Icons/CustomIcons';
export class MultiSelect extends React.PureComponent {
  static propTypes = {
    collections: PropTypes.array.isRequired,
    dropdownLabel: PropTypes.string.isRequired,
  };
  constructor() {
    super();
    this.state = {
      collapsed: true,
    }
  }
  componentDidMount = () => {
    document.body.addEventListener('click', (e) => {

      // Checking if current event target occurs on any part of multiselect list.
      if (!this.state.collapsed) {
        const isTargetMultiSelectList = this.wrapper.contains(e.target) || this.listController.contains(e.target)

        if (!isTargetMultiSelectList) {
          this.closeMultiSelectState()
        }
      }
    });
  }
  componentWillUnmount = () => {
    document.body.removeEventListener('click', this.closeMultiSelectState);
  }

  closeMultiSelectState = () => {
    this.setState(() => ({ ...this.state, collapsed: true }));
  }

  toggleCheckBox = (op, action) => () => {
    action(op);
  }

  toggleMultiSelectState = () => {
    this.setState(() => ({ ...this.state, collapsed: !this.state.collapsed }))
  }
  render() {
    const { collapsed } = this.state;
    const { collections, dropdownLabel } = this.props;

    const collectionsMarkup = collections.map(c => {
      const { options, action, label, checked } = c;

      return (
        <ul key={label}>
          <p>{label}</p>
          {options.map(option => (
            <li key={option}>
              <input
                id={`checkbox-${label}-${option}`}
                type="checkbox"
                value={option}
                onChange={() => action(option)}
                checked={checked.includes(option)} />
              <span
                className={`fake-checkbox check-${option}`}
                onClick={this.toggleCheckBox(option, action)} >
              </span>
              <label
                htmlFor={`checkbox-${label}-${option}`}> {option} </label>
            </li>
          ))}
        </ul>
      )
    });

    return (
      <>
        <span
          ref={(el) => this.listController = el}
          onClick={this.toggleMultiSelectState}>
          {dropdownLabel} <DownArrowIcon />
        </span>
        <div
          ref={(el) => this.wrapper = el}
          className={`${collapsed ? 'collapsed' : 'expanded'} list-wrapper`}>
          {collectionsMarkup}
        </div>
      </>
    )
  }
}
