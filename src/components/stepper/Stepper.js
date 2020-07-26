/**
 * This will serve as the base for all Steppers used
 * app-wide.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProgressDots } from '@atlaskit/progress-indicator';

import Button from '../button';

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class Stepper extends PureComponent {
  static propTypes = {
    progressAppearance: PropTypes.string,
    buttonsAppearance: PropTypes.string,
    defaultSelectedIndex: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  static defaultProps = {
    progressAppearance: 'primary',
    buttonsAppearance: 'subtle',
    defaultSelectedIndex: 0,
  };

  state = {
    selectedIndex: null,
  };

  componentDidMount() {
    this.ensureChildrenAreActualSteps();
  }

  get steps() {
    const { children } = this.props;

    if (children && Array.isArray(children)) {
      return children.filter(Stepper.ensureChildIsAStep);
    }

    return [];
  }

  get noOfSteps() {
    return React.Children.count(this.steps);
  }

  get isLastStep() {
    const { selectedIndex } = this.state;

    return selectedIndex === this.noOfSteps - 1;
  }

  get isFirstStep() {
    const { selectedIndex } = this.state;

    return selectedIndex === 0;
  }

  get progressPaginationValues() {
    return [ ...Array(this.noOfSteps).keys() ]
  }

  /**
   * This is needed to avoid syncing props with state.
   *
   * @returns {null|Stepper.props.defaultSelectedIndex}
   */
  get selectedIndex() {
    const { defaultSelectedIndex } = this.props;
    const { selectedIndex } = this.state;

    return selectedIndex || defaultSelectedIndex;
  }

  static ensureChildIsAStep(child) {
    return child.type === Step;
  }

  ensureChildrenAreActualSteps() {
    const { children } = this.props;

    React.Children.forEach(children, (child) => {
      if (!Stepper.ensureChildIsAStep(child)) {
        console.warn(
          `Stepper child element '${child.type}' ignored: Every direct child of Stepper should be wrapped with Stepper.Step.`
        );
      }
    });
  }

  handlePrev = () => {
    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex - 1,
    }));
  };

  handleNext = () => {
    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex + 1,
    }));
  };

  render() {
    const { buttonsAppearance, progressAppearance } = this.props;

    return (
      <div>
        {this.steps[ this.selectedIndex ]}

        <Footer>
          <Button
            appearance={buttonsAppearance}
            isDisabled={this.isFirstStep}
            onClick={this.handlePrev}
          >
            Prev
          </Button>

          <ProgressDots
            appearance={progressAppearance}
            selectedIndex={this.selectedIndex}
            values={this.progressPaginationValues}
          />

          <Button
            appearance={buttonsAppearance}
            isDisabled={this.isLastStep}
            onClick={this.handleNext}
          >
            Next
          </Button>
        </Footer>
      </div>
    );
  }
}

// This uses regular JS function signature to enable it's hoisting.
function Step({ children, className }) {
  return (
    <div className={className}>{children}</div>
  );
}

// Attach Step to Stepper for better accessibility
Stepper.Step = Step;

export default Stepper;
