import { StyleConfig } from "@/types";

// Standard style config
export const standardStyleConfig: StyleConfig = {
    padding: {
        all: 'p-1 sm:p-2',
        top: 'pt-1 sm:pt-2',
        right: 'pr-1 sm:pr-2',
        bottom: 'pb-1 sm:pb-2',
        left: 'pl-1 sm:pl-2',
    },
    margin: {
        all: 'm-1 sm:m-2',
        top: 'mt-1 sm:mt-2',
        right: 'mr-1 sm:mr-2',
        bottom: 'mb-1 sm:mb-2',
        left: 'ml-1 sm:ml-2',
    },
    text: {
        xsmall: 'text-[10px] sm:text-xs',
        small: 'text-xs sm:text-sm',
        medium: 'text-sm sm:text-base',
        large: 'text-base sm:text-lg',
        xlarge: 'text-lg sm:text-xl',
        header: 'text-2xl sm:text-3xl',
        subheader: 'text-xl sm:text-2xl',
    },
}

