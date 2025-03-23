const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 mb-4">
      <h1 className="text-2xl text-center font-bold my-4">Privacy Policy</h1>
      <p>
        {`Thank you for using Qubicweb ("we," "us," or "our").`} Your privacy is
        important to us, and we are committed to protecting your personal
        information in compliance with applicable data protection laws,
        including the NDPR and GDPR.
      </p>
      <p>
        If you have any questions or concerns about this notice or your data,
        please contact us at{" "}
        <a href="mailto:privacy@qubicbox.com" className="text-blue-600">
          privacy@qubicbox.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <h3 className="font-medium mt-2">
        a. Information You Provide Voluntarily
      </h3>
      <ul className="list-disc ml-6">
        <li>
          Name and email address (e.g., when contacting us or subscribing to
          updates).
        </li>
        <li>Any additional details you choose to share with us directly.</li>
      </ul>
      <h3 className="font-medium mt-2">
        b. Information Collected Automatically
      </h3>
      <ul className="list-disc ml-6">
        <li>IP address, browser type, operating system, and usage data.</li>
        <li>
          Details about how you interact with our website, such as pages
          visited, links clicked, and referring URLs.
        </li>
        <li>
          Cookies and similar technologies for analytics and functionality.
        </li>
      </ul>
      <p>
        We do not knowingly collect data from individuals under the age of 18.
        If you believe we have inadvertently collected such data, please contact
        us for its removal.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc ml-6">
        <li>
          To provide and improve our services, including user experience
          enhancements.
        </li>
        <li>
          To communicate updates, respond to inquiries, or provide customer
          support.
        </li>
        <li>To analyze website performance and monitor usage patterns.</li>
        <li>To comply with legal obligations and enforce our terms.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">3. Sharing of Your Data</h2>
      <p>
        We do not sell your personal data. Your information may be shared only
        in the following circumstances:
      </p>
      <ul className="list-disc ml-6">
        <li>
          <strong>Service Providers:</strong> With trusted third-party vendors
          (e.g., hosting, analytics) who process data on our behalf under strict
          confidentiality agreements.
        </li>
        <li>
          <strong>Legal Compliance:</strong> When required to comply with
          applicable laws or protect our rights.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">
        4. Cookies and Tracking Technologies
      </h2>
      <p>
        We use cookies to enhance functionality, analyze traffic, and improve
        services. By continuing to use our website, you consent to the use of
        cookies unless disabled through your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Data Retention</h2>
      <p>
        We retain your personal data only as long as necessary to fulfill the
        purposes outlined in this notice or as required by law. Unnecessary data
        is securely deleted or anonymized.
      </p>

      <h2 className="text-xl font-semibold mt-4">6. Data Security</h2>
      <p>
        We implement appropriate organizational and technical measures to secure
        your information. However, no system is completely secure, and we cannot
        guarantee absolute security against unauthorized access.
      </p>

      <h2 className="text-xl font-semibold mt-4">7. Your Rights</h2>
      <p>You have the following rights under NDPR and GDPR:</p>
      <ul className="list-disc ml-6">
        <li>
          Access and Correction: Request access to your personal data or correct
          inaccuracies.
        </li>
        <li>
          Withdrawal of Consent: Withdraw consent where processing is based on
          your consent.
        </li>
        <li>
          Data Erasure: Request deletion of your data, subject to legal or
          contractual obligations.
        </li>
        <li>
          Restriction and Objection: Restrict or object to certain processing
          activities.
        </li>
        <li>
          Portability: Receive your personal data in a structured,
          machine-readable format.
        </li>
      </ul>
      <p>
        For any requests, contact us at{" "}
        <a href="mailto:privacy@qubicbox.com" className="text-blue-600">
          privacy@qubicbox.com
        </a>
        . We will respond promptly and in accordance with applicable laws.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        8. International Data Transfers
      </h2>
      <p>
        If data is transferred outside your region (e.g., from Nigeria to the
        EU), we ensure it is protected under appropriate safeguards, such as EU
        standard contractual clauses or equivalent frameworks.
      </p>

      <h2 className="text-xl font-semibold mt-4">9. Updates to This Notice</h2>
      <p>
        We may update this Privacy Notice periodically. The latest version will
        always be available on our website, and significant changes will be
        communicated to you where required.
      </p>

      <h2 className="text-xl font-semibold mt-4">10. Contact Us</h2>
      <p>For privacy concerns or inquiries, contact:</p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:privacy@qubicbox.com" className="text-blue-600">
          privacy@qubicbox.com
        </a>
      </p>
      <p>
        If you are in the EU/EEA and believe your data has been processed
        unlawfully, you can file a complaint with your local data protection
        authority. In Nigeria, you may contact the Nigerian Data Protection
        Bureau (NDPB).
      </p>
    </div>
  );
};

export default PrivacyPolicy;
