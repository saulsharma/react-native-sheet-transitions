"use strict";
let __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    let desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
let __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
let __importStar = (this && this.__importStar) || (function () {
    let ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            let ar = [];
            for (let k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        let result = {};
        if (mod != null) for (let k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetProvider = SheetProvider;
exports.useSheet = useSheet;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const SheetContext = (0, react_1.createContext)(null);
function SheetProvider({ children, resizeType = 'decremental', enableForWeb = false, }) {
    const scale = (0, react_native_reanimated_1.useSharedValue)(1);
    const isMounted = (0, react_native_reanimated_1.useSharedValue)(false);
    (0, react_1.useEffect)(() => {
        // Delay setting isMounted to ensure view is ready
        requestAnimationFrame(() => {
            isMounted.value = true;
        });
        return () => {
            isMounted.value = false;
            (0, react_native_reanimated_1.cancelAnimation)(scale);
        };
    }, []);
    const setScale = (0, react_1.useCallback)((newScale) => {
        if (!isMounted.value)
            return;
        if (react_native_1.Platform.OS === 'android') {
            scale.value = newScale;
            return;
        }
        scale.value = (0, react_native_reanimated_1.withSpring)(newScale, {
            damping: 20,
            stiffness: 300,
            mass: 0.3,
        });
    }, []);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        if (!isMounted.value)
            return {};
        return {
            transform: [{ scale: scale.value }],
        };
    }, []);
    const isEnabled = react_native_1.Platform.OS === 'web' ? enableForWeb : true;
    return (<SheetContext.Provider value={{
            scale,
            setScale,
            resizeType,
            enableForWeb: isEnabled,
        }}>
      {/* <View style={{ flex: 1, backgroundColor: 'red',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
           }}/> */}

      <react_native_reanimated_1.default.View style={[
            {
                flex: 1,
                backfaceVisibility: 'hidden',
            },
            react_native_1.Platform.OS === 'ios' ? animatedStyle : null,
        ]} collapsable={false}>
        {children}
      </react_native_reanimated_1.default.View>
    </SheetContext.Provider>);
}
function useSheet() {
    const context = (0, react_1.useContext)(SheetContext);
    if (!context) {
        throw new Error('useSheet must be used within a SheetProvider');
    }
    return context;
}
//# sourceMappingURL=SheetProvider.js.map