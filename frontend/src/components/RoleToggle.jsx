import React from 'react';
import { useRole, ROLES } from '../context/RoleContext';
import { Building2, User } from 'lucide-react';

/**
 * Role Toggle Component
 * 
 * Demo-only UI switch for strict role-based view separation.
 * - Applicant: Sees user-facing content only
 * - Lender: Sees institutional content only
 * 
 * Views are mutually exclusive - no content overlap.
 */
const RoleToggle = () => {
  const { role, setRoleTo } = useRole();
  const isLender = role === ROLES.LENDER;

  return (
    <div className="flex items-center gap-3">
      {/* View Mode label */}
      <span className="text-xs text-slate-500 font-medium hidden sm:inline">
        View Mode:
      </span>
      
      {/* Toggle container */}
      <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
        {/* Applicant option */}
        <button
          onClick={() => setRoleTo(ROLES.APPLICANT)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            !isLender 
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-pressed={!isLender}
        >
          <User className="w-3.5 h-3.5" />
          <span>Applicant</span>
        </button>
        
        {/* Lender option */}
        <button
          onClick={() => setRoleTo(ROLES.LENDER)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
            isLender 
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-pressed={isLender}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Lender</span>
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;
