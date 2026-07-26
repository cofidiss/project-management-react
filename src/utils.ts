import { CommonLov } from "./Models/Models";

export const formatDateForDisplay = (value?: string | null) => {
  if (!value) {
    return '-';
  }

  const normalizedValue = value.replace('T', ' ');
  const exactSecondMatch = normalizedValue.match(/^(\d{4}-\d{2}-\d{2})(?:\s(\d{2}:\d{2}:\d{2}))?/);

  if (exactSecondMatch) {
    const [, datePart, timePart] = exactSecondMatch;
    return timePart ? `${datePart} ${timePart}` : datePart;
  }

  return normalizedValue;
};

  export const setLovState = async (setLovFunc: React.Dispatch<React.SetStateAction<CommonLov[]>>,lovUrl: string,
    startLoading: () => void, stopLoading: () => void, baseUrl?: string
  ) => {
    try {
      
      startLoading();
      const response = await fetch(`${baseUrl}/${lovUrl}`);
      if (!response.ok) {
        throw new Error('Error fetching lov.');
      }
      const data: CommonLov[] = await response.json();
      setLovFunc(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };
