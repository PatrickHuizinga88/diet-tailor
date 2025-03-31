<script setup lang="ts">
import {APP_NAME, SUPPORT_EMAIL} from '~/constants'

const lastUpdated = '28-03-2025'
</script>

<template>
  <div class="container max-w-3xl mx-auto">
    <h1 class="text-4xl mb-4">{{ APP_NAME }} Terms of Service</h1>
    <p><strong>Last Updated: {{lastUpdated}}</strong></p>
    <p>
      Welcome to {{ APP_NAME }}! These Terms of Service ("Terms") govern your access to and use of {{ APP_NAME }} ("Service"),
      operated by Patrick Huizinga ("we," "us," "our"). By using {{ APP_NAME }}, you agree to
      these Terms. If you do not agree, please do not use the Service.
    </p>
    <hr/>
    <h2 class="text-3xl mt-6 mb-2">1. Introduction</h2>
    <p>
      {{ APP_NAME }} is a personalized nutrition planning platform that helps users create meal plans based on their dietary
      preferences and goals. The Service is available worldwide and can be accessed by all ages. Some features require
      account registration.
    </p>
    <h2 class="text-3xl mt-6 mb-2">2. User Accounts & Eligibility</h2>
    <ul>
      <li>You must provide accurate and complete information when creating an account.</li>
      <li>You are responsible for maintaining the security of your account.</li>
      <li>We reserve the right to suspend or terminate accounts for violations of these Terms.</li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">3. Services & Subscriptions</h2>
    <p>{{ APP_NAME }} offers both free and paid subscription plans.</p>
    <ul>
      <li><strong>Free Plan</strong>: Limited access to features.</li>
      <li><strong>Paid Plan</strong>: Additional features unlocked through a subscription.</li>
      <li><strong>Payment & Billing</strong>: Payments are processed via Stripe and charged upfront.</li>
      <li><strong>Auto-Renewal</strong>: Subscriptions automatically renew unless canceled.</li>
      <li>
        <strong>Cancellation & Refunds</strong>: Users can cancel through their account page (via Stripe portal). Refunds
        may be issued according to our refund policy.
      </li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">4. User Responsibilities</h2>
    <ul>
      <li>You agree not to misuse the Service.</li>
      <li>You may not upload or share content.</li>
      <li>You agree not to attempt to disrupt the platform, violate laws, or engage in fraudulent activities.</li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">5. Disclaimers & Liability</h2>
    <ul>
      <li><strong>No Medical Advice</strong>: {{ APP_NAME }} does not provide medical or dietary advice. Consult a
        professional before making health-related decisions.
      </li>
      <li><strong>No Guarantees</strong>: We do not guarantee the accuracy or effectiveness of meal plans.</li>
      <li><strong>Limitation of Liability</strong>: We are not responsible for any damages resulting from the use of our
        Service.
      </li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">6. Privacy & Data Handling</h2>
    <p>Your use of {{ APP_NAME }} is subject to our <strong>Privacy Policy</strong>, which explains how we collect and handle
      your data.</p>
    <h2 class="text-3xl mt-6 mb-2">7. Termination & Changes</h2>
    <ul>
      <li>We may suspend or terminate accounts that violate these Terms.</li>
      <li>We may update these Terms from time to time. Continued use of the Service constitutes acceptance of the new
        Terms.
      </li>
    </ul>
    <h2 class="text-3xl mt-6 mb-2">8. Legal Jurisdiction</h2>
    <p>
      These Terms are governed by the laws of <strong>the Netherlands</strong>. Any disputes will be handled under Dutch
      jurisdiction.
    </p>
    <hr/>
    <p>
      If you have any questions, please contact us at
      <a :href="`mailto:${SUPPORT_EMAIL}`">{{ SUPPORT_EMAIL }}</a>.
    </p>
    <p><strong>Thank you for using {{ APP_NAME }}!</strong></p>
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