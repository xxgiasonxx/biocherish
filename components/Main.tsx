import { View, ScrollView } from "react-native";
// import { StyleSheet } from "react-native";
import "../global.css"

type MainProps = {
    children: React.ReactNode;
    bgColor?: string;
}


export function Main({ children, bgColor }: MainProps) {
    return (
        // <ScrollView contentContainerStyle={
        //     {
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         paddingBottom: 100
        //     }
        // }>
        // <View className="flex-1 flex-col items-center justify-center py-[3%]" style={{ backgroundColor: bgColor }}>
        //     {children}
        // </View>
        // {/* </ScrollView> */}

        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 100,
            }}
            className="flex-1 flex-col bg-Background dark:bg-DarkBackground"
        >
            {children}
        </ScrollView>
    );
}

// export function Main({ children, bgColor }: { children: React.ReactNode, bgColor?: string }) {
//     return (
//         <View style={[styles.container, { backgroundColor: bgColor }]}>
//             {children}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: '1%',
//         gap: '1%',
//     },
// });