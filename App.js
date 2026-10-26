import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";
import EditWord from "./screens/EditWord";
import { COLORS } from "./constants";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AllWords"
        screenOptions={{
          headerTransparent: true,
          headerTintColor: COLORS.primary900,
          headerTitleStyle: { color: COLORS.primary900 },
          contentStyle: { backgroundColor: COLORS.appBackground },
        }}
      >
        <Stack.Screen name="AllWords" component={AllWords} options={{ headerShown: false }} />
        <Stack.Screen name="AddWord" component={AddWord} options={{ title: "Adding word" }} />
        <Stack.Screen
          name="EditWord"
          component={EditWord}
          options={({ route }) => ({
            title: `Editing word "${route.params?.wordData?.word || ""}"`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
