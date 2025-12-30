import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Platform } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { useAuth } from '@/components/providers/AuthProviders';
import { useRouter } from 'expo-router';

export function SignUpPage() {
    const { color } = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const { onRegister } = useAuth();

    const SignUpHandle = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (onRegister) {
            onRegister(email, username, password, confirmPassword)
                .then(response => {
                    if (response.error) {
                        alert(response.msg);
                    } else {
                        router.push('/SignIn');
                    }
                });
        }
    };

    if (Platform.OS === 'web') {
        return (
            <Main bgColor={color.Background}>
            <Section>
                {/* Web layout: centered card + responsive two-column */}
                <View className="w-full flex-1 items-center justify-center px-4 py-10">
                <View className="w-full max-w-5xl overflow-hidden rounded-[32px] bg-SecBtnColor dark:bg-DarkSecBtnColor">
                    <View className="flex w-full flex-col md:flex-row">
                    {/* Left: Welcome / branding */}
                    <View className="w-full md:w-[45%] px-8 py-10 md:py-14 items-start justify-center bg-PrimaryBtnColor/10 dark:bg-DarkPrimaryBtnColor/10">
                        <Text className="text-[44px] md:text-[56px] font-bold text-TextColor dark:text-DarkTextColor">
                        創建帳號
                        </Text>
                        <Text className="mt-3 text-[16px] font-medium text-TextColor/70 dark:text-DarkTextColor/70">
                        填寫資料以註冊新帳號。
                        </Text>
                    </View>

                    {/* Right: Form */}
                    <View className="w-full md:w-[55%] px-8 py-10 md:py-14">
                        <View className="flex w-full gap-3">
                        <TextInput
                            className="w-full py-5 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-Background dark:text-DarkTextColor dark:bg-DarkBackground"
                            placeholder="Username"
                            textContentType="username"
                            autoCorrect={true}
                            autoComplete="username"
                            keyboardType="default"
                            placeholderTextColor={color.TextColor}
                            value={username}
                            onChangeText={v => setUsername(v)}
                        />

                        <TextInput
                            className="w-full py-5 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-Background dark:text-DarkTextColor dark:bg-DarkBackground"
                            placeholder="Email"
                            textContentType="emailAddress"
                            autoCorrect={true}
                            autoComplete="email"
                            placeholderTextColor={color.TextColor}
                            value={email}
                            onChangeText={v => setEmail(v)}
                        />

                        <TextInput
                            className="w-full py-5 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-Background dark:text-DarkTextColor dark:bg-DarkBackground"
                            placeholder="Password"
                            textContentType="password"
                            secureTextEntry={true}
                            placeholderTextColor={color.TextColor}
                            value={password}
                            onChangeText={v => setPassword(v)}
                        />

                        <TextInput
                            className="w-full py-5 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-Background dark:text-DarkTextColor dark:bg-DarkBackground"
                            placeholder="Confirm Password"
                            textContentType="password"
                            secureTextEntry={true}
                            placeholderTextColor={color.TextColor}
                            value={confirmPassword}
                            onChangeText={v => setConfirmPassword(v)}
                        />

                        <Pressable
                            className="flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-5 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor"
                            onPress={SignUpHandle}
                        >
                            <Text className="font-medium text-[20px] text-TextColor dark:text-DarkTextColor">
                            註冊
                            </Text>
                        </Pressable>

                        <Pressable
                            className="flex w-full flex-row items-center justify-center gap-1 mt-4"
                            onPress={() => router.navigate('/SignIn')}
                        >
                            <Text className="font-medium text-[16px] text-TextColor dark:text-DarkTextColor">
                            已經有帳號了？
                            </Text>
                            <Text className="font-bold text-[16px] text-TextColor dark:text-DarkTextColor">
                            登入
                            </Text>
                        </Pressable>
                        </View>
                    </View>
                    </View>
                </View>
                </View>
            </Section>
            </Main>
        );
    }

    return (
        <Main>
            <Section>
                <View className="flex w-full h-[35%] flex-col items-center justify-center">
                    <Text
                        className="text-[48px] font-bold text-TextColor dark:text-DarkTextColor"
                    >
                        創建帳號
                    </Text>
                </View>
                <View className='flex w-full items-center justify-start px-2 gap-3'>
                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px] bg-SecBtnColor text-TextColor dark:bg-DarkSecBtnColor dark:text-DarkTextColor"
                        placeholder="Username"
                        textContentType='username'
                        autoCorrect={true}
                        autoComplete='username'
                        keyboardType='default'
                        placeholderTextColor={color.TextColor}
                        value={username}
                        onChangeText={username => setUsername(username)}
                    />
                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px] bg-SecBtnColor text-TextColor dark:bg-DarkSecBtnColor dark:text-DarkTextColor"
                        placeholder="Email"
                        textContentType='emailAddress'
                        autoCorrect={true}
                        autoComplete='email'
                        placeholderTextColor={color.TextColor}
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />

                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px] bg-SecBtnColor text-TextColor dark:bg-DarkSecBtnColor dark:text-DarkTextColor"
                        placeholder="Password"
                        placeholderTextColor={color.TextColor}
                        textContentType='password'
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />

                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px] bg-SecBtnColor text-TextColor dark:bg-DarkSecBtnColor dark:text-DarkTextColor"
                        placeholder="Confirm Password"
                        placeholderTextColor={color.TextColor}
                        textContentType='password'
                        value={confirmPassword}
                        onChangeText={password => setConfirmPassword(password)}
                    />
                    <Pressable
                        className='flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-5 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
                        onPress={SignUpHandle}
                    >
                        <Text
                            className='font-medium text-[20px] text-TextColor dark:text-DarkTextColor'
                        >
                            註冊
                        </Text>
                    </Pressable>
                    
                    <Pressable 
                        className='flex w-full flex-row items-center justify-center gap-1 mt-4'
                        onPress={() => router.navigate('/SignIn')}
                    >
                        <Text
                            className='font-medium text-[16px] text-TextColor dark:text-DarkTextColor'
                        >
                            已經有帳號了？
                        </Text>

                        <Text
                            className='font-bold text-[16px] text-TextColor dark:text-DarkTextColor'
                        >
                            登入
                        </Text>
                    </Pressable>
                </View>
            </Section>
        </Main>
    );
}

export default SignUpPage;