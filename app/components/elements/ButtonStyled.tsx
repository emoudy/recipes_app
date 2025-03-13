import clsx from "clsx";

interface ButtonStyledProps {
  type?: "primary" | "secondary" | "delete" | "save" | "cancel" | "edit";
  onClick?: () => void;
  title?: string;
  role?: string;
  disabled?: boolean;
	icon?: string;
}

export default function ButtonStyled({
  type = "primary",
  onClick = () => {},
  title = "",
  role = "button",
  disabled = false,
	icon="",
}: ButtonStyledProps) {
  
  // Define button base styles
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-lg font-semibold transition-all duration-300 shadow-md hover:scale-105";

  // Define dynamic button styles using Tailwind CSS variables
  const buttonStyles = {
    primary: {
      className: clsx(baseStyles, "bg-[var(--primary-btn-bg-light)]"),
      icon: icon, 
      title: title
    },
    secondary: {
      className:clsx(baseStyles),
      icon: icon, 
      title: title 
    },
    delete: {
      className:clsx(baseStyles),
      icon: "🗑", 
      title: "Delete"
    },
    save: {
      className:clsx(baseStyles),
      icon: "✅", 
      title: "Save"
    },
    cancel: {
      className:clsx(baseStyles),
      icon: "❌", 
      title: "Cancel"
    },    
    edit: {
      className:clsx(baseStyles),
      icon:  "✏", 
      title: "Edit"
    },
  };

  return (
    <button
      role={role}
      className={buttonStyles[type].className}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonStyles[type].icon && <span>{buttonStyles[type].icon}</span>}
      {buttonStyles[type].title}
    </button>
  );
}
