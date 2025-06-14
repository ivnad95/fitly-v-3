export type Gender = 'male' | 'female' | '';
export type BellyShapeKey = 'flatter' | 'average' | 'rounded' | '';
export type ChestShapeKey = 'slimmer' | 'average' | 'broader' | '';
export type ProductType = 'Polo' | 'T-Shirt' | 'Trousers' | 'Midlayer' | 'Hoodie' | '';

export interface QuizData {
    gender: Gender;
    height: number; // cm
    weight: number; // kg
    age: number; // years
    bellyShape: BellyShapeKey;
    chestShape: ChestShapeKey;
    productType: ProductType;
}

export interface BodyShapeCategory {
    flatter: string;
    average: string;
    rounded: string;
}

export interface ChestShapeCategory {
    slimmer: string;
    average: string;
    broader: string;
}

export interface GenderSpecificShapes {
    belly: BodyShapeCategory;
    chest: ChestShapeCategory;
}

export interface BodyShapeImagesData {
    female: GenderSpecificShapes;
    male: GenderSpecificShapes;
}

export interface HeightOption {
    value: string;
    label: string;
}

export interface SizeResult {
    topSize: string;
    bottomSize: string;
    shoeSizeUK: string;
    shoeSizeEU: string;
    fitRecommendation: string;
    fitDescription: string;
    productType: ProductType;
}

export type ScreenView = 'welcome' | 'quiz' | 'results';
