import { useState, createContext } from "react";
import type { ReactNode } from "react";

const UnitContext = createContext<{ unit: string; setUnit: React.Dispatch<React.SetStateAction<string>>; } | null>(null)

function UnitContextProvider({ children }: { children: ReactNode } ) {
  const [unit, setUnit] = useState<string>("celsius");

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export { UnitContext, UnitContextProvider }
