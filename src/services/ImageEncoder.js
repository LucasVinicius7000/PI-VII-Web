import { ToastError } from "./../utils/Toast";


export default async function ImageEncoder(inputEvent) {

    return new Promise((resolve, reject) => {
        let selectedFile = inputEvent?.target?.files[0];
        if (selectedFile.type.substring(0, selectedFile.type.indexOf('/')) === 'image') {
            let readerFile = new FileReader();
            readerFile.readAsDataURL(selectedFile);
            readerFile.onload = (file) => {
                resolve({
                    name: selectedFile?.name?.substring(0, selectedFile?.name.lastIndexOf('.')),
                    fileExtension: selectedFile?.name?.substring(selectedFile?.name.lastIndexOf('.') + 1),
                    base64: file.target.result,
                });
            };
            readerFile.onerror = (() => {
                ToastError("Ocorreu um erro ao selecionar imagem.");
                reject(null);
            });
        } else {
            ToastError("O arquivo selecionado não é uma imagem.");
            reject(null);
        }

    });


}