import { MarkerCodeRendererWithCopy } from './MarkerCoderRendererWithCodeCopy';
import { KeywordForm, KeywordFormProps, MarkConfig } from './KeywordForm';
import { useCallback, useState } from 'react';

export const CompositeForm = () => {
  const [mark, setMark] = useState(JSON.stringify(['Lorem', 'Ipsum']));
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
        isKeywordsArray
        onChange={handleChangeKeywordForm}
        onChangeKeyword={handleChangeKeyword}
      />
      <MarkerCodeRendererWithCopy
        mark={mark}
        isMarkArray
        options={keywordConfig}
        onChange={console.log} // TODO - handle the alert as a separate component
      />
    </>
  );
};

export default {
  title: 'Configurator/Composite',
};
