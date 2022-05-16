import { MarkerCodeRendererWithCopy } from './MarkerCoderRendererWithCodeCopy';
import { KeywordForm, KeywordFormProps, MarkConfig } from './KeywordForm';
import { useCallback, useMemo, useState } from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';

export const CompositeForm = () => {
  type ConfigType = 'keyword' | 'keywordArray' | 'regExp';

  const [configType, setConfigType] = useState<ConfigType>('keyword');

  const [mark, setMark] = useState('Lorem Ipsum');

  const [keywordConfig, setKeywordConfig] = useState<MarkConfig>({});

  const handleChangeKeywordForm = useCallback<KeywordFormProps['onChange']>(
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

  const handleChangeConfigType = useCallback<RadioGroupProps['onChange']>(
    (_evt, value) => {
      const valueRef = value as ConfigType;
      setConfigType(valueRef);
      if (valueRef === 'keyword') {
        setMark('Lorem Ipsum');
      } else {
        setMark(JSON.stringify(['Lorem', 'Ipsum']));
      }
    },
    []
  );

  const isKeywordsArray = useMemo(
    () => configType === 'keywordArray',
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
      </RadioGroup>
      <KeywordForm
        keyword={mark}
        isKeywordsArray={isKeywordsArray}
        onChange={handleChangeKeywordForm}
        onChangeKeyword={handleChangeKeyword}
      />
      <MarkerCodeRendererWithCopy
        mark={mark}
        isMarkArray={isKeywordsArray}
        options={keywordConfig}
        onChange={console.log} // TODO - handle the alert as a separate component
      />
    </>
  );
};

export default {
  title: 'Configurator/Composite Form',
};
