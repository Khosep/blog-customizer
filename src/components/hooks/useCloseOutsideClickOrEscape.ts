import { useEffect, useRef } from 'react';

type UseCloseOutsideClickOrEscape = {
	isOpen: boolean;
	onClose: () => void;
	//onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useCloseOutsideClickOrEscape = ({
	isOpen,
	onClose,
}: UseCloseOutsideClickOrEscape) => {
	const rootRef = useRef<HTMLElement | null>(null);

	const handleOutsideClick = (event: MouseEvent) => {
		const { target } = event;
		if (target instanceof Node && !rootRef.current?.contains(target)) {
			onClose();
		}
	};

	const handleEscKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	useEffect(() => {
		if (!isOpen) return; // останавливаем действие эффекта, если сайдбар закрыт

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEscKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEscKeyDown);
		};
	}, [isOpen, onClose]);

	return rootRef;
};
