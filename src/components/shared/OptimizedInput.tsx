'use client';

import { memo, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { commonClasses } from '@/lib/styles';

interface BaseInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const OptimizedInput = memo<InputProps>(({ 
  label, 
  error, 
  required, 
  className = '',
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-900 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <input
        className={`${commonClasses.input} ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export const OptimizedTextarea = memo<TextareaProps>(({ 
  label, 
  error, 
  required, 
  className = '',
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-900 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <textarea
        className={`${commonClasses.input} resize-vertical ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export const OptimizedSelect = memo<SelectProps>(({ 
  label, 
  error, 
  required, 
  options, 
  placeholder, 
  className = '',
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-900 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <select
        className={`${commonClasses.input} ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

OptimizedInput.displayName = 'OptimizedInput';
OptimizedTextarea.displayName = 'OptimizedTextarea';
OptimizedSelect.displayName = 'OptimizedSelect';

