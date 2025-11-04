import React from 'react';
import { SharedValue } from 'react-native-reanimated';
interface SheetContextType {
    scale: SharedValue<number>;
    setScale: (scale: number) => void;
    resizeType: 'incremental' | 'decremental';
    enableForWeb: boolean;
    currentScale: SharedValue<number>;
}
interface SheetProviderProps {
    children: React.ReactNode;
    resizeType?: 'incremental' | 'decremental';
    enableForWeb?: boolean;
}
export declare function SheetProvider({ children, resizeType, enableForWeb, }: SheetProviderProps): React.JSX.Element;
export declare function useSheet(): SheetContextType;
export {};
//# sourceMappingURL=SheetProvider.d.ts.map