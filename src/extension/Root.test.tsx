import React from 'react';
import { render } from '@testing-library/react';
import { rootExtension, rootExtensionBluePrint } from './Root';
import { ExtensionDataValue } from './ExtensionDataRef';


describe('RootExtension', () => {
  test('renders "No Extensions attached" when no extensions are provided', () => {

    const result = rootExtension.evaluate() as ExtensionDataValue<React.ReactNode>[];

    const { container } = render(result[0].data);

    expect(container.textContent).toBe(' No extensions attached');
  });

  test('root extension blueprint', () => {

    const root = rootExtensionBluePrint.make();
    const result = root.evaluate() as ExtensionDataValue<React.ReactNode>[];

    const { container } = render(result[0].data);

    expect(container.textContent).toBe(' No extensions attached');
  });

});

