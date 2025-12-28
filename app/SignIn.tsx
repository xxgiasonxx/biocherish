import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Platform } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { useAuth } from '@/components/providers/AuthProviders';
import { useRouter } from 'expo-router';



export function SignInPage() {
    const { color } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const { onLogin, onGoogleLogin } = useAuth();

    const GoogleLoginHandle = async () => {
        const result = await onGoogleLogin!();
        console.log("Google Login result:", result);
        if (result && result.error) {
            alert(result.msg);
        }
    }

    const LoginHandle = async () => {
        const result = await onLogin!(email, password);
        console.log("Login result:", result);
        if (result && result.error) {
            alert(result.msg);
        } else {
            router.push('/(tabs)/home');
        }
    }

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
                                        歡迎回來
                                    </Text>
                                    <Text className="mt-3 text-[16px] font-medium text-TextColor/70 dark:text-DarkTextColor/70">
                                        使用 Email/密碼登入，或使用 Google 快速登入。
                                    </Text>
                                </View>

                                {/* Right: Form */}
                                <View className="w-full md:w-[55%] px-8 py-10 md:py-14">
                                    <View className="flex w-full gap-3">
                                        <TextInput
                                            className="w-full py-5 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-Background dark:text-DarkTextColor dark:bg-DarkBackground"
                                            placeholder="Email"
                                            textContentType="emailAddress"
                                            autoCorrect={true}
                                            autoComplete="email"
                                            placeholderTextColor={color.TextColor}
                                            value={email}
                                            onChangeText={email => setEmail(email)}
                                        />

                                        <TextInput
                                            className="w-full py-5 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-Background dark:text-DarkTextColor dark:bg-DarkBackground"
                                            placeholder="Password"
                                            textContentType="password"
                                            secureTextEntry={true}
                                            placeholderTextColor={color.TextColor}
                                            value={password}
                                            onChangeText={password => setPassword(password)}
                                        />

                                        <Pressable
                                            className="flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-5 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor"
                                            onPress={LoginHandle}
                                        >
                                            <Text className="font-medium text-[20px] text-TextColor dark:text-DarkTextColor">
                                                登入
                                            </Text>
                                        </Pressable>

                                        <View className="flex w-full flex-row items-center justify-center my-3">
                                            <Text className="font-bold text-[16px] text-TextColor/80 dark:text-DarkTextColor/80">
                                                或使用
                                            </Text>
                                        </View>

                                        <Pressable
                                            className="flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-4 bg-IconColor dark:bg-DarkIconColor"
                                            onPress={GoogleLoginHandle}
                                        >
                                            <Image
                                                style={{ width: 24, height: 24 }}
                                                source={require('@/assets/google.png')}
                                            />
                                            <Text className="font-medium text-[20px] text-TextColor dark:text-DarkTextColor">
                                                Google
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            className="flex w-full flex-row items-center justify-center gap-1 mt-4"
                                            onPress={() => router.navigate('/SignUp')}
                                        >
                                            <Text className="font-medium text-[16px] text-TextColor dark:text-DarkTextColor">
                                                沒有帳號嗎？
                                            </Text>
                                            <Text className="font-bold text-[16px] text-TextColor dark:text-DarkTextColor">
                                                註冊
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
                        歡迎回來
                    </Text>
                </View>
                <View className='flex w-full items-center justify-start px-2 gap-3'>
                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-SecBtnColor dark:text-DarkTextColor dark:bg-DarkSecBtnColor"
                        placeholder="Email"
                        textContentType='emailAddress'
                        autoCorrect={true}
                        autoComplete='email'
                        placeholderTextColor={color.TextColor}
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />

                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px] text-TextColor bg-SecBtnColor dark:text-DarkTextColor dark:bg-DarkSecBtnColor"
                        placeholder="Password"
                        textContentType='password'
                        secureTextEntry={true}
                        placeholderTextColor={color.TextColor}
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />
                    <Pressable
                        className='flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-5 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
                        onPress={LoginHandle}
                    >
                        <Text
                            className='font-medium text-[20px] text-TextColor dark:text-DarkTextColor'
                        >
                            登入
                        </Text>
                    </Pressable>
                    <View className="flex w-full flex-row items-center justify-center my-4">
                        <Text
                            className='font-bold text-[16px] text-TextColor dark:text-DarkTextColor'
                        >
                            或使用
                        </Text>
                    </View>
                    <Pressable
                        className='flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-4 bg-IconColor dark:bg-DarkIconColor'
                        onPress={GoogleLoginHandle}
                    >
                        <Image
                            style={{
                                width: 24,
                                height: 24
                            }}
                            source={require('@/assets/google.png')}
                        />
                        <Text
                            className='font-medium text-[20px] text-TextColor dark:text-DarkTextColor'
                        >
                            Google
                        </Text>
                    </Pressable>
                    <Pressable 
                        className='flex w-full flex-row items-center justify-center gap-1 mt-4'
                        onPress={() => router.navigate('/SignUp')}
                    >
                        <Text
                            className='font-medium text-[16px] text-TextColor dark:text-DarkTextColor'
                        >
                            沒有帳號嗎？
                        </Text>

                        <Text
                            className='font-bold text-[16px] text-TextColor dark:text-DarkTextColor'
                        >
                            註冊
                        </Text>
                    </Pressable>
                </View>
            </Section>
        </Main>
    );
}

export default SignInPage;