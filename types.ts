import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
	home: { userId?: string } | undefined;
	register: undefined;
	login: { userId?: string } | undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
