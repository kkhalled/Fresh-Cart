/* ═══════════════════════════════════════════════════════════════════════════
   Design Tokens - Account Settings
   Professional SaaS-grade design system with navy + teal accents
   ═══════════════════════════════════════════════════════════════════════════ */

export const designTokens = {
  colors: {
    // Primary navy background
    navy: {
      50: '#E8EAF0',
      100: '#C5C9D9',
      200: '#9FA6C0',
      300: '#7882A7',
      400: '#5B6894',
      500: '#3E4E81',
      600: '#384779',
      700: '#303D6E',
      800: '#283464',
      900: '#1B2551',
    },
    // Teal accent
    teal: {
      50: '#E0F7F7',
      100: '#B3EBEB',
      200: '#80DEDE',
      300: '#4DD0D0',
      400: '#26C6C6',
      500: '#00BCBC',
      600: '#00B6B6',
      700: '#00ADAD',
      800: '#00A5A5',
      900: '#009797',
    },
    // Status colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    // Neutrals
    neutral: {
      white: '#FFFFFF',
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

/* ─── Component Specifications ─────────────────────────────────────────── */

export const componentSpecs = {
  input: {
    base: 'w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-base text-neutral-900 placeholder:text-neutral-400 transition-all duration-200',
    focus: 'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500',
    error: 'border-status-error focus:ring-status-error focus:border-status-error',
    disabled: 'bg-neutral-100 text-neutral-500 cursor-not-allowed',
    readonly: 'bg-neutral-50 text-neutral-600 cursor-default',
  },
  label: {
    base: 'block text-sm font-medium text-neutral-700 mb-2',
    required: 'after:content-["*"] after:ml-1 after:text-status-error',
  },
  helperText: {
    base: 'mt-1.5 text-sm text-neutral-500',
    error: 'mt-1.5 text-sm text-status-error',
  },
  button: {
    primary: 'px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 active:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'px-6 py-3 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 active:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'px-4 py-2 text-teal-600 font-medium hover:bg-teal-50 rounded-lg transition-all duration-200',
  },
  card: {
    base: 'bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden',
    header: 'px-6 py-5 border-b border-neutral-200 bg-neutral-50',
    body: 'p-6',
  },
};

/* ─── Accessibility Guidelines ─────────────────────────────────────────── */

export const accessibilityChecklist = [
  '✓ All inputs have associated labels with htmlFor attributes',
  '✓ Focus indicators visible with 2px outline',
  '✓ Color contrast meets WCAG AA (4.5:1 for normal text)',
  '✓ Keyboard navigation supported (Tab, Enter, Escape)',
  '✓ ARIA live regions for toast notifications',
  '✓ ARIA-invalid and aria-describedby for error states',
  '✓ Touch targets minimum 44x44px on mobile',
  '✓ Screen reader announcements for dynamic content',
  '✓ Skip to main content link available',
  '✓ Form validation messages are descriptive',
];

/* ─── Copy Strings ─────────────────────────────────────────────────────── */

export const copyStrings = {
  profile: {
    sectionTitle: 'Profile Information',
    sectionDescription: 'Update your personal details and contact information',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    emailReadonlyHelper: 'Email changes require verification',
    emailEditButton: 'Change Email',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    phoneHelper: 'Optional - Used for account recovery',
    saveButton: 'Save Profile',
    savingButton: 'Saving...',
    successToast: 'Profile updated successfully',
    errorToast: 'Failed to update profile',
  },
  security: {
    sectionTitle: 'Security',
    sectionDescription: 'Manage your password and security settings',
    currentPasswordLabel: 'Current Password',
    currentPasswordPlaceholder: 'Enter your current password',
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Enter a strong password',
    confirmPasswordLabel: 'Confirm New Password',
    confirmPasswordPlaceholder: 'Re-enter your new password',
    changeButton: 'Change Password',
    changingButton: 'Changing...',
    successToast: 'Password changed successfully',
    errorToast: 'Failed to change password',
    strengthWeak: 'Weak',
    strengthFair: 'Fair',
    strengthGood: 'Good',
    strengthStrong: 'Strong',
  },
  emailChange: {
    modalTitle: 'Change Email Address',
    modalDescription: 'Enter your password to verify your identity',
    newEmailLabel: 'New Email Address',
    newEmailPlaceholder: 'new.email@example.com',
    passwordLabel: 'Current Password',
    passwordPlaceholder: 'Enter your password',
    submitButton: 'Send Verification Email',
    cancelButton: 'Cancel',
    pendingMessage: 'Email verification pending',
    pendingHelper: 'Check your inbox to confirm your new email address',
    successToast: 'Verification email sent',
    errorToast: 'Failed to change email',
  },
  validation: {
    nameRequired: 'Name is required',
    nameMinLength: 'Name must be at least 3 characters',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    phoneInvalid: 'Phone number must be 10-15 digits',
    currentPasswordRequired: 'Current password is required',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 6 characters',
    passwordsNotMatch: 'Passwords do not match',
    passwordSameAsCurrent: 'New password must be different',
  },
  passwordRules: [
    'At least 6 characters long',
    'Contains uppercase and lowercase letters',
    'Contains at least one number',
    'Contains at least one special character',
  ],
  unsavedChanges: {
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Are you sure you want to leave?',
    stayButton: 'Stay on Page',
    leaveButton: 'Leave Without Saving',
  },
};
