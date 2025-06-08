export function GET() {
  const termsOfService = `
# Terms of Service for PieceJob

Last updated: ${new Date().toLocaleDateString()}

## Acceptance of Terms

By using PieceJob, you agree to these terms and conditions.

## Service Description

PieceJob is an AI-powered marketplace connecting customers with service providers for various jobs including cleaning, maintenance, gardening, and more.

## User Responsibilities

### For Customers
- Provide accurate job descriptions
- Pay agreed amounts promptly
- Treat service providers respectfully
- Ensure safe working conditions

### For Service Providers
- Deliver services as promised
- Maintain professional standards
- Complete jobs within agreed timeframes
- Follow safety protocols

## Payment Terms

- Platform commission: 12-18% depending on job category
- Booking fees apply to all transactions
- Payments processed securely through our platform
- Refunds available according to our refund policy

## Safety and Security

- All jobs monitored with safety timers
- Emergency assistance available 24/7
- Background checks required for providers
- Insurance coverage for qualifying jobs

## Prohibited Activities

- Fraudulent or misleading information
- Harassment or inappropriate behavior
- Circumventing platform payments
- Violating local laws or regulations

## Limitation of Liability

PieceJob provides a platform for connecting users but is not responsible for the quality of services or disputes between users.

## Termination

We reserve the right to suspend or terminate accounts that violate these terms.

## Contact Information

For questions about these terms, contact us at legal@piecejob.com

These terms may be updated periodically. Continued use constitutes acceptance of changes.
  `;

  return new Response(termsOfService, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}