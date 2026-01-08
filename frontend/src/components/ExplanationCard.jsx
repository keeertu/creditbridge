import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, User } from 'lucide-react';

const ExplanationCard = ({ type, content }) => {
  const isLender = type === 'lender';
  
  return (
    <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
          {isLender ? (
            <>
              <Building2 className="w-5 h-5 text-slate-600" />
              Lender Assessment
            </>
          ) : (
            <>
              <User className="w-5 h-5 text-slate-600" />
              Your Summary
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-slate-600 leading-relaxed ${
          isLender ? 'text-sm' : 'text-base'
        }`}>
          {content}
        </p>
        {isLender && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              For institutional use only
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExplanationCard;
