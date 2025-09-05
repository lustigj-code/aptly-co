import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Aptly',
  description: 'Learn how Aptly collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0C2A] text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-gray-300 mb-6">
          Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Learning progress and quiz responses</li>
              <li>Communication preferences</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your learning experience</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent or illegal activities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We do not sell, trade, or rent your personal information. We may share your information 
              in the following situations:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>With your consent or at your direction</li>
              <li>To comply with legal obligations</li>
              <li>To protect rights, privacy, safety, or property</li>
              <li>In connection with a merger, sale, or acquisition</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the internet is 100% secure, and we cannot guarantee 
              absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-300">
              We use cookies and similar tracking technologies to track activity on our service and 
              hold certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Children&apos;s Privacy</h2>
            <p className="text-gray-300">
              Our service is not directed to individuals under the age of 13. We do not knowingly 
              collect personal information from children under 13. If you become aware that a child 
              has provided us with personal information, please contact us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the &quot;Effective Date&quot; above.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-300 mt-2">
              Email: privacy@aptly.co<br />
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