import { 
	ArticleStateType, 
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType
  } from 'src/constants/articleProps';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
import { Text } from 'components/text';

import { FormEvent, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type FormState = ArticleStateType & {
	opened: boolean;
};

type ArticleParamsFormProps = {
	defaultState: ArticleStateType;
	onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({onChange, defaultState}: ArticleParamsFormProps) => {
	const [state, setState] = useState<FormState>({
		...defaultState,
		opened: false
	});
	const formRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setState(prev => ({ ...prev, opened: !prev.opened }));
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
		  if (
			state.opened &&
			formRef.current &&
			!formRef.current.contains(event.target as Node)
		  ) {
			toggleOpen();
		  }
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [state.opened]);

	const handleOptionChange = (option: OptionType, key: keyof ArticleStateType) => {
		setState(prev => ({ ...prev, [key]: option }));
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onChange({
			fontFamilyOption: state.fontFamilyOption,
			fontSizeOption: state.fontSizeOption,
			fontColor: state.fontColor,
			backgroundColor: state.backgroundColor,
			contentWidth: state.contentWidth
		});
	}

	const handleReset = () => {
		setState({
		  ...defaultState,
		  opened: true
		});
		onChange(defaultState);
	  };

	return (
		<>
			<ArrowButton onClick={toggleOpen} opened={state.opened} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: state.opened})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31}	weight={800} uppercase={true} family='open-sans'>Задайте параметры</Text>
					<Spacing size={50}/>
					
					<Select
						selected={state.fontFamilyOption}
						onChange={(opt) => handleOptionChange(opt, "fontFamilyOption")}
						options={fontFamilyOptions}
						title="ШРИФТ"
					/>
					<Spacing size={50}/>

					<RadioGroup
						name="font-size"
						selected={state.fontSizeOption}
						onChange={(opt) => handleOptionChange(opt, "fontSizeOption")}
						options={fontSizeOptions}
						title="РАЗМЕР ШРИФТА"
					/>
					<Spacing size={50}/>

					<Select
						selected={state.fontColor}
						onChange={(opt) => handleOptionChange(opt, "fontColor")}
						options={fontColors}
						title="ЦВЕТ ШРИФТА"
					/>
					<Spacing size={50}/>
					
					<Separator />
					<Spacing size={50}/>

					<Select
						selected={state.backgroundColor}
						onChange={(opt) => handleOptionChange(opt, "backgroundColor")}
						options={backgroundColors}
						title="ЦВЕТ ФОНА"
					/>
					<Spacing size={50}/>

					<Select
						selected={state.contentWidth}
						onChange={(opt) => handleOptionChange(opt, "contentWidth")}
						options={contentWidthArr}
						title="ШИРИНА КОНТЕНТА"
					/>
					<Spacing size={207}/>

					<div className={styles.bottomContainer}>
						<Button title="Сбросить" type="reset" onClick={handleReset}	/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
