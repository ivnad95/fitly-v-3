
import { BodyShapeImagesData, HeightOption, QuizData } from './types';

export const TOTAL_QUIZ_STEPS = 6; // Gender, Height, Weight, Age, Belly Shape, Chest Shape

// Updated to use paths to SVG files in the 'public/shapes' directory.
// Files in the public directory are served at the root path in Vite.
export const bodyShapeImages: BodyShapeImagesData = {
    female: {
        belly: {
            flatter: '/shapes/f-side-skinny.svg',
            average: '/shapes/f-side-average.svg',
            rounded: '/shapes/f-side-rounded.svg'
        },
        chest: {
            slimmer: '/shapes/f-front-skinny.svg',
            average: '/shapes/f-front-normal.svg',
            broader: '/shapes/f-front-rounded.svg'
        }
    },
    male: {
        belly: {
            flatter: '/shapes/m-side-skinny.svg',
            average: '/shapes/m-side-average.svg',
            rounded: '/shapes/m-side-rounded.svg'
        },
        chest: {
            slimmer: '/shapes/m-front-skinny.svg',
            average: '/shapes/m-front-average.svg',
            broader: '/shapes/m-front-rounded.svg'
        }
    }
};

export const bellyShapeDescriptions: Record<keyof BodyShapeImagesData['female']['belly'], string> = {
    flatter: 'Straighter abdominal line with minimal protrusion',
    average: 'Natural belly curve with balanced proportions',
    rounded: 'More pronounced belly curve'
};

export const chestShapeDescriptions: Record<keyof BodyShapeImagesData['female']['chest'], string> = {
    slimmer: 'Narrower torso and shoulder width',
    average: 'Balanced chest and shoulder proportions',
    broader: 'Wider chest and shoulder area'
};

export const heightOptions: HeightOption[] = [
    { value: "150", label: "150 cm (4'11\")" },
    { value: "155", label: "155 cm (5'1\")" },
    { value: "160", label: "160 cm (5'3\")" },
    { value: "165", label: "165 cm (5'5\")" },
    { value: "170", label: "170 cm (5'7\")" },
    { value: "175", label: "175 cm (5'9\")" },
    { value: "180", label: "180 cm (5'11\")" },
    { value: "185", label: "185 cm (6'1\")" },
    { value: "190", label: "190 cm (6'3\")" },
    { value: "195", label: "195 cm (6'5\")" },
];

export const initialQuizData: QuizData = {
    gender: '',
    height: 175,
    weight: 70,
    age: 25,
    bellyShape: '',
    chestShape: ''
};
