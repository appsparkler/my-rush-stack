import { MarkerCodeRendererWithCopy } from './MarkerCoderRendererWithCodeCopy';
import { KeywordForm, KeywordFormProps, MarkConfig } from './KeywordForm';
import { useCallback, useMemo, useState } from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { RegExpForm, RegExpFormProps } from './RegExpForm';
import { RangesMarkerForm } from './RangesMarkerForm';
import { MarkerType } from './MarkerCoderRenderer/MarkerCodeRenderer';

export const CompositeForm = () => {
  const [markerType, setMarkerType] = useState<MarkerType>('Marker');

  type ConfigType = 'keyword' | 'keywordArray' | 'regExp' | 'ranges';

  const [configType, setConfigType] = useState<ConfigType>('keyword');

  const [mark, setMark] = useState<string | RegExp>('Lorem Ipsum');

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
        setMarkerType('RegExpMarker');
      } else if (valueRef === 'ranges') {
        setMarkerType('RangesMarker');
      }
    },
    []
  );

  const isKeywordsArray = useMemo(
    () => configType === 'keywordArray' || configType === 'regExp',
    [configType]
  );

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
      {configType === 'ranges' ? (
        <RangesMarkerForm onChangeOptions={handleChangeOptions} />
      ) : null}
      <MarkerCodeRendererWithCopy
        mark={mark}
        isMarkArray={isKeywordsArray}
        options={keywordConfig}
        // onChange={console.log} // TODO - handle the alert as a separate component
        markerType={markerType}
        ranges={[]}
        isRangesMaker={false}
      />
    </>
  );
};

const Story = {
  title: 'Configurator/Composite Form',
};

export default Story;
