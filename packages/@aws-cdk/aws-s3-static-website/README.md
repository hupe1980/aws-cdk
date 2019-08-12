## StaticWebsite
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> **This is a _developer preview_ (public beta) module. Releases might lack important features and might have
> future breaking changes.**
>
> This API is still under active development and subject to non-backward
> compatible changes or removal in any future version. Use of the API is not recommended in production
> environments. Experimental APIs are not subject to the Semantic Versioning model.

---
<!--END STABILITY BANNER-->

This library creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)

This module is part of the [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) project.

### Getting Started

```typescript
import { App, Stack, StackProps, RemovalPolicy } from '@aws-cdk/core';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { StaticWebsite } from '@ws-cdk/aws-s3-static-website';

export class StaticWebsiteStack extends Stack {
    public constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        const certificateArn = StringParameter.valueFromLookup(
            this,
            '/certificate/example.com',
        );

        new StaticWebsite(this, 'StaticWebsite', {
            bucketConfiguration: {
                removalPolicy: RemovalPolicy.DESTROY,
            },
            aliasConfiguration: {
                domainName: 'example.com',
                names: ['www.example.com', 'example.com'],
                acmCertRef: certificateArn,
            },
        });
    }
}
```

### Lambda@Edge function
```typescript
website.addLambdaFunctionAssociation({
    functionArn: 'arn:aws:lambda:...',
    functionVersion: '1',
    eventType: 'origin-request',
});
```