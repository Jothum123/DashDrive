import { useMap } from '@vis.gl/react-google-maps';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef
} from 'react';

export type CircleEventProps = {
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onDrag?: (e: google.maps.MapMouseEvent) => void;
    onDragStart?: (e: google.maps.MapMouseEvent) => void;
    onDragEnd?: (e: google.maps.MapMouseEvent) => void;
    onMouseOver?: (e: google.maps.MapMouseEvent) => void;
    onMouseOut?: (e: google.maps.MapMouseEvent) => void;
    onRadiusChanged?: () => void;
    onCenterChanged?: () => void;
};

export type CircleProps = google.maps.CircleOptions & CircleEventProps;

export const Circle = forwardRef((props: CircleProps, ref) => {
    const {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
        onRadiusChanged,
        onCenterChanged,
        radius,
        center,
        ...circleOptions
    } = props;

    const map = useMap();
    const circleRef = useRef<google.maps.Circle | null>(null);

    useImperativeHandle(ref, () => circleRef.current);

    useEffect(() => {
        if (!map) return;
        if (!circleRef.current) {
            circleRef.current = new google.maps.Circle();
        }

        circleRef.current.setMap(map);

        return () => {
            if (circleRef.current) {
                circleRef.current.setMap(null);
            }
        };
    }, [map]);

    useEffect(() => {
        if (!circleRef.current) return;
        circleRef.current.setOptions({
            ...circleOptions,
            radius,
            center
        });
    }, [circleOptions, radius, center]);

    useEffect(() => {
        if (!circleRef.current) return;
        const circle = circleRef.current;
        const gme = google.maps.event;

        const listeners = [
            ['click', onClick],
            ['drag', onDrag],
            ['dragstart', onDragStart],
            ['dragend', onDragEnd],
            ['mouseover', onMouseOver],
            ['mouseout', onMouseOut],
            ['radius_changed', onRadiusChanged],
            ['center_changed', onCenterChanged]
        ].map(([eventName, handler]) => {
            if (handler) {
                return gme.addListener(circle, eventName as string, handler as Function);
            }
            return null;
        });

        return () => {
            listeners.forEach(l => l && gme.removeListener(l));
        };
    }, [onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut, onRadiusChanged, onCenterChanged]);

    return null;
});
