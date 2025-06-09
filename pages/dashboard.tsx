import { useEffect, useState } from 'react';

interface CarData {
  currentValue: number;
  outstandingFinance: number;
}

export default function Dashboard() {
  const [car, setCar] = useState<CarData | null>(null);
  const [equity, setEquity] = useState<number | null>(null);

  useEffect(() => {
    // This would be dynamic in a real app — mocked here
    const mockCarData: CarData = {
      currentValue: 15000,
      outstandingFinance: 12000,
    };
    setCar(mockCarData);
    setEquity(mockCarData.currentValue - mockCarData.outstandingFinance);
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Equity Dashboard</h1>
      {car && (
        <div>
          <p><strong>Current Car Value:</strong> £{car.currentValue.toLocaleString()}</p>
          <p><strong>Outstanding Finance:</strong> £{car.outstandingFinance.toLocaleString()}</p>
          <p><strong>Equity:</strong> £{equity?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
