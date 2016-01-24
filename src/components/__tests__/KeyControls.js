jest.dontMock('../KeyControls');
jest.dontMock('../Navigator');
jest.dontMock('marked');

import React           from 'react';
import ReactDOM        from 'react-dom';
import TestUtils       from 'react-addons-test-utils';

const createNavigator = require('../Navigator').default;
const KeyControls     = require('../KeyControls').default;

describe('KeyControls', () => {
  let controls, node, navigator, mappings;

  mappings = {
    'left':  37,
    'up':    38,
    'right': 39,
    'down':  40
  };

  navigator = createNavigator();

  beforeEach( () => {
    navigator = createNavigator();
    navigator.setPossibleMoves([]);
    navigator.move = jest.genMockFunction();

    controls = TestUtils.renderIntoDocument( (
      <KeyControls
        navigator={navigator}
      >
      </KeyControls>));

    node = ReactDOM.findDOMNode(controls);
  });

  let simulateKeyUp = (key) => {
    let event = new KeyboardEvent('keyup', {'keyCode': key});
    document.dispatchEvent(event);
  };

  Object.keys(mappings).forEach( (direction) => {
    let key = mappings[direction];
    it(`calls navigate(${direction}) when pressing ${direction}-arrow-key (${key})`, () => {
      simulateKeyUp(key);
      expect(navigator.move).toBeCalledWith(direction);
    });
  });

  it(`does not react to non-mapped keyUps`, () => {
    simulateKeyUp(65);
    expect(navigator.move).not.toBeCalled();
  });


});
