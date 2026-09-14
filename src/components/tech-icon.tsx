import Image from "next/image";
import { Database, PlugsConnected, Code } from "@phosphor-icons/react/dist/ssr";
const icons: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  Vue: "vuedotjs",
  "Vue 3": "vuedotjs",
  PHP: "php",
  Laravel: "laravel",
  CodeIgniter: "codeigniter",
  MySQL: "mysql",
};
export function TechIcon({ name, size = 18 }: { name: string; size?: number }) {
  if (icons[name])
    return (
      <Image
        src={`/icons/tech/${icons[name]}.svg`}
        alt=""
        width={size}
        height={size}
        className={`tech-icon tech-icon-${icons[name]}`}
        aria-hidden="true"
      />
    );
  if (name === "SQL Server") return <Database size={size} aria-hidden="true" />;
  if (name === "REST API")
    return <PlugsConnected size={size} aria-hidden="true" />;
  return <Code size={size} aria-hidden="true" />;
}
