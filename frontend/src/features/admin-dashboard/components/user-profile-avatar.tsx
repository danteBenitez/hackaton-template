import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { getInitials } from "@/features/common/utils";
import { cn } from "@/lib/utils";

export default function UserProfileAvatar({
  names,
  className
}: {
  names: string;
  className?: string,
  height?: number;
}) {
  return (
    <Avatar className={cn("bg-blue-500 flex justify-center text-white font-semibold items-center h-8 w-8", className)}>
      <AvatarFallback className="text-center flex items-center justify-center text-md">
        {getInitials(names)}
      </AvatarFallback>
    </Avatar>
  );
}
