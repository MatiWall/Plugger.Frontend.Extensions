import React from 'react';
import { render } from '@testing-library/react';
import { rootExtension } from './Root';
import { ExtensionDataValue } from './ExtensionDataRef';


describe('RootExtension', () => {
  test('renders "No Extensions attached" when no extensions are provided', () => {

    const result = rootExtension.evaluate() as ExtensionDataValue<React.ReactNode>[];


    const { container } = render(result[0].data);

    expect(container.textContent).toBe(' No Extensions attached');
  });
});

