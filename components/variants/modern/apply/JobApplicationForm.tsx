'use client';

import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useState } from 'react';
import { Upload, X, ArrowRight } from 'lucide-react';

type FormField = {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  maxSize?: number;
  rows?: number;
};

type JobApplicationFormProps = {
  formFields: FormField[];
  formTitle: string;
  successMessage: string;
  locationId: string;
};

export default function JobApplicationForm({
  locationId,
  formFields,
  formTitle,
  successMessage
}: JobApplicationFormProps) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Find the file field configuration
      const fileField = formFields.find(f => f.type === 'file');
      
      // Validate file type
      if (fileField?.accept) {
        const acceptedTypes = fileField.accept.split(',').map(t => t.trim());
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        
        if (!acceptedTypes.includes(fileExtension)) {
          toast.error("Invalid File Type", {
            description: `Please upload a file with one of these extensions: ${fileField.accept}`,
          });
          return;
        }
      }
      
      // Validate file size
      const maxSize = fileField?.maxSize || 5242880; // Default 5MB
      if (file.size > maxSize) {
        const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
        toast.error("File Too Large", {
          description: `Please upload a file smaller than ${maxSizeMB}MB.`,
        });
        return;
      }
      
      setResumeFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if resume field exists and is required
    const resumeField = formFields.find(f => f.type === 'file');
    if (resumeField?.required && !resumeFile) {
      toast.error("Resume Required", {
        description: "Please upload your resume to continue.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let filePath = null;
      
      // Upload resume if provided
      if (resumeFile) {
        const fileExt = resumeFile.name.split('.').pop();
        
        // Try to construct a name from any field containing "name"
        let userName = '';
        
        // Look for common name field patterns
        if (formData.name) {
          userName = formData.name;
        } else if (formData.firstName || formData.lastName) {
          userName = `${formData.firstName || ''}${formData.lastName || ''}`.trim();
        } else {
          // Search for any field with "name" in the key (case-insensitive)
          const nameFields = Object.keys(formData).filter(key => 
            key.toLowerCase().includes('name')
          );
          
          if (nameFields.length > 0) {
            // Combine all name fields
            userName = nameFields.map(key => formData[key]).filter(Boolean).join('');
          }
        }
        
        // Create filename: UserName_timestamp.ext (remove spaces and special chars from name)
        const sanitizedName = userName 
          ? userName.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
          : 'Application';
        const fileName = `${sanitizedName}_${Date.now()}.${fileExt}`;
        filePath = `${clientId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('job-applications')
          .upload(filePath, resumeFile);

        if (uploadError) {
          console.error('File upload error:', uploadError);
          toast.error("Upload Error", {
            description: "There was an error uploading your resume. Please try again.",
          });
          setIsSubmitting(false);
          return;
        }
      }
      // Prepare data for insertion using new JSONB structure
      const applicationData: Record<string, any> = {
        client_id: clientId,  // UUID
        form_data: formData,  // All form fields as JSONB
        submitted_at: new Date().toISOString(),
        location_id: locationId
      };

      // Add resume path if file was uploaded
      if (filePath) {
        applicationData.resume_path = filePath;
      }

      // Insert application data into database
      const { error: dbError } = await supabase
        .from('job_applications')
        .insert([applicationData]);

      if (dbError) {
        console.error('Database insert error:', dbError);
        toast.error("Error", {
          description: "There was an error submitting your application. Please try again later.",
        });
      } else {
        toast.success("Application Submitted!", {
          description: successMessage,
        });
        // Reset form
        setFormData({});
        setResumeFile(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error("Error", {
        description: "Unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const commonClasses = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white";
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
        return (
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            className={commonClasses}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.id}
            name={field.id}
            rows={field.rows || 5}
            value={formData[field.id] || ''}
            onChange={handleChange}
            className={`${commonClasses} resize-none`}
            placeholder={field.placeholder}
            required={field.required}
          ></textarea>
        );
      
      case 'select':
        return (
          <select
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            className={commonClasses}
            required={field.required}
          >
            {field.options?.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'file':
        return (
          <div className="mt-2">
            {!resumeFile ? (
              <label
                htmlFor={field.id}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-modern-primary-5 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-modern-primary flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <p className="mb-2 text-sm text-theme-body font-semibold">
                    <span>Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-theme-body">
                    {field.accept ? field.accept.toUpperCase() : 'All files'} 
                    {field.maxSize ? ` (MAX. ${(field.maxSize / 1024 / 1024).toFixed(0)}MB)` : ''}
                  </p>
                </div>
                <input
                  id={field.id}
                  type="file"
                  className="hidden"
                  accept={field.accept}
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl bg-white">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-modern-primary flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {resumeFile.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-theme-text">{resumeFile.name}</p>
                    <p className="text-xs text-theme-body">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Group fields by layout (2-column for short fields, full-width for others)
  const shouldBeFullWidth = (field: FormField) => {
    return field.type === 'textarea' || field.type === 'file' || field.id === 'linkedin_url' || field.id === 'cover_letter';
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-modern-primary-5 to-transparent rounded-bl-full"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-theme-text mb-2">{formTitle}</h2>
        <div className="h-1 w-16 rounded mb-8 bg-gradient-modern-primary-secondary"></div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => {
              const isFullWidth = shouldBeFullWidth(field);
              
              return (
                <div key={field.id} className={isFullWidth ? "md:col-span-2" : ""}>
                  <label htmlFor={field.id} className="block text-theme-body font-semibold mb-2">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="flex justify-start pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-2 font-bold py-4 px-8 rounded-full transition-all bg-gradient-modern-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  Submit Application
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
