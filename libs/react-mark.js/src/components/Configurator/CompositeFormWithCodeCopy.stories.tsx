import { MarkerCodeRendererWithCopy } from './MarkerCoderRendererWithCodeCopy';
import { KeywordForm, KeywordFormProps, MarkConfig } from './KeywordForm';
import { useCallback, useState } from 'react';

export const CompositeForm = () => {
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

  return (
    <>
      <KeywordForm
        onChange={handleChangeKeywordForm}
        onChangeKeyword={handleChangeKeyword}
      />
      <MarkerCodeRendererWithCopy
        mark={mark}
        options={keywordConfig}
        onChange={console.log}
      />
    </>
  );
};

export default {
  title: 'Configurator/Composite',
};
