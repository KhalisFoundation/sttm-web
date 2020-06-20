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
      // console.log('this.wrapper', this.wrapper, this.listController)
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
          {options.map(op => (
            <li key={op}>
              <input
                id={`checkbox-${label}-${op}`}
                type="checkbox"
                value={op}
                onChange={() => action(op)}
                checked={checked.includes(op)} />
              <span
                className="fake-checkbox"
                onClick={this.toggleCheckBox(op, action)} >
              </span>
              <label
                htmlFor={`checkbox-${label}-${op}`}> {op} </label>
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
