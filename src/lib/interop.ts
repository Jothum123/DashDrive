import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { cssInterop, remapProps } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

// Map className to style for SafeAreaView
cssInterop(SafeAreaView, {
    className: "style",
});

export const StyledSafeAreaView = SafeAreaView;

// For icons, remapProps is often more compatible with NativeWind v4
remapProps(Ionicons, {
    className: "style",
});
export const StyledIonicons = Ionicons;

remapProps(FontAwesome5, {
    className: "style",
});
export const StyledFontAwesome5 = FontAwesome5;

remapProps(MaterialCommunityIcons, {
    className: "style",
});
export const StyledMaterialCommunityIcons = MaterialCommunityIcons;

remapProps(MaterialIcons, {
    className: "style",
});
export const StyledMaterialIcons = MaterialIcons;

remapProps(FontAwesome, {
    className: "style",
});
export const StyledFontAwesome = FontAwesome;
