import { Stack } from '@aws-cdk/core';
import '@cloudcomponents/jest-cdk-snapshot';
import { WebsiteBucket } from '../lib';

test('default setup', (): void => {
    const stack = new Stack();

    new WebsiteBucket(stack, 'WebsiteBucket');

    expect(stack).toMatchCdkSnapshot();
});
