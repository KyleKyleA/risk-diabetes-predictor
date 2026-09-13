// Author: Kyle Angeles
// File-Name: RiskContext.jsx


import { createContext, useContext, useState } from 'react';

const RiskContext = createContext();

export default function RiskProvider({ children}) {

    const [riskResult, setRiskResult] = useState(null);

    return (

        <RiskContext.Provide value ={{ riskResult, setRiskResult}}>
            {children}
        </RiskContext.Provide>
    );
}

export const useRisk = () => useContext(RiskContext);
