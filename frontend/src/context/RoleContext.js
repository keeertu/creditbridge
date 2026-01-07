import React, { createContext, useContext, useState } from 'react';

/**
 * Role Context for CreditBridge Demo
 * 
 * This is a DEMO-ONLY role toggle mechanism.
 * It allows switching between "lender" and "applicant" views
 * to demonstrate different information visibility.
 * 
 * NOT for production use - no real authentication.
 */

const RoleContext = createContext(undefined);

// Available roles for the demo
export const ROLES = {
  APPLICANT: 'applicant',
  LENDER: 'lender'
};

export const RoleProvider = ({ children }) => {
  // Default to applicant view
  const [role, setRole] = useState(ROLES.APPLICANT);

  const isLender = role === ROLES.LENDER;
  const isApplicant = role === ROLES.APPLICANT;

  const toggleRole = () => {
    setRole(prev => prev === ROLES.LENDER ? ROLES.APPLICANT : ROLES.LENDER);
  };

  const setRoleTo = (newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setRole(newRole);
    }
  };

  return (
    <RoleContext.Provider value={{ 
      role, 
      isLender, 
      isApplicant, 
      toggleRole, 
      setRoleTo 
    }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export default RoleContext;
