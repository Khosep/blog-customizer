import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useCloseOutsideClickOrEscape } from '../hooks/useCloseOutsideClickOrEscape';

interface ArticleParamsFormProps {
	// Если зависим от предыдущего состояния (setState(prevState => ({ ...prevState, newValue }))), то:
	setStyleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	// Если не зависим от предыдущего состояния (setState(newState), то:
	// setStyleState: (newStyle: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	setStyleState,
}: ArticleParamsFormProps) => {
	//Состояние для открытия/закрытия сайдбара
	const [isOpen, setIsOpen] = useState(false);

	//Состояние для значений в форме
	const [formValues, setFormValues] = useState(defaultArticleState);

	//Переключение состояния (открыть/закрыть сайдбар)
	// (prevIsOpen) => !prevIsOpen) - гарантия последнего состояния
	const handleToggleIsOpen = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	// Обработчик изменения полей формы (возврат функции, ожидающей value)
	const handleChange = (formField: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormValues((prevValues) => ({ ...prevValues, [formField]: value }));
		};
	};

	// Обработчик отправки формы
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStyleState(() => formValues);
		// setStyleState(formValues);
	};

	// Обработчик сброса настроек
	const handleReset = () => {
		// Сбрасываем состояние формы до дефолтного
		// setFormValues(() => defaultArticleState); //избыточно, т.к. не зависим от предыдущего состояния
		setFormValues(defaultArticleState);

		// Сбрасываем состояние стилей до дефолтного
		// setStyleState(() => defaultArticleState); //избыточно, т.к. не зависим от предыдущего состояния
		setStyleState(defaultArticleState);
	};
	// Функция закрытия сайдбара (для передачи в useCloseOutsideClickOrEscape)
	const closeWithFalse = useCallback(() => setIsOpen(false), []);
	// const closeWithFalse = () => setIsOpen(false);

	// Возможность закрытия сайдбара по клику вне элемента или по Esc
	const rootRef = useCloseOutsideClickOrEscape({
		isOpen,
		onClose: closeWithFalse,
		//onClose: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleIsOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formValues.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formValues.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formValues.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formValues.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formValues.contentWidth}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
