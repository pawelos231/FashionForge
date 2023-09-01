import { toast } from "react-hot-toast";

export const successful = (message: string) => toast.success(message);
export const unsuccessful = (error: string) => toast.error(error);
