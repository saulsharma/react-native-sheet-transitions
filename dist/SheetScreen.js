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
exports.SheetScreen = SheetScreen;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const SheetProvider_1 = require("./SheetProvider");
const ScrollHandler_1 = require("./ScrollHandler");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
function SheetScreen({ children, onClose, scaleFactor = 0.83, dragThreshold, // Now optional - will use adaptive default
springConfig, // Now optional - will use physics-based default
dragDirections = {
    toTop: false,
    toBottom: true,
    toLeft: false,
    toRight: false,
}, isScrollable = false, style, opacityOnGestureMove = false, initialBorderRadius = 50, disableSyncScaleOnDragDown = false, customBackground, onOpenStart, onOpenEnd, onCloseStart, onCloseEnd = onClose, onBelowThreshold, disableRootScale = false, disableSheetContentResizeOnDragDown = false, }) {
    let _a, _b, _c;
    const { setScale, resizeType, enableForWeb, currentScale } = (0, SheetProvider_1.useSheet)();
    const reducedMotion = (0, utils_1.useReducedMotion)();
    // Pre-compute values that will be needed in worklets
    const effectiveThreshold = dragThreshold !== null && dragThreshold !== void 0 ? dragThreshold : constants_1.PHYSICS.ADAPTIVE_DRAG_THRESHOLD;
    const significantVelocityThreshold = constants_1.PHYSICS.SIGNIFICANT_VELOCITY;
    const screenHeight = constants_1.SCREEN_SIZE.height;
    const screenWidth = constants_1.SCREEN_SIZE.width;
    const reducedMotionDuration = constants_1.PHYSICS.REDUCED_MOTION_DURATION;
    const minOpacity = constants_1.ACCESSIBILITY.PREFER_CROSS_FADE_THRESHOLD;
    // Pre-compute spring config
    const baseSpringConfig = springConfig !== null && springConfig !== void 0 ? springConfig : constants_1.PHYSICS.SPRING_CONFIGS.interactive;
    const effectiveSpringConfig = {
        damping: (_a = baseSpringConfig.damping) !== null && _a !== void 0 ? _a : 25,
        stiffness: (_b = baseSpringConfig.stiffness) !== null && _b !== void 0 ? _b : 350,
        mass: (_c = baseSpringConfig.mass) !== null && _c !== void 0 ? _c : 0.6,
    };
    const finalSpringConfig = reducedMotion
        ? constants_1.PHYSICS.SPRING_CONFIGS.reducedMotion
        : effectiveSpringConfig;
    const translateY = (0, react_native_reanimated_1.useSharedValue)(0);
    const translateX = (0, react_native_reanimated_1.useSharedValue)(0);
    const opacity = (0, react_native_reanimated_1.useSharedValue)(1);
    const borderRadius = (0, react_native_reanimated_1.useSharedValue)(initialBorderRadius);
    const hasPassedThreshold = (0, react_native_reanimated_1.useSharedValue)(false);
    const isMounted = (0, react_native_reanimated_1.useSharedValue)(true);
    const previousScale = (0, react_native_reanimated_1.useSharedValue)(1);
    const scrollState = (0, react_native_reanimated_1.useSharedValue)({
        isAtTop: true,
        isAtBottom: false,
        scrollY: 0,
        velocity: 0,
    });
    const isDragging = (0, react_native_reanimated_1.useSharedValue)(false);
    const shouldEnableScale = react_native_1.Platform.OS === 'ios' && !disableRootScale;
    (0, react_1.useEffect)(() => {
        return () => {
            isMounted.value = false;
            (0, react_native_reanimated_1.cancelAnimation)(translateY);
            (0, react_native_reanimated_1.cancelAnimation)(translateX);
            (0, react_native_reanimated_1.cancelAnimation)(opacity);
            (0, react_native_reanimated_1.cancelAnimation)(borderRadius);
        };
    }, []);
    const updateScale = react_1.default.useCallback((newScale) => {
        if (react_native_1.Platform.OS === 'android' || !isMounted.value) {
            return;
        }
        setScale(newScale);
    }, [setScale]);
    (0, react_1.useEffect)(() => {
        if (!shouldEnableScale) {
            if (__DEV__) {
                console.log('Background scaling is disabled on Android and Web. Only available on iOS.');
            }
            return;
        }
        // Save the current scale before changing it
        previousScale.value = currentScale.value;
        const initialScale = resizeType === 'incremental' ? 1.15 : scaleFactor;
        if (onOpenStart)
            onOpenStart();
        setScale(initialScale);
        setTimeout(() => {
            if (onOpenEnd)
                onOpenEnd();
        }, 300);
        // Restore the previous scale when closing
        return () => setScale(previousScale.value);
    }, [scaleFactor, resizeType, shouldEnableScale]);
    const effectiveDragDirections = react_1.default.useMemo(() => (Object.assign(Object.assign({}, dragDirections), { toTop: isScrollable ? scrollState.value.isAtBottom : dragDirections.toTop, toBottom: isScrollable ? scrollState.value.isAtTop : dragDirections.toBottom })), [dragDirections, isScrollable, scrollState.value]);
    const handleScrollStateChange = (0, react_1.useCallback)((state) => {
        scrollState.value = state;
    }, []);
    const panGesture = react_1.default.useMemo(() => react_native_gesture_handler_1.Gesture.Pan()
        .onStart(() => {
        'worklet';
        if (!isMounted.value)
            return;
        hasPassedThreshold.value = false;
        if (scrollState.value.isAtTop) {
            isDragging.value = true;
            translateY.value = 0;
        }
    })
        .onUpdate(event => {
        'worklet';
        if (!isMounted.value)
            return;
        const { translationX, translationY } = event;
        if ((scrollState.value.isAtTop || !isScrollable) && isDragging.value) {
            if ((effectiveDragDirections.toBottom && translationY > 0) ||
                (effectiveDragDirections.toTop && translationY < 0)) {
                translateY.value = translationY;
            }
        }
        if (effectiveDragDirections.toRight || effectiveDragDirections.toLeft) {
            if ((effectiveDragDirections.toRight && translationX > 0) ||
                (effectiveDragDirections.toLeft && translationX < 0)) {
                translateX.value = translationX;
            }
        }
        const translation = Math.max(effectiveDragDirections.toBottom || effectiveDragDirections.toTop
            ? Math.abs(translationY)
            : 0, effectiveDragDirections.toLeft || effectiveDragDirections.toRight
            ? Math.abs(translationX)
            : 0);
        const willClose = translation > effectiveThreshold;
        if (willClose !== hasPassedThreshold.value) {
            hasPassedThreshold.value = willClose;
            if (willClose) {
                if (onCloseStart)
                    (0, react_native_reanimated_1.runOnJS)(onCloseStart)();
            }
            else {
                if (onBelowThreshold)
                    (0, react_native_reanimated_1.runOnJS)(onBelowThreshold)();
            }
        }
        const progress = Math.min(translation / (effectiveDragDirections.toBottom ? screenHeight : screenWidth), 1);
        if (!disableSyncScaleOnDragDown && shouldEnableScale) {
            const newScale = resizeType === 'incremental'
                ? 1.15 - progress * 0.15
                : scaleFactor + progress * (1 - scaleFactor);
            (0, react_native_reanimated_1.runOnJS)(updateScale)(newScale);
        }
        if (opacityOnGestureMove) {
            // Use 70% minimum opacity to maintain context (progressive disclosure best practice)
            opacity.value = (0, react_native_reanimated_1.interpolate)(progress * screenHeight, [0, screenHeight * 0.5], [1, minOpacity], react_native_reanimated_1.Extrapolate.CLAMP);
        }
    })
        .onEnd(event => {
        'worklet';
        isDragging.value = false;
        const { velocityX, velocityY, translationX, translationY } = event;
        const isClosingAllowed = (translationY > 0 && effectiveDragDirections.toBottom) ||
            (translationY < 0 && effectiveDragDirections.toTop) ||
            (translationX > 0 && effectiveDragDirections.toRight) ||
            (translationX < 0 && effectiveDragDirections.toLeft);
        if (!isClosingAllowed) {
            // Not in allowed direction, return to original position
            translateY.value = (0, react_native_reanimated_1.withSpring)(0, Object.assign({ velocity: velocityY }, finalSpringConfig));
            translateX.value = (0, react_native_reanimated_1.withSpring)(0, Object.assign({ velocity: velocityX }, finalSpringConfig));
            opacity.value = (0, react_native_reanimated_1.withSpring)(1);
            borderRadius.value = (0, react_native_reanimated_1.withSpring)(initialBorderRadius);
            if (shouldEnableScale) {
                (0, react_native_reanimated_1.runOnJS)(updateScale)(resizeType === 'incremental' ? 1.15 : scaleFactor);
            }
            return;
        }
        // Calculate primary translation and velocity
        const primaryTranslation = effectiveDragDirections.toBottom || effectiveDragDirections.toTop
            ? Math.abs(translationY)
            : Math.abs(translationX);
        const primaryVelocity = effectiveDragDirections.toBottom || effectiveDragDirections.toTop
            ? Math.abs(velocityY)
            : Math.abs(velocityX);
        // Convert velocity to dp/s (velocity from gesture is in px/ms)
        const velocityInDpPerSecond = primaryVelocity * 1000;
        // Determine if should dismiss based on velocity and distance
        const isFastFling = velocityInDpPerSecond > significantVelocityThreshold &&
            primaryTranslation > effectiveThreshold * 0.3;
        const crossedThreshold = primaryTranslation > effectiveThreshold;
        const shouldClose = isFastFling || crossedThreshold;
        if (shouldClose) {
            const finalTranslation = effectiveDragDirections.toBottom || effectiveDragDirections.toTop
                ? screenHeight
                : screenWidth;
            if (reducedMotion) {
                // Use timing animation for reduced motion
                const duration = reducedMotionDuration;
                translateY.value = (0, react_native_reanimated_1.withTiming)(effectiveDragDirections.toBottom
                    ? finalTranslation
                    : effectiveDragDirections.toTop
                        ? -finalTranslation
                        : 0, { duration });
                translateX.value = (0, react_native_reanimated_1.withTiming)(effectiveDragDirections.toRight
                    ? finalTranslation
                    : effectiveDragDirections.toLeft
                        ? -finalTranslation
                        : 0, { duration });
                opacity.value = (0, react_native_reanimated_1.withTiming)(0, { duration });
                borderRadius.value = (0, react_native_reanimated_1.withTiming)(0, { duration });
            }
            else {
                // For high velocity, add more damping to prevent overshoot
                const dampingMultiplier = velocityInDpPerSecond > 2000 ? 1.2 : 1.0;
                const adaptiveConfig = Object.assign(Object.assign({}, finalSpringConfig), { damping: finalSpringConfig.damping * dampingMultiplier });
                translateY.value = (0, react_native_reanimated_1.withSpring)(effectiveDragDirections.toBottom
                    ? finalTranslation
                    : effectiveDragDirections.toTop
                        ? -finalTranslation
                        : 0, Object.assign({ velocity: velocityY }, adaptiveConfig));
                translateX.value = (0, react_native_reanimated_1.withSpring)(effectiveDragDirections.toRight
                    ? finalTranslation
                    : effectiveDragDirections.toLeft
                        ? -finalTranslation
                        : 0, Object.assign({ velocity: velocityX }, adaptiveConfig));
                opacity.value = (0, react_native_reanimated_1.withSpring)(0);
                borderRadius.value = (0, react_native_reanimated_1.withSpring)(0);
            }
            if (shouldEnableScale) {
                (0, react_native_reanimated_1.runOnJS)(updateScale)(1);
            }
            (0, react_native_reanimated_1.runOnJS)(onCloseEnd)();
        }
        else {
            // Return to original position
            const dampingMultiplier = velocityInDpPerSecond > 2000 ? 1.2 : 1.0;
            const returnConfig = Object.assign(Object.assign({}, finalSpringConfig), { damping: finalSpringConfig.damping * dampingMultiplier });
            translateY.value = (0, react_native_reanimated_1.withSpring)(0, Object.assign({ velocity: velocityY }, returnConfig));
            translateX.value = (0, react_native_reanimated_1.withSpring)(0, Object.assign({ velocity: velocityX }, returnConfig));
            opacity.value = (0, react_native_reanimated_1.withSpring)(1);
            borderRadius.value = (0, react_native_reanimated_1.withSpring)(initialBorderRadius);
            if (shouldEnableScale) {
                (0, react_native_reanimated_1.runOnJS)(updateScale)(resizeType === 'incremental' ? 1.15 : scaleFactor);
            }
        }
    }), [effectiveDragDirections, isScrollable, scrollState]);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        if (!isMounted.value)
            return {};
        const scale = disableSheetContentResizeOnDragDown
            ? 1
            : (0, react_native_reanimated_1.interpolate)(Math.max(Math.abs(translateY.value), Math.abs(translateX.value)), [0, effectiveDragDirections.toBottom ? screenHeight : screenWidth], resizeType === 'incremental' ? [1.15, 1] : [1, 0.85], react_native_reanimated_1.Extrapolate.CLAMP);
        return {
            transform: [{ translateY: translateY.value }, { translateX: translateX.value }, { scale }],
            opacity: opacity.value,
            borderRadius: borderRadius.value,
        };
    }, [disableSheetContentResizeOnDragDown]);
    const backgroundStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: opacity.value,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }));
    const renderContent = () => {
        if (!isScrollable)
            return children;
        return (<ScrollHandler_1.ScrollHandler panGesture={panGesture} onScrollStateChange={handleScrollStateChange}>
        {children}
      </ScrollHandler_1.ScrollHandler>);
    };
    if (!enableForWeb) {
        return (<react_native_1.View style={react_native_1.StyleSheet.absoluteFill}>
        {customBackground && <react_native_1.View style={react_native_1.StyleSheet.absoluteFill}>{customBackground}</react_native_1.View>}
        <react_native_1.View style={[styles.container, style]}>{renderContent()}</react_native_1.View>
      </react_native_1.View>);
    }
    return (<react_native_1.View style={react_native_1.StyleSheet.absoluteFill}>
      {customBackground && (<react_native_reanimated_1.default.View style={backgroundStyle}>{customBackground}</react_native_reanimated_1.default.View>)}
      <react_native_gesture_handler_1.GestureDetector gesture={panGesture}>
        <react_native_reanimated_1.default.View style={[styles.container, style, animatedStyle]}>
          {renderContent()}
        </react_native_reanimated_1.default.View>
      </react_native_gesture_handler_1.GestureDetector>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
});
//# sourceMappingURL=SheetScreen.js.map