import { ProductDto } from '../types/types';

export const toMoneyRuLocate = (digit: number): string => digit.toLocaleString('ru-RU');

export const convertProductDtoToFormData = (productDto: ProductDto): FormData => {
    const formData = new FormData();
    const fileKeyName = 'imageFile';
    const imageFile = productDto[fileKeyName];

    for (const [key, value] of Object.entries(productDto)) {
        if (key !== fileKeyName) {
            formData.append(key, value as string);
        }
    }

    if (imageFile) {
        formData.append(fileKeyName, imageFile);
    }

    return formData;
};
