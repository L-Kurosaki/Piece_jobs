export function GET() {
  const privacyPolicy = `
# Privacy Policy for PieceJob

Last updated: ${new Date().toLocaleDateString()}

## Information We Collect

### Personal Information
- Name, email address, and phone number
- Profile photos and job site images
- Location data for job matching
- Payment and banking information

### Usage Data
- App usage patterns and preferences
- Voice interaction data (processed locally)
- Job performance metrics

## How We Use Your Information

- Match you with relevant job opportunities
- Process payments securely
- Provide voice-powered assistance
- Ensure safety and security during jobs
- Improve our services

## Data Security

We implement industry-standard security measures to protect your data:
- Encryption in transit and at rest
- Secure payment processing
- Regular security audits
- Limited access controls

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate information
- Delete your account and data
- Opt out of certain data processing

## Contact Us

For privacy concerns, contact us at privacy@piecejob.com

This policy may be updated periodically. We'll notify you of significant changes.
  `;

  return new Response(privacyPolicy, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}