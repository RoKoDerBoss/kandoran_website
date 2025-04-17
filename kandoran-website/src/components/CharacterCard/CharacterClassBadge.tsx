import { getClassIcon } from '@/lib/utils/classIcons';
import React, { memo, useMemo } from 'react';

interface ClassBadgeProps {
    class: string;
    subclass?: string;
    secondary_class?: string;
    secondary_subclass?: string;
    containerClassName?: string;
}

const ClassBox = memo(({
    class: Class,
    subclass
}: ClassBadgeProps) => {
    const Icon = useMemo(() => getClassIcon(Class), [Class]);
    return (
        <div className="flex items-center justify-center border border-gray-300 rounded-md p-2 bg-purple-50 min-w-22 w-1/2 h-full flex-1">
            <div className="flex items-center justify-center">
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 mr-2 transition-transform duration-300" />
            </div>
            <div className="flex flex-col items-left justify-center overflow-hidden">
                <span className="text-xs sm:text-sm font-bold text-purple-800 transition-text duration-300 truncate">{Class}</span>
                <span className="text-[10px] sm:text-xs font-small text-gray-600 truncate transition-text duration-300">{subclass ? subclass : "-"}</span>
            </div>
        </div>
    )
});

ClassBox.displayName = 'ClassBox';

export const ClassBadge = memo(({
    class: Class,
    subclass,
    secondary_class,
    secondary_subclass,
    containerClassName
}: ClassBadgeProps) => {
    return (
        <div className={`w-full ${containerClassName}`}>
            <div className="flex items-stretch justify-center">
                <div className={`flex items-stretch justify-center gap-1 sm:gap-2  ${secondary_class ? "w-full" : "w-1/2"}`}>
                    <ClassBox class={Class} subclass={subclass} />
                    {secondary_class && <ClassBox class={secondary_class} subclass={secondary_subclass || ""} />}
                </div>
            </div>
        </div>
    )
});

ClassBadge.displayName = 'ClassBadge';

export default ClassBadge;
