import React from 'react';
import { render } from '@testing-library/react';
import { rootExtension, RootExtensionBluePrint } from './Root';
import { ExtensionDataValue } from './ExtensionDataRef';
import { describe, test, expect } from 'vitest'

describe('RootExtension', () => {
  test('renders "No Extensions attached" when no extensions are provided', () => {

    const result = rootExtension.evaluate() as ExtensionDataValue<React.FC>[];
    const App = result[0].data;

    const { container } = render(<App/>);

    expect(container.textContent).toContain(' No extensions attached');
  });

  test('root extension blueprint', () => {

    const root = RootExtensionBluePrint.make();
    const result = root.evaluate() as ExtensionDataValue<React.FC>[];

    const App = result[0].data as React.FC;

    const { container } = render(<App/>);

    expect(container.textContent).toContain(' No extensions attached.');
  });

});

