import { useEffect, useRef } from 'react';

type UseCloseOutsideClickOrEscape = {
	isOpen: boolean;
	onClose: () => void;
	//rootRef: React.RefObject<HTMLDivElement>;
};

export const UseCloseOutsideClickOrEscape = ({
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
		if (isOpen) {
			window.addEventListener('mousedown', handleOutsideClick);
			window.addEventListener('keydown', handleEscKeyDown);
		}
		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
			window.removeEventListener('keydown', handleEscKeyDown);
		};
	}, [isOpen, onClose]);

	return rootRef;
};
