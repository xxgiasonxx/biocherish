import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
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

    return (
        <Main bgColor={color.Background}>
            <Section>
                <View className="flex w-full h-[40%] flex-col items-center justify-center">
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
                        aria-disabled={true}
                        placeholderTextColor={color.TextColor}
                        textContentType='password'
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />

                    <TextInput
                        className="w-full py-9 px-6 rounded-3xl font-bold text-[16px] bg-SecBtnColor text-TextColor dark:bg-DarkSecBtnColor dark:text-DarkTextColor"
                        placeholder="Confirm Password"
                        aria-disabled={true}
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