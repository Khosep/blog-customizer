import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	//Состояние для открытия/закрытия сайдбара
	const [isOpen, setIsOpen] = useState(false);

	//Переключение состояния
	// (prevIsOpen) => !prevIsOpen) - гарантия последнего состояния
	const handleToggleIsOpen = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleIsOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
