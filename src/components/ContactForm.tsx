import { useState, type FormEvent } from 'react';

/**
 * Contact form using FormSubmit.co (free, unlimited submissions).
 * Emails are sent to contact@lenoxsl.com.
 *
 * NOTE: The first time a submission is made, FormSubmit will send a
 * confirmation/activation email to contact@lenoxsl.com. You must click
 * the link in that email to activate the form. After that, all
 * submissions go straight through.
 */
const FORM_EMAIL = 'contact@lenoxsl.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${FORM_EMAIL}`;

const industries = [
  'Childcare Centers',
  'Skilled Nursing Facilities',
  'Assisted Living Communities',
  'Senior Living Facilities',
  'ABA Companies',
  'Junk Removal',
  'Plumbing & Trades',
  'Other Service Business',
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          industry: formData.get('industry'),
          message: formData.get('message'),
          _subject: `New Consultation Request from ${formData.get('name')} - ${formData.get('company')}`,
          _template: 'table',
        }),
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch {
      setError(
        'Something went wrong. Please try again or email us directly at contact@TheERFG.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-accent mb-2.5 font-serif">Thank You!</h3>
        <p className="text-white/60">
          We'll reach out within 24 business hours to schedule a time that works
          for you.
        </p>
      </div>
    );
  }

  const inputClasses =
    'w-full px-4 py-3 border-[1.5px] border-white/15 rounded-lg text-[0.95rem] text-white bg-[#2a2a2a] transition-all duration-200 focus:outline-none focus:border-accent focus:bg-[#333333] focus:ring-[3px] focus:ring-accent/10 placeholder:text-white/30';

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-7 font-serif">
        Schedule Your Consultation
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Honeypot for spam protection */}
        <input type="text" name="_honey" style={{ display: 'none' }} />
        {/* Disable captcha for AJAX submissions */}
        <input type="hidden" name="_captcha" value="false" />

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-white/70 mb-1.5"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className={inputClasses}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white/70 mb-1.5"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-white/70 mb-1.5"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            placeholder="Your company name"
            className={inputClasses}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="industry"
            className="block text-sm font-semibold text-white/70 mb-1.5"
          >
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            required
            defaultValue=""
            className={inputClasses}
          >
            <option value="" disabled>
              Select your industry
            </option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-white/70 mb-1.5"
          >
            Tell Us About Your Business
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="What challenges are you facing with your financial operations?"
            className={`${inputClasses} resize-y min-h-[110px]`}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 mt-2 bg-accent text-white rounded-lg font-semibold text-base border-2 border-accent hover:bg-accent-hover hover:border-accent-hover hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(200,117,51,0.35)] transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
        >
          {isSubmitting ? 'Sending...' : 'Schedule Your Consultation'}
        </button>
      </form>
    </div>
  );
}
