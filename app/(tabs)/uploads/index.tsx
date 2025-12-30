import React, { useState } from 'react';
import { Text, View, Pressable, Alert, Image, Platform } from 'react-native';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { InputsBox, InputsType } from '@/components/InputsBox';
import { cssInterop } from 'nativewind';
import axios from 'axios';

const API_URL = Platform.select({
  web: process.env.EXPO_PUBLIC_WEB_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
});

function ImageChoiceIcon() {
  return (
    <View className='flex-1 flex items-center justify-center'>
      <MaterialCommunityIcons
        name='cloud-upload-outline'
        size={64}
        className='text-IconColor dark:text-DarkIconColor'
      />
    </View>
  );
}

function ImageChoiceText() {
  return (
      <View className='flex-1 flex items-center justify-center'>
        <Text
          className='font-bold text-3xl text-TextColor dark:text-DarkTextColor'
        >
          上傳或拍攝照片
        </Text>
        <Text
          className='font-medium text-lg text-OpcTextColor dark:text-DarkOpcTextColor'
        >
          支援 JPG、PNG、WEBP 等多種格式
        </Text>
      </View>
  )
}

type ImageChoiceButtonProps = {
  bgColor: string;
  title: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  Press: () => void;
};

function ImageChoiceButton({ bgColor, title, iconName, Press }: ImageChoiceButtonProps) {
  return (
    <Pressable
      onPress={Press}
      className={`flex flex-row w-full items-center justify-center px-6 py-3 rounded-full gap-5 ${bgColor}`}
      accessibilityLabel="Choose an image to upload"
    >
      <MaterialCommunityIcons
        name={iconName}
        size={32}
        className='text-TextIconColor dark:text-DarkTextIconColor'
      />
      <Text
        className='font-semibold text-xl text-TextColor dark:text-DarkTextColor'
      >
        {title}
      </Text>
    </Pressable>
  );
}

function DisplayImageUri({ uri }: { uri: string }) {
  return (
    <Image
      source={{ uri }}
      className='w-full h-full rounded-3xl'
    />
  );
}

type ImageChoiceProps = {
  imageUri: string | null;
  setImageUri: (uri: string) => void;
};

function ImageChoice({ imageUri, setImageUri }: ImageChoiceProps) {
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
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // 要求相機權限
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('抱歉', '我們需要相機權限才能拍照');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // 通常拍大頭貼用 1:1
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log("拍照路徑:", result.assets[0].uri);
    }
  };

  if (imageUri) {
    return (
      <View
        className='flex flex-col w-full items-center justify-center  rounded-3xl border-dashed border-2 px-5 py-5 gap-6 bg-BoxBackground dark:bg-DarkBoxBackground border-IconColor dark:border-DarkIconColor'
      >
        <DisplayImageUri uri={imageUri} />
      </View>
    ) 
  }


  return (
    <View
      className='flex flex-col w-full items-center justify-center  rounded-3xl border-dashed border-2 px-10 py-10 gap-6 bg-BoxBackground dark:bg-DarkBoxBackground border-IconColor dark:border-DarkIconColor'
    >

      <ImageChoiceIcon />
      <ImageChoiceText />


      <View className='flex w-full items-center justify-center gap-6'>
        <ImageChoiceButton
          bgColor='bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
          title='選擇上傳圖片'
          iconName='file-upload-outline'
          Press={pickImage}
        />
        {Platform.OS !== 'web' &&
          <ImageChoiceButton
            bgColor='bg-SecBtnColor dark:bg-DarkSecBtnColor'
            title='使用相機拍攝'
            iconName='camera-outline'
            Press={takePhoto}
          />
        }
      </View>
    </View>
  );
};

function UploadPage() {
  const [inputs, setInputs] = useState<InputsType[]>([
    { title: '溫度 (°C):', type: 'number', values: '', setting: true },
    { title: '濕度 (%RH):', type: 'number', values: '', setting: true },
  ]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const AiSubmitHandle = async () => { 
    try {
      if (!imageUri) {
        Alert.alert('錯誤', '請先上傳或拍攝圖片');
        return;
      }
      const form = new FormData();

      form.append('file', {
        uri: imageUri,
        name: 'upload.jpg',
        type: 'image/jpeg',
      } as any);

      if (inputs[0].values !== '')
          form.append('temperature', inputs[0].values.toString());
      if (inputs[1].values !== '')
          form.append('humidity', inputs[1].values.toString());

      const uri = `${API_URL}/device/manualUpdate`;
      const response = await axios.post(uri,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status !== 200) {
        Alert.alert('錯誤', response.data || '提交失敗，請稍後再試。');
        return;
      }

      // 在這裡處理提交邏輯，例如上傳圖片和輸入數據到伺服器
      Alert.alert('成功', '圖片和數據已提交進行識別！');
    } catch (error) {
      Alert.alert('錯誤', '提交過程中發生錯誤，請稍後再試。');
    }
  };


  return (
    <Main>
      <Section>
        <ImageChoice imageUri={imageUri} setImageUri={setImageUri} />

        <InputsBox
          BigTitle="環境因素輸入"
          needed={inputs}
          onChange={setInputs}
        />

        <Pressable
          className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-2xl gap-5 mt-4 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
          accessibilityLabel="Submit upload and inputs"
          onPress={AiSubmitHandle}
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