import { storage } from './../../config/firebase.initialize'

export async function storageUploadService (type, imageFile, imageName) {
    if (imageFile) {
        const response = await storage.ref(`${type}/${imageName}`).put(imageFile)
        console.log('respostaaaa', response)
        return response
        // const uploadTask = storage.ref(`${type}/${imageName}`).put(imageFile)
        // uploadTask.on(
        //     'state_changed',
        //     snapshot => {},
        //     error => {
        //         console.log('Erro: ', error)
        //     },
        //     async () => {
        //         await storage
        //             .ref(type)
        //             .child(imageName)
        //             .getDownloadURL()
        //             .then(url => {
        //                 console.log('Imagem atualizada com sucesso! URL: ', url)
        //             })
        //     }
        // )
    }
}

export async function getStorageImage (type, imageName) {
    const storagedImage = await storage
        .ref(type)
        .child(imageName)
        .getDownloadURL()

    return storagedImage
}