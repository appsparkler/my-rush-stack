/// <reference types="react" />
import { MarkerCodeRendererProps } from "../MarkerCoderRenderer/MarkerCodeRenderer";
export declare type ConfigType = "keyword" | "keywordArray" | "regExp" | "ranges";
export declare type OnChangeCompositeForm = (updatedConfig: Omit<MarkerCodeRendererProps, "onChange">) => void;
export declare type CompositeFormProps = {
    onChange?: OnChangeCompositeForm;
};
export declare const CompositeForm: ({ onChange }: CompositeFormProps) => JSX.Element;
//# sourceMappingURL=CompositeForm.d.ts.map