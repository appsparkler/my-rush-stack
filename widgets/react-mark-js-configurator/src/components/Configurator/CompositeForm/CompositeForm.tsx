import {
  KeywordForm,
  KeywordFormPropsOnChange,
  KeywordFormPropsOnChangeKeyword,
} from "../KeywordForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import { RegExpChangeHandler, RegExpForm } from "../RegExpForm";
import {
  OnChangeRanges,
  RangesMarkerForm,
  RangesMarkerFormProps,
} from "../RangesMarkerForm";
import {
  MarkerCodeRendererProps,
  MarkerType,
} from "../MarkerCoderRenderer/MarkerCodeRenderer";
import React from "react";
import { noop } from "lodash/fp";
import { MarkOptions, RangeMarkerItem } from "mark.js";

export type ConfigType = "keyword" | "keywordArray" | "regExp" | "ranges";

export type OnChangeCompositeForm = (
  updatedConfig: Omit<MarkerCodeRendererProps, "onChange">
) => void;

export type CompositeFormProps = {
  onChange?: OnChangeCompositeForm;
};

export const CompositeForm = ({ onChange = noop }: CompositeFormProps) => {
  const [configType, setConfigType] = useState<ConfigType>("keyword");

  const [mark, setMark] = useState<string | RegExp | RangeMarkerItem[]>(
    "Lorem Ipsum"
  );

  const [ranges, setRanges] = useState<RangesMarkerFormProps["ranges"]>();

  const [options, setOptions] = useState<MarkOptions | undefined>();

  const handleChangeOptions = useCallback<KeywordFormPropsOnChange>(
    (options) => {
      setOptions(options);
    },
    []
  );

  const handleChangeKeyword = useCallback<KeywordFormPropsOnChangeKeyword>(
    (keyword) => {
      setMark(keyword);
    },
    []
  );

  const handleChangeRegExp = useCallback<RegExpChangeHandler>((keyword) => {
    setMark(keyword);
  }, []);

  const handleChangeConfigType = useCallback<
    NonNullable<RadioGroupProps["onChange"]>
  >((_evt, value) => {
    const valueRef = value as ConfigType;
    setConfigType(valueRef);
    if (valueRef === "keyword") {
      setMark("Lorem Ipsum");
    } else if (valueRef === "keywordArray") {
      setMark(JSON.stringify(["Lorem", "Ipsum"]));
    } else if (valueRef === "regExp") {
      setMark(/Lorem/);
    } else if (valueRef === "ranges") {
      setRanges([{ length: 7, start: 3 }]);
      setMark([{ length: 7, start: 3 }]);
    }
  }, []);

  const handleChangeRanges = useCallback<OnChangeRanges>((ranges) => {
    setRanges(ranges);
    setMark(ranges);
  }, []);

  const isKeywordsArray = useMemo(
    () => configType === "keywordArray" || configType === "regExp",
    [configType]
  );

  const isRangesMarker = useMemo(() => configType === "ranges", [configType]);

  const markerType: MarkerType = useMemo<MarkerType>(() => {
    if (configType === "keyword" || configType === "keywordArray")
      return "Marker";
    if (configType === "ranges") return "RangesMarker";
    return "RegExpMarker";
  }, [configType]);

  useEffect(() => {
    onChange({
      isMarkArray: isKeywordsArray,
      isRangesMarker: isRangesMarker,
      mark,
      markerType,
      options: options,
      ranges,
    });
  }, [
    isKeywordsArray,
    isRangesMarker,
    options,
    mark,
    markerType,
    onChange,
    ranges,
  ]);

  return (
    <>
      <RadioGroup
        aria-labelledby="config-type"
        name="config-type"
        value={configType}
        row
        onChange={handleChangeConfigType}
        sx={{ my: 1 }}
      >
        <FormControlLabel value="keyword" control={<Radio />} label="Keyword" />
        <FormControlLabel
          value="keywordArray"
          control={<Radio />}
          label="Array Of Keywords"
        />
        <FormControlLabel
          value="regExp"
          control={<Radio />}
          label="Custom RegExp"
        />
        <FormControlLabel value="ranges" control={<Radio />} label="Ranges" />
      </RadioGroup>
      {configType === "keyword" || configType === "keywordArray" ? (
        <KeywordForm
          keyword={mark as string}
          isKeywordsArray={isKeywordsArray}
          onChange={handleChangeOptions}
          onChangeKeyword={handleChangeKeyword}
        />
      ) : null}
      {configType === "regExp" ? (
        <RegExpForm
          onChangeRegExp={handleChangeRegExp}
          onChangeOptions={handleChangeOptions}
        />
      ) : null}
      {isRangesMarker ? (
        <RangesMarkerForm
          ranges={mark as RangeMarkerItem[]}
          onChangeRanges={handleChangeRanges}
          onChangeOptions={handleChangeOptions}
        />
      ) : null}
    </>
  );
};
