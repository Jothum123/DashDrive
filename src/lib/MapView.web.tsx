// Web fallback for react-native-maps
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Stub components for web
export const PROVIDER_GOOGLE = "google";
export const PROVIDER_DEFAULT = null;

interface MapViewProps {
    style?: any;
    initialRegion?: any;
    region?: any;
    customMapStyle?: any;
    mapPadding?: any;
    provider?: any;
    children?: React.ReactNode;
}

const MapView = ({ style, children }: MapViewProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.mapPlaceholder}>
                <Text style={styles.placeholderText}>Map unavailable on web</Text>
            </View>
            {children}
        </View>
    );
};

export const Marker = ({ children }: { coordinate: any; children?: React.ReactNode }) => {
    return <View style={styles.marker}>{children}</View>;
};

export const Polyline = (_props: any) => null;
export const Circle = (_props: any) => null;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a2e",
    },
    placeholderText: {
        color: "#666",
        fontSize: 16,
    },
    marker: {
        position: "absolute",
        top: "50%",
        left: "50%",
    },
});

export default MapView;
