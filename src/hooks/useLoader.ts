import { useState } from "react";

export const useLoader = (initialMode = false) => {
	const [loading, setLoading] = useState(initialMode);
	return { loading, setLoading };
};
