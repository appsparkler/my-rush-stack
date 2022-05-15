import { MarkerCodeRendererWithCopy } from './MarkerCoderRendererWithCodeCopy';
import {
  KeywordForm,
  KeywordFormProps,
  KeywordFormRefinedConfig,
} from './KeywordForm';
import { useCallback, useState } from 'react';

export const CompositeForm = () => {
  const [keywordConfig, setKeywordConfig] = useState<KeywordFormRefinedConfig>({
    keyword: 'Lorem Ipsum',
  });
  const handleChangeKeywordForm = useCallback<KeywordFormProps['onChange']>(
    (config) => {
      setKeywordConfig(config);
    },
    []
  );

  return (
    <>
      <KeywordForm onChange={handleChangeKeywordForm} />
      <MarkerCodeRendererWithCopy
        mark={keywordConfig.keyword}
        options={keywordConfig}
        onChange={console.log}
      />
    </>
  );
};

export default {
  title: 'Configurator/Composite',
};
