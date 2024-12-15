import { useState } from "react";

export const useModal = (initialMode = false) => {
	const [isModalOpen, setModalOpen] = useState(initialMode);
	const toggleModal = () => setModalOpen(!isModalOpen);
	return { isModalOpen, setModalOpen, toggleModal };
};
