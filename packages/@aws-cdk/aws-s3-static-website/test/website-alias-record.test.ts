import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';
import { HostedZone } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { Bucket } from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';
import '@cloudcomponents/jest-cdk-snapshot';
import { WebsiteAliasRecord } from '../lib';

test('default setup', (): void => {
  const stack = new Stack();

  jest.spyOn(HostedZone, 'fromLookup').mockImplementation(
    () =>
      new HostedZone(stack, 'HostedZone', {
        zoneName: 'example.com'
      })
  );

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

  new WebsiteAliasRecord(stack, 'WebsiteAliasRecord', {
    domainName: 'example.com',
    recordNames: ['www.example.com', 'example.com'],
    target: new CloudFrontTarget(distribution)
  });

  expect(stack).toMatchCdkSnapshot();
});
