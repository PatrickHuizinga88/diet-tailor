<script setup lang="ts">
import {APP_NAME, SUPPORT_EMAIL} from '~/constants'
import {ArrowLeft} from "lucide-vue-next";

const lastUpdated = '30-03-2025'
</script>

<template>
  <div class="container max-w-3xl mx-auto">
    <Button @click="$router.back()" variant="ghost" size="sm" class="-ml-4 mb-6">
      <ArrowLeft/>
      Go back
    </Button>
    <h1 class="text-4xl mb-4">{{ APP_NAME }} Privacy Policy</h1>
    <p><strong>Last Updated: {{ lastUpdated }}</strong></p>
    <p>
      Welcome to {{ APP_NAME }}. This Privacy Policy explains how we collect, use, store, and share your information when you
      use our personalized nutrition planning platform (the "Service"). By using {{ APP_NAME }}, you agree to the
      collection and use of your data in accordance with this policy.
    </p>
    <hr/>
    <h2 class="text-3xl mt-6 mb-2">1. Data Collection</h2>
    <p>We collect the following types of information from our users:</p>
    <ul>
      <li><strong>Personal Information:</strong> Name, email address, and other contact details.</li>
      <li><strong>Payment Information:</strong> Processed securely via Stripe, including email and payment details.</li>
      <li><strong>Dietary & Personal Data:</strong> Information provided to create personalized meal plans, such as
        dietary preferences and other personal details.
      </li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">2. Cookies & Tracking</h2>
    <p>
      We use cookies and similar tracking technologies to enhance your experience on {{ APP_NAME }}. These tools help us
      understand user interactions and improve our service. By signing up to our platform, you consent to the use of
      cookies as described in this policy.
    </p>
    <h2 class="text-3xl mt-6 mb-2">3. Data Storage & Retention</h2>
    <ul>
      <li><strong>Storage Location:</strong> Your data is stored within the European Union (EU).</li>
      <li><strong>Retention Period:</strong> We retain your information until you delete your account. Once your account
        is deleted, your data will be removed from our systems in accordance with applicable laws and regulations.
      </li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">4. Data Sharing & Third Parties</h2>
    <p>
      We share certain data with third-party service providers to facilitate our service, including:
    </p>
    <ul>
      <li><strong>Stripe:</strong> For processing payments, where your email and payment information are shared.</li>
    </ul>
    <p>We ensure that these third parties adhere to strict data protection standards.</p>
    <h2 class="text-3xl mt-6 mb-2">5. User Rights (GDPR Compliance)</h2>
    <p>
      As a user of {{ APP_NAME }}, you have the following rights regarding your personal data:
    </p>
    <ul>
      <li><strong>Access:</strong> You can request a copy of your data by contacting us.</li>
      <li><strong>Correction:</strong> You can edit portions of your data through your account settings.</li>
      <li><strong>Deletion:</strong> You can delete your data by deleting your account.</li>
      <li>
        <strong>Exercising Your Rights:</strong> To exercise any of these rights, please contact us via our support email.
      </li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">6. Contact Information</h2>
    <p>
      If you have any questions, concerns, or requests regarding your personal data or this Privacy Policy, please reach
      out to us at
      <a :href="`mailto:${SUPPORT_EMAIL}`">{{ SUPPORT_EMAIL }}</a>.
    </p>
    <h2 class="text-3xl mt-6 mb-2">7. Changes to This Privacy Policy</h2>
    <p>
      We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last
      Updated" date. Continued use of our Service constitutes acceptance of the updated Privacy Policy.
    </p>
    <hr/>
    <p>Thank you for trusting {{ APP_NAME }} with your personal information!</p>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 1rem;
}
ul {
  list-style: disc;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
li {
  margin-bottom: 0.5rem;
}
hr {
  margin: 2rem 0;
}
a {
  color: hsl(var(--primary));
  text-decoration: underline;
}
</style>