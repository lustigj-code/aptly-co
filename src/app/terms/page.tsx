import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Aptly',
  description: 'Terms and conditions for using Aptly\'s digital learning platform.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0A0C2A] text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <p className="text-gray-300 mb-6">
          Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing or using Aptly&apos;s services, you agree to be bound by these Terms of 
              Service and our Privacy Policy. If you do not agree to these terms, please do not 
              use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-gray-300">
              Aptly provides digital learning solutions, including AI-powered study tools, 
              interactive flashcards, and certification preparation materials. We reserve the 
              right to modify, suspend, or discontinue any aspect of our services at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-gray-300 mb-4">To use certain features, you may need to create an account. You agree to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update your information if it changes</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="text-gray-300 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Distribute spam or malicious content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt our services or servers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="text-gray-300">
              All content, features, and functionality of our services, including but not limited 
              to text, graphics, logos, and software, are owned by Aptly or our licensors and are 
              protected by intellectual property laws. You may not copy, modify, distribute, or 
              create derivative works without our express written permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. User Content</h2>
            <p className="text-gray-300">
              By submitting content to our services, you grant Aptly a non-exclusive, worldwide, 
              royalty-free license to use, reproduce, modify, and distribute your content in 
              connection with our services. You represent that you have the right to grant this 
              license and that your content does not violate any third-party rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Payment Terms</h2>
            <p className="text-gray-300">
              If you purchase any paid services, you agree to pay all fees and applicable taxes. 
              Payments are non-refundable except as required by law or as explicitly stated in 
              our refund policy. We reserve the right to change our prices at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <p className="text-gray-300">
              OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. 
              WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS 
              FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT OUR 
              SERVICES WILL BE ERROR-FREE OR UNINTERRUPTED.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-300">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, APTLY SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR 
              REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, 
              GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="text-gray-300">
              You agree to indemnify and hold harmless Aptly and its officers, directors, 
              employees, and agents from any claims, damages, losses, liabilities, and expenses 
              arising out of your use of our services or violation of these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="text-gray-300">
              We may terminate or suspend your account and access to our services at any time, 
              without prior notice or liability, for any reason, including breach of these terms. 
              Upon termination, your right to use our services will immediately cease.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p className="text-gray-300">
              These terms shall be governed by and construed in accordance with the laws of 
              [Your Jurisdiction], without regard to its conflict of law provisions. You agree 
              to submit to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="text-gray-300">
              We reserve the right to modify these terms at any time. We will notify you of any 
              material changes by posting the new terms on our website. Your continued use of our 
              services after such modifications constitutes acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-300 mt-2">
              Email: legal@aptly.co<br />
              Address: [Your Company Address]
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <Link 
            href="/" 
            className="text-[#7AB8BD] hover:text-[#6BA3A8] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}