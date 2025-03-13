import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface LinkStyledProps {
  type?: "primary" | "secondary" | "delete" | "save" | "cancel" | "edit";
  href: string;
  title?: string;
  role?: string;
  disabled?: boolean;
  icon?: string | React.ReactNode;  // use Unicode icons (emoji symbols), Heroicons or FontAwesome
}

export default function LinkStyled({
  type = "primary",
  href,
  title = "",
  role = "",
  disabled = false,
  icon = ""
}: LinkStyledProps) {
  const pathname = usePathname();
  const linkStyles = {
    primary: { color: "bg-blue-600 hover:bg-blue-700 text-white", icon: icon, title: title },
    secondary: { color: "bg-gray-500 hover:bg-gray-600 text-white", icon: icon, title: title },
    delete: { color: "bg-red-600 hover:bg-red-700 text-white", icon: "🗑", title: "Delete" },
    save: { color: "bg-green-600 hover:bg-green-700 text-white", icon: "✅", title: "Save" },
    cancel: { color: "bg-gray-400 hover:bg-gray-500 text-white", icon: "❌", title: "Cancel" },
    edit: { color: "bg-yellow-500 hover:bg-yellow-600 text-white", icon: "✏", title: "Edit" },
  };

  return (
    <Link
      href={href}
      role={role}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-lg font-semibold transition-all duration-300 shadow-md hover:scale-105",
        pathname === href
        ? 'bg-[var(--accent)] text-[var(--background)]'
        : 'bg-[var(--foreground)] text-[var(--background)]',
        { "pointer-events-none opacity-50": disabled }
      )}
    >
      {linkStyles[type].icon && <span>{linkStyles[type].icon}</span>}
      {linkStyles[type].title}
    </Link>
  );
}
