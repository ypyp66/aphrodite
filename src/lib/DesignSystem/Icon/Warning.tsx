interface Props {
  color?: string;
  width?: number;
  height?: number;
}

function Warning({ color, width, height }: Props) {
  return (
    <svg
      width={width + 10}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.33333C11.676 1.33333 14.6667 4.324 14.6667 8C14.6667 11.676 11.676 14.6667 8 14.6667C4.324 14.6667 1.33333 11.676 1.33333 8C1.33333 4.324 4.324 1.33333 8 1.33333ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM7.33333 4H8.66667V9.33333H7.33333V4ZM8 12.1667C7.54 12.1667 7.16667 11.7933 7.16667 11.3333C7.16667 10.8733 7.54 10.5 8 10.5C8.46 10.5 8.83333 10.8733 8.83333 11.3333C8.83333 11.7933 8.46 12.1667 8 12.1667Z"
        fill={color}
      />
    </svg>
  );
}

Warning.defaultProps = {
  color: "#FF5C58",
  width: 16,
  height: 16,
};

export default Warning;
