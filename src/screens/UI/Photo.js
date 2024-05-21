import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	ActivityIndicator,
	Alert,
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import * as FileSystem from 'expo-file-system'
import { manipulateAsync } from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'

import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function Passport({ navigation, route }) {
	const [imageUri, setImageUri] = useState(null)
	const [stopped, setStopped] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [isLoadImg, setIsLoadImg] = useState(false)

	const user = useSelector(state => state.user)

	const { t } = useTranslation()

	const uploadImage = async () => {
		if (imageUri != null) {
			const data = new FormData()

			data.append('OperateUserID', user.user.username)
			// data.append('front', {
			// 	name: 'image',
			// 	type: 'image/png',
			// 	uri:
			// 		Platform.OS === 'android'
			// 			? imageUri.path
			// 			: imageUri.path.replace('file://', ''),
			// })

      console.info('uploadImage');

			try {
        console.info(data, 'uploadImage');
				const res = await fetch('https://pda.139express.com/api/upload', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						// 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
						'Access-Control-Allow-Credentials': true,
						'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					},
          body: JSON.stringify(data)
				})
				const result = await res.json()
				if (result.status == 'success') {
					setStopped(true)
					setLoaded(true)
				} else {
					console.error(res)
				}
			} catch (e) {
        console.info('catch');
				console.error(e)
			}
		} else {
			Alert.alert('Please Select image first')
		}
	}

	const pickImage = async type => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.7,
		})

		if (type == 'front') {
			const resizedImageFront = await resizeImage(result.assets[0].uri)
			setImageUri({
				path: resizedImageFront.uri,
				width: resizedImageFront.width,
				height: resizedImageFront.height,
			})
		}
	}

	const resizeImage = async uri => {
		const fileInfo = await FileSystem.getInfoAsync(uri)
		const fileSize = fileInfo.size

		// Если размер файла превышает 0.5MB, уменьшаем его размер
		if (fileSize > 0.5 * 1024 * 1024) {
			const manipulatedImage = await manipulateAsync(
				uri,
				[{ resize: { width: 400 } }],
				{ compress: 0.5, format: 'jpeg' }
			)
			return manipulatedImage
		} else {
			return { uri, width: 400, height: 300 }
		}
	}

	const downloadImage = async (uri, name) => {
		const fileUri = FileSystem.documentDirectory + `image-${name}.jpg`
		try {
			const fileInfo = await FileSystem.downloadAsync(uri, fileUri)
			return fileInfo.uri
		} catch (error) {
			console.error('Error downloading file: ', error)
		}
	}

	return (
		<ScrollView style={{ backgroundColor: '#fff' }}>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => pickImage('front')}
					disabled={stopped}
				>
					{isLoadImg ? (
						<ActivityIndicator size='large' color='#d00020' />
					) : imageUri ? (
						<Image
							style={{
								resizeMode: 'contain',
								width: (180 / imageUri.height) * imageUri.width,
								height: 180,
							}}
							source={{ uri: imageUri.path }}
						/>
					) : (
						<Text style={{ color: '#d00020' }}>
							<FontAwesome name='image' size={20} style={{ marginRight: 10 }} />
							<Text> </Text>
							{t('screens.profile.items.passport_front')}
						</Text>
					)}
				</TouchableOpacity>
        <TouchableOpacity
          onPress={uploadImage}
          disabled={!(imageUri != null && !stopped)}
          style={[styles.saveBtn, { backgroundColor: '#29A71A' }]}
        >
						<Text style={{ color: '#ffffff', fontSize: 18 }}>{t("common.save_finish")}</Text>
					</TouchableOpacity>
				{loaded && (
					<Text style={{ color: '#29A71A', fontSize: 14, textAlign: 'center' }}>
						{t('screens.profile.items.uploaded')}
					</Text>
				)}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
	},
	button: {
		width: '90%',
		height: 200,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 10,
		marginBottom: 20,
		borderColor: '#D9D9D9',
		borderWidth: 2,
		borderRadius: 15,
	},
	imageContainer: {
		margin: 0,
		width: '90%',
		height: 'auto',
	},
	row: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 'auto',
		marginBottom: 30,
		width: '90%',
		flexDirection: 'row',
	},
	block: {
		margin: 0,
		width: '48%',
		height: 'auto',
		padding: 10,
		borderColor: '#D9D9D9',
		borderWidth: 2,
		borderRadius: 15,
	},
	blockDescription: {
		margin: 0,
		width: '100%',
		height: 'auto',
		padding: 10,
		borderColor: '#D9D9D9',
		borderWidth: 2,
		borderRadius: 15,
	},
	userHeading: {
		width: '100%',
		fontSize: 18,
		fontFamily: 'OpenSans-Bold',
		marginBottom: 10,
		color: '#007aff',
		textAlign: 'center',
	},
	blockHeading2: {
		width: '100%',
		fontSize: 18,
		fontFamily: 'OpenSans-Bold',
		marginBottom: 5,
		color: '#d00020',
		textAlign: 'center',
	},
	blockText: {
		width: '100%',
		fontSize: 16,
		marginBottom: 5,
	},
	header: {
		marginBottom: 20,
	},
	saveBtn: {
		width: '90%',
		height: 44,
		marginBottom: 10,
		borderRadius: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
