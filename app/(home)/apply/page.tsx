import React from 'react';
import { Metadata } from 'next';
import CareersSection from '@/components/variants/professional/home/CareersSection';
import JobApplicationForm from '@/components/apply/JobApplicationForm';
import { getClientPrimaryLocation } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Join Our Team',
  description: 'Explore career opportunities and become part of our growing team.',
};

export default async function CareersPage() {
  const primaryLocation = await getClientPrimaryLocation();
  
  // Basic form fields for the application
  const formFields = [
    { id: 'first_name', label: 'First Name', type: 'text', required: true, placeholder: 'Jane' },
    { id: 'last_name', label: 'Last Name', type: 'text', required: true, placeholder: 'Doe' },
    { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'jane@example.com' },
    { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '(555) 555-5555' },
    { id: 'resume', label: 'Resume', type: 'file', required: true, accept: '.pdf,.doc,.docx' },
    { id: 'cover_letter', label: 'Cover Letter', type: 'textarea', rows: 4, placeholder: 'Tell us why you are a good fit...' },
  ];

  return (
    <div className="careers-page pt-8">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
           <h2 className="text-3xl font-heading font-bold mb-6 text-center">Apply Now</h2>
           {primaryLocation ? (
             <JobApplicationForm 
               locationId={primaryLocation.id}
               formFields={formFields}
               formTitle="Job Application"
               successMessage="Thank you for your application! We will be in touch soon."
             />
           ) : (
             <p className="text-center text-red-500">Application system currently unavailable.</p>
           )}
        </div>
      </div>
    </div>
  );
}
