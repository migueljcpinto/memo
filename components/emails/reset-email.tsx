import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';

interface PasswordResetEmailProps {
    userName: string;
    resetUrl: string;
}

const PasswordResetEmail = ({ userName, resetUrl }: PasswordResetEmailProps) => {

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>Reset your password - secure link expires in 1 hour</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] mx-auto p-[40px] max-w-[600px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                                Reset Your Password
                            </Heading>
                            <Text className="text-[16px] text-gray-600 m-0">
                                Secure password reset for your account
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                                Hello {userName},
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                                We received a request to reset the password for your account associated with {userName}.
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                                Click the button below to create a new password. This link will expire in 1 hour for your security.
                            </Text>
                        </Section>

                        {/* Reset Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={resetUrl}
                                className="bg-red-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-medium no-underline box-border inline-block"
                            >
                                Reset Password
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section className="mb-[32px]">
                            <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                                If the button doesn&#39;t work, copy and paste this link into your browser:
                            </Text>
                            <Link
                                href={resetUrl}
                                className="text-[14px] text-blue-600 underline break-all"
                            >
                                {resetUrl}
                            </Link>
                        </Section>

                        {/* Security Notice */}
                        <Section className="bg-yellow-50 border border-solid border-yellow-200 rounded-[8px] p-[20px] mb-[32px]">
                            <Text className="text-[14px] text-yellow-800 leading-[20px] m-0 mb-[12px]">
                                <strong>Security Notice:</strong>
                            </Text>
                            <Text className="text-[14px] text-yellow-800 leading-[20px] m-0 mb-[8px]">
                                • If you didn&#39;t request this password reset, please ignore this email
                            </Text>
                            <Text className="text-[14px] text-yellow-800 leading-[20px] m-0 mb-[8px]">
                                • This link expires in 1 hour and can only be used once
                            </Text>
                            <Text className="text-[14px] text-yellow-800 leading-[20px] m-0">
                                • If you&#39;re concerned about your account security, please contact our support team
                            </Text>
                        </Section>

                        {/* Help Section */}
                        <Section className="border-t border-solid border-gray-200 pt-[24px] mb-[32px]">
                            <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                                <strong>Need help?</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                                If you&#39;re having trouble resetting your password, please contact our support team at{' '}
                                <Link href="mailto:support@yourcompany.com" className="text-blue-600 underline">
                                    support@yourcompany.com
                                </Link>
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-t border-solid border-gray-200 pt-[24px]">
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                                This email was sent to {userName}
                            </Text>
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                                © 2025 Your Company Name. All rights reserved.
                            </Text>
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                                123 Business Street, Munich, DE 80331 | <Link href="#" className="text-gray-500 underline">Unsubscribe</Link>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

PasswordResetEmail.PreviewProps = {
    userEmail: 'migueljcpinto@gmail.com',
    resetUrl: 'https://yourapp.com/reset-password?token=abc123xyz789',
    userName: 'Miguel',
};

export default PasswordResetEmail;