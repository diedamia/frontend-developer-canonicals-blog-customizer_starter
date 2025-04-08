import { createRoot } from 'react-dom/client';
import { StrictMode, useState, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

  const applyStyles = (newState: ArticleStateType) => {
    setArticleState(newState);
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--font-family', newState.fontFamilyOption.value);
    rootStyle.setProperty('--font-size', newState.fontSizeOption.value);
    rootStyle.setProperty('--font-color', newState.fontColor.value);
    rootStyle.setProperty('--bg-color', newState.backgroundColor.value);
    rootStyle.setProperty('--container-width', newState.contentWidth.value);
  };

  return (
    <div 
      className={clsx(styles.main)}
      style={{
        '--font-family': articleState.fontFamilyOption.value,
        '--font-size': articleState.fontSizeOption.value,
        '--font-color': articleState.fontColor.value,
        '--bg-color': articleState.backgroundColor.value,
        '--container-width': articleState.contentWidth.value,
      } as CSSProperties}
    >
      <ArticleParamsForm 
        defaultState={defaultArticleState}
        onChange={applyStyles} 
      />
      <Article />
    </div>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);