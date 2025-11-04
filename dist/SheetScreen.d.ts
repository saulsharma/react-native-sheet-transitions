import React from 'react';
import type { SpringConfig, DragDirections } from './types';
interface Props {
    children: React.ReactNode;
    onClose: () => void;
    scaleFactor?: number;
    dragThreshold?: number;
    springConfig?: SpringConfig;
    dragDirections?: DragDirections;
    isScrollable?: boolean;
    style?: any;
    opacityOnGestureMove?: boolean;
    containerRadiusSync?: boolean;
    initialBorderRadius?: number;
    disableSyncScaleOnDragDown?: boolean;
    customBackground?: React.ReactNode;
    onOpenStart?: () => void;
    onOpenEnd?: () => void;
    onCloseStart?: () => void;
    onCloseEnd?: () => void;
    onBelowThreshold?: () => void;
    disableRootScale?: boolean;
    disableSheetContentResizeOnDragDown?: boolean;
}
export declare function SheetScreen({ children, onClose, scaleFactor, dragThreshold, // Now optional - will use adaptive default
springConfig, // Now optional - will use physics-based default
dragDirections, isScrollable, style, opacityOnGestureMove, initialBorderRadius, disableSyncScaleOnDragDown, customBackground, onOpenStart, onOpenEnd, onCloseStart, onCloseEnd, onBelowThreshold, disableRootScale, disableSheetContentResizeOnDragDown, }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=SheetScreen.d.ts.map