import { ToastError } from "./../utils/Toast";


export default async function FileTextEncoder(inputEvent) {
debugger;
    return new Promise((resolve, reject) => {
        let selectedFile = inputEvent?.target?.files[0];
        if (selectedFile.type.substring(0, selectedFile.type.indexOf('/')) === 'application') {
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
                ToastError("Ocorreu um erro ao selecionar o arquivo.");
                reject(null);
            });
        } else {
            ToastError("O arquivo selecionado não é um arquivo de texto reconhecido.");
            reject(null);
        }

    });


}