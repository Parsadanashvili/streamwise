interface FacebookIconProps extends React.SVGProps<SVGSVGElement> {}

const FacebookIcon = ({ className }: FacebookIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.94475 22V13.1658H7V9.48482H9.94475V6.54007C9.94475 3.49741 11.8714 2 14.5857 2C15.8858 2 17.0033 2.09718 17.3287 2.13988V5.3202L15.4463 5.32094C13.9702 5.32094 13.6257 6.02253 13.6257 7.05172V9.48482H17.3066L16.5704 13.1658H13.6257L13.6846 22"
        fill="currentColor"
      />
    </svg>
  );
};

export default FacebookIcon;
