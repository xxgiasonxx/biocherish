import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { InputsBox, InputsType } from '@/components/InputsBox';
import { cssInterop } from 'nativewind';

// import { SafeAreaView } from 'react-native-safe-area-context';
// --- Main Component ---
function UploadPage() {
  const [inputs, setInputs] = useState<InputsType[]>([
    { title: '溫度 (°C):', type: 'number', values: '', setting: false },
    { title: '濕度 (%RH):', type: 'number', values: '', setting: false },
  ]);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // 先請求權限
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('需要允許存取相簿權限！');
      return;
    }

    // 開啟選擇器
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 只選圖片
      allowsEditing: true, // 是否允許裁剪
      aspect: [1, 1], // 裁剪比例（例如 1:1）
      quality: 1, // 品質（0~1）
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Main>
      <Section>
        <View
          className='flex flex-col w-full items-center justify-center  rounded-3xl border-dashed border-2 px-10 py-10 gap-6 bg-BoxBackground dark:bg-DarkBoxBackground border-IconColor dark:border-DarkIconColor'
        >
          <View className='flex-1 flex items-center justify-center'>
            <MaterialCommunityIcons
              name='cloud-upload-outline'
              size={64}
              className='text-IconColor dark:text-DarkIconColor'
            />
          </View>

          <View className='flex-1 flex items-center justify-center'>
            <Text
              className='font-bold text-3xl text-TextColor dark:text-DarkTextColor'
            >
              上傳或拍攝照片
            </Text>
            <Text
              className='font-medium text-lg text-OpcTextColor dark:text-DarkOpcTextColor'
            >
              支援 JPG、PNG、GIF 等多種格式
            </Text>
          </View>

          <View className='flex w-full items-center justify-center gap-6'>
            <Pressable
              onPress={pickImage}
              className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-full gap-5 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
              accessibilityLabel="Choose an image to upload"
            >
              <MaterialCommunityIcons
                name="file-upload-outline"
                size={32}
                className='text-TextIconColor dark:text-DarkTextIconColor'
              />
              <Text
                className='font-semibold text-xl text-TextColor dark:text-DarkTextColor'
              >
                選擇上傳圖片
              </Text>
            </Pressable>


            <Pressable
              className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-full gap-5 bg-SecBtnColor dark:bg-DarkSecBtnColor'
              accessibilityLabel="Take a photo using the camera"
            >
              <MaterialCommunityIcons
                name="camera-outline"
                size={32}
                className='text-TextIconColor dark:text-DarkTextIconColor'
              />
              <Text
                className='font-semibold text-xl text-TextColor dark:text-DarkTextColor'
              >
                使用相機拍攝
              </Text>
            </Pressable>
          </View>
        </View>

        <InputsBox 
          BigTitle="環境因素輸入"
          needed={inputs}
          onChange={setInputs}
        />

          <Pressable
            className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-2xl gap-5 mt-4 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
            accessibilityLabel="Submit upload and inputs"
          >
            <Text className='font-bold text-xl text-TextColor dark:text-DarkTextColor'>
              開始識別
            </Text>
          </Pressable>
      </Section>
    </Main>
  );
};

export default UploadPage;

cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style'
  }
});