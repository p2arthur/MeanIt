/// <reference types="react" />
interface OptionsInterface {
    type: string;
    data: {
        title: string;
        subtitle: string;
        option: string;
    };
}
declare const OptionsSection: ({ options }: {
    options: OptionsInterface[];
}) => import("react").JSX.Element;
export default OptionsSection;
