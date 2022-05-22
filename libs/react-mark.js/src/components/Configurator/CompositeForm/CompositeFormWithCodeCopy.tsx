import { MarkerCodeRendererWithCopy } from '../MarkerCoderRendererWithCodeCopy';
import { KeywordForm, KeywordFormProps, MarkConfig } from '../KeywordForm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { RegExpForm, RegExpFormProps } from '../RegExpForm';
import { RangesMarkerForm, RangesMarkerFormProps } from '../RangesMarkerForm';
import {
  MarkerCodeRendererProps,
  MarkerType,
} from '../MarkerCoderRenderer/MarkerCodeRenderer';

type ConfigType = 'keyword' | 'keywordArray' | 'regExp' | 'ranges';

export type CompositeFormProps = {
  onChange?: (updatedConfig: Omit<MarkerCodeRendererProps, 'onChange'>) => void;
};

export const CompositeForm = ({ onChange }: CompositeFormProps) => {
  const [configType, setConfigType] = useState<ConfigType>('keyword');

  const [mark, setMark] = useState<string | RegExp>('Lorem Ipsum');

  const [ranges, setRanges] = useState<RangesMarkerFormProps['ranges']>();

  const [keywordConfig, setKeywordConfig] = useState<MarkConfig>({});

  const handleChangeOptions = useCallback<KeywordFormProps['onChange']>(
    (config) => {
      setKeywordConfig(config);
    },
    []
  );

  const handleChangeKeyword = useCallback<KeywordFormProps['onChangeKeyword']>(
    (keyword) => {
      setMark(keyword);
    },
    []
  );

  const handleChangeRegExp = useCallback<RegExpFormProps['onChangeRegExp']>(
    (keyword) => {
      setMark(keyword);
    },
    []
  );

  const handleChangeConfigType = useCallback<RadioGroupProps['onChange']>(
    (_evt, value) => {
      const valueRef = value as ConfigType;
      setConfigType(valueRef);
      if (valueRef === 'keyword') {
        setMark('Lorem Ipsum');
      } else if (valueRef === 'keywordArray') {
        setMark(JSON.stringify(['Lorem', 'Ipsum']));
      } else if (valueRef === 'regExp') {
        setMark(/Lorem Ipsum/);
      } else if (valueRef === 'ranges') {
        setRanges([{ length: 7, start: 3 }]);
      }
    },
    []
  );

  const handleChangeRanges = useCallback<
    RangesMarkerFormProps['onChangeRanges']
  >((ranges) => {
    setRanges(ranges);
  }, []);

  const isKeywordsArray = useMemo(
    () => configType === 'keywordArray' || configType === 'regExp',
    [configType]
  );

  const isRangesMarker = useMemo(() => configType === 'ranges', [configType]);

  const markerType: MarkerType = useMemo<MarkerType>(() => {
    if (configType === 'keyword' || configType === 'keywordArray')
      return 'Marker';
    if (configType === 'ranges') return 'RangesMarker';
    return 'RegExpMarker';
  }, [configType]);

  useEffect(() => {
    onChange({
      isMarkArray: isKeywordsArray,
      isRangesMarker: isRangesMarker,
      mark,
      markerType,
      options: keywordConfig,
      ranges,
    });
  }, [
    isKeywordsArray,
    isRangesMarker,
    keywordConfig,
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
      {configType === 'keyword' || configType === 'keywordArray' ? (
        <KeywordForm
          keyword={mark as string}
          isKeywordsArray={isKeywordsArray}
          onChange={handleChangeOptions}
          onChangeKeyword={handleChangeKeyword}
        />
      ) : null}
      {configType === 'regExp' ? (
        <RegExpForm
          onChangeRegExp={handleChangeRegExp}
          onChangeOptions={handleChangeOptions}
        />
      ) : null}
      {isRangesMarker ? (
        <RangesMarkerForm
          ranges={ranges}
          onChangeRanges={handleChangeRanges}
          onChangeOptions={handleChangeOptions}
        />
      ) : null}
      <MarkerCodeRendererWithCopy
        mark={mark}
        isMarkArray={isKeywordsArray}
        options={keywordConfig}
        // onChange={console.log} // TODO - handle the alert as a separate component
        markerType={markerType}
        ranges={ranges}
        isRangesMarker={isRangesMarker}
      />
    </>
  );
};
