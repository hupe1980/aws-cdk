import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';
import '@cloudcomponents/jest-cdk-snapshot';
import { LambdaFunctionAssociations } from '../lib';

test('default setup', () => {
  const stack = new Stack();

  const distribution = new CloudFrontWebDistribution(
    stack,
    'WebSiteDistribution',
    {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: new Bucket(stack, 'DummyWebsiteBucket')
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ]
    }
  );

  new LambdaFunctionAssociations(stack, 'LambdaFunctionAssociations', {
    distribution,
    assosiations: [
      {
        functionArn:
          'arn:aws:lambda:us-east-1:123456789012:function:my-function',
        functionVersion: '1',
        eventType: 'origin-request'
      }
    ]
  });

  expect(stack).toMatchCdkSnapshot();
});
