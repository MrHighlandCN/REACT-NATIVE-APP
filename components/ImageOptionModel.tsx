// components/ImageOptionModal.tsx
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type ImageOptionModalProps = {
    visible: boolean;
    onClose: () => void;
    onPickImage: () => void;
    onTakeImage: () => void;
    onRemoveImage: () => void;
};

const ImageOptionModal: React.FC<ImageOptionModalProps> = ({
    visible,
    onClose,
    onPickImage,
    onTakeImage,
    onRemoveImage,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/30">
                <View className="bg-white rounded-2xl p-4 w-full">
                    <Text className="text-lg font-semibold text-center mb-4">Chọn hành động</Text>

                    <Pressable className="justify-center items-center py-3 border-b border-gray-200 flex flex-row gap-2" onPress={onTakeImage}>
                        <FontAwesome name='camera' size={25} color='gray' />
                        <Text className="text-center">Chụp ảnh mới</Text>
                    </Pressable>
                    
                    <Pressable className="justify-center items-center py-3 border-b border-gray-200 flex flex-row gap-2" onPress={onPickImage}>
                        <FontAwesome name='image' size={25} color='#D2983F' />
                        <Text className="text-center">
                            Thư viện ảnh
                        </Text>
                    </Pressable>


                    <Pressable className="justify-center items-center py-3 border-b border-gray-200 flex flex-row gap-2" onPress={onRemoveImage}>
                        <FontAwesome name='close' size={25} color='red' />
                        <Text className="text-center text-red-500">Xoá ảnh</Text>
                    </Pressable>

                    <Pressable className="mt-3 bg-gray-200 rounded-md py-2" onPress={onClose}>
                        <Text className="text-center text-gray-700">Đóng</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default ImageOptionModal;
