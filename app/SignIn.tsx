import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';

export function SignInPage() {
    const { color } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SignInHandle = () => {
        // Login logic here
    };

    return (
        <Main bgColor={color.Background}>
            <Section>
                <View className="flex w-full h-[40%] flex-col items-center justify-center">
                    <Text
                        className="text-[48px] font-bold"
                        style={{
                            color: color.TextColor
                        }}
                    >
                        歡迎回來
                    </Text>
                </View>
                <View className='flex w-full items-center justify-start px-2 gap-3'>
                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px]"
                        placeholder="Email"
                        textContentType='emailAddress'
                        autoCorrect={true}
                        autoComplete='email'
                        placeholderTextColor={color.TextColor}
                        style={{
                            backgroundColor: color.SecBtnColor,
                            color: color.TextColor
                        }}
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />

                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px]"
                        placeholder="Password"
                        aria-disabled={true}
                        placeholderTextColor={color.TextColor}
                        style={{
                            backgroundColor: color.SecBtnColor,
                            color: color.TextColor,
                        }}
                        textContentType='password'
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />
                    <Pressable
                        className='flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-5'
                        style={{
                            backgroundColor: color.PrimaryBtnColor
                        }}
                    >
                        <Text
                            className='font-medium text-[20px]'
                            style={{
                                color: color.TextColor
                            }}
                        >
                            登入
                        </Text>
                    </Pressable>
                    <View className="flex w-full flex-row items-center justify-center my-4">
                        <Text
                            className='font-bold text-[16px]'
                            style={{
                                color: color.TextColor
                            }}
                        >
                            或使用
                        </Text>
                    </View>
                    <Pressable
                        className='flex flex-row w-full items-center justify-center px-6 py-4 rounded-3xl gap-4'
                        style={{
                            backgroundColor: color.IconColor
                        }}
                    >
                        <Image
                            style={{
                                width: 24,
                                height: 24
                            }}
                            source={require('@/assets/google.png')}
                        />
                        <Text
                            className='font-medium text-[20px]'
                            style={{
                                color: color.TextColor
                            }}
                        >
                            Google
                        </Text>
                    </Pressable>
                    <Pressable className='flex w-full flex-row items-center justify-center gap-1 mt-4'>
                        <Text
                            className='font-medium text-[16px]'
                            style={{
                                color: color.TextColor
                            }}
                        >
                            沒有帳號嗎？
                        </Text>

                        <Text
                            className='font-bold text-[16px]'
                            style={{
                                color: color.TextColor
                            }}
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