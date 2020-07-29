/**
 * This will serve as the base for all Steppers used
 * app-wide.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProgressDots } from '@atlaskit/progress-indicator';

import { isFunction } from '../../util';

import Button from '../button';

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem; // TODO: Make this controllable
`;

export default class Stepper extends PureComponent {
  static propTypes = {
    destroyNonVisibleStep: PropTypes.bool,
    progressAppearance: PropTypes.string,
    progressSize: PropTypes.string,
    buttonsAppearance: PropTypes.string,
    defaultSelectedIndex: PropTypes.number,
    onNext: PropTypes.func,
    canStep: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  static defaultProps = {
    destroyNonVisibleStep: true,
    progressAppearance: 'primary',
    progressSize: 'small',
    defaultSelectedIndex: 0,
  };

  static Step = (props) => (
    <div {...props} />
  );

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

  get content() {
    const { destroyNonVisibleStep } = this.props;

    if (!destroyNonVisibleStep) {
      return React.Children.map(this.steps, (stepElement, stepElementIndex) => {
        if (this.selectedIndex !== stepElementIndex) {
          return React.cloneElement(stepElement, {
            style: {
              display: 'none',
            }
          });
        }

        return stepElement;
      });
    }

    return this.steps[ this.selectedIndex ];
  }

  static ensureChildIsAStep(child) {
    return child.type === Stepper.Step;
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

  handleNext = async (e) => {
    const { canStep, onNext } = this.props;

    if (isFunction(canStep) && !await canStep(e)) {
      return;
    }

    if (isFunction(onNext)) {
      onNext(e);
    }

    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex + 1,
    }));
  };

  render() {
    const { buttonsAppearance, progressAppearance, progressSize } = this.props;

    return (
      <div>
        {this.content}

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
            size={progressSize}
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
