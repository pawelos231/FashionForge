import { LucideProps, User } from "lucide-react";

export const Icons = {
  // ... (other icons)
  user: User,
  message: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2 2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11.586a1 1 0 0 1-.293.707L13 19H4a2 2 0 0 1-2-2V2zm4 9a1 1 0 0 1 1 1v2h6v-2a1 1 0 1 1 2 0v2h2.414a1 1 0 0 1 .707.293L18 16.586V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11.586l2.293-2.293A1 1 0 0 1 6 12z"
      />
    </svg>
  ),

  heart: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 17.928l-1.45-1.32C4.932 13.06 2 10.075 2 6.5 2 3.462 4.462 1 7.5 1c1.905 0 3.726.902 4.865 2.34A.75.75 0 0 0 13.39 4.39L10 7.78 6.61 4.39a.75.75 0 0 0-1.06 1.06L8.94 9.75l-3.39 3.39a.75.75 0 1 0 1.06 1.06L10 10.56l3.39 3.39a.75.75 0 0 0 1.06-1.06L11.06 9.75l3.39-3.39a.75.75 0 1 0-1.06-1.06L10 10.56 6.61 7.17a.75.75 0 0 0-1.06 1.06L8.94 12.5l-3.39 3.39a.75.75 0 0 0 1.06 1.06L10 13.06l3.39 3.39a.75.75 0 0 0 1.06-1.06L11.06 12.5l3.39-3.39a.75.75 0 1 0-1.06-1.06L10 11.06z"
      />
    </svg>
  ),
};
