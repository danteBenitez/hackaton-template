import { User } from "@/features/auth/interfaces/user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserById, validUserIdSchema } from "../services/users";
import UserProfileAvatar from "./user-profile-avatar";
import UserRoles from "./user-roles";
import { MailIcon, Users } from "lucide-react";

export default function UserDetail(props: { userId: string | undefined }) {
  const { data } = validUserIdSchema.safeParse({ id: props.userId });
  const { data: user } = useSuspenseQuery<User | null>({
    queryKey: ["user", data?.id],
    queryFn: () => getUserById(data?.id as string),
  });

  return (
    <>
      {user && (
        <div className="h-1/2 px-8 flex items-center gap-5">
          <div className="flex gap-2 items-center flex-grow-0">
            <UserProfileAvatar
              names={user.names}
              className="h-40 w-40 text-4xl"
            />
          </div>
          <div className="mt-6">
            <h2 className="pt-7 font-sans text-4xl font-bold">
              {user?.surnames}, {user.names}
            </h2>
            <div className="my-2 flex mt-1 flex-col gap-1">
              <span className="text-slate-500">@{user.username}</span>
              <p className="flex items-center gap-2">
                <MailIcon className="w-4 h-4" />
                {user?.email}
              </p>
              {user?.phone && <p>Teléfono: {user?.phone}</p>}
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {user.community?.name ?? "No está registrado en una comunidad."}
              </p>
            </div>
            <UserRoles user={user} />
          </div>
        </div>
      )}
    </>
  );
}
