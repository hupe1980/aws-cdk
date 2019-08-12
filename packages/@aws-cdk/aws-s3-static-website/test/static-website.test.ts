import { Stack } from '@aws-cdk/core';
import '@cloudcomponents/jest-cdk-snapshot';
import { StaticWebsite } from '../lib';

test('default setup', () => {
  const stack = new Stack();

  new StaticWebsite(stack, 'StaticWebsite');

  expect(stack).toMatchCdkSnapshot();
});

test('lambda@edge', () => {
  const stack = new Stack();

  const staticWebsite = new StaticWebsite(stack, 'StaticWebsite');

  staticWebsite.addLambdaFunctionAssociation({
    functionArn: 'arn:aws:lambda:us-east-1:123456789012:function:my-function',
    functionVersion: '1',
    eventType: 'origin-request'
  });

  expect(stack).toMatchCdkSnapshot();
});
