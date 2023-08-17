import { LucideProps } from "lucide-react";

export const Icons = {
  // ... (other icons)

  logo: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 497 497">
      <g>
        {/* Replace the original path with a wolf-like path */}
        <path
          d="M392 30c-71.75 0-71.75-30-143.5-30l128.5 497h30c33.137 0 60-26.863 60-60v-228.526c18.555-18.938 30-44.867 30-73.474 0-57.99-47.01-105-105-105z"
          fill="#c87044"
        />
        {/* Other path elements remain the same */}
        <path
          d="m437 437-45-377c-41.895 0-63.904-18.405-83.322-34.644-16.942-14.167-30.323-25.356-60.178-25.356-71.75 0-71.75 30-143.5 30-57.99 0-105 47.01-105 105 0 28.607 11.445 54.537 30 73.474v228.526c0 33.137 26.863 60 60 60h287c33.137 0 60-26.863 60-60z"
          fill="#db905a"
        />
        <path
          d="m392 60-15 407h30c16.542 0 30-13.458 30-30v-228.526c0-7.851 3.077-15.388 8.571-20.996 13.819-14.103 21.429-32.74 21.429-52.478 0-41.355-33.645-75-75-75z"
          fill="#ffd185"
        />
        <path
          d="m407 437v-228.526c0-15.796 6.088-30.708 17.143-41.991 8.291-8.462 12.857-19.643 12.857-31.483 0-41.355-20.187-75-45-75-41.895 0-63.904-9.203-83.322-17.322-16.942-7.083-30.323-12.678-60.178-12.678-29.856 0-43.236 5.595-60.177 12.678-19.419 8.119-41.429 17.322-83.323 17.322-41.355 0-75 33.645-75 75 0 19.738 7.61 38.375 21.429 52.479 5.494 5.607 8.571 13.145 8.571 20.995v228.526c0 16.542 13.458 30 30 30h287c16.542 0 30-13.458 30-30z"
          fill="#ffe8c2"
        />
        <g fill="#ffd185">
          <circle cx="392" cy="135" r="7.5" />
          <circle cx="362" cy="165" r="7.5" />
          <circle cx="105" cy="377" r="7.5" />
          <circle cx="135" cy="407" r="7.5" />
          <circle cx="105" cy="135" r="7.5" />
        </g>
      </g>
    </svg>
  ),

  message: (props: LucideProps) => (
    <svg
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
